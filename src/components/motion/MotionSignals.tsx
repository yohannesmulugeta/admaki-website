'use client';

import { useEffect } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/**
 * One passive, RAF-throttled scroll controller for all editorial sections.
 * The custom cursor already owns pointer motion; do not run an additional
 * document-wide pointer listener for magnetic buttons.
 */
export default function MotionSignals() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canObserve = 'IntersectionObserver' in window;
    if (reducedMotion.matches || !canObserve) return;

    const root = document.documentElement;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('ed-in-view');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -3% 0px' }
    );

    const register = (scope: ParentNode) => {
      scope.querySelectorAll('[data-reveal]').forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };
    register(document);
    root.classList.add('motion-ready');

    const mutation = new MutationObserver((records) => {
      records.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('[data-reveal]') && !seen.has(node)) {
            seen.add(node);
            observer.observe(node);
          }
          register(node);
        });
      });
    });
    const workSection = document.getElementById('work');
    if (workSection) mutation.observe(workSection, { childList: true, subtree: true });

    let frame = 0;
    let active = '';
    let lastProgress = -1;
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.ed-nav-links a[href^="#"]'));
    const sections = ['work', 'social', 'services', 'studio', 'contact']
      .map((id) => document.getElementById(id)).filter((item): item is HTMLElement => !!item);
    const processTrack = document.querySelector<HTMLElement>('.ed-process-grid');

    const update = () => {
      frame = 0;
      if (document.hidden) return;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const pageProgress = clamp(scrollY / maxScroll);
      if (Math.abs(pageProgress - lastProgress) >= 0.002) {
        root.style.setProperty('--page-progress', pageProgress.toFixed(3));
        lastProgress = pageProgress;
      }

      const markerY = Math.min(innerHeight * 0.35, 290);
      let current = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= markerY) current = section.id;
      }
      if (current !== active) {
        active = current;
        for (const link of navLinks) {
          if (link.getAttribute('href') === '#' + current) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        }
      }

      // Do not read geometry/write transforms for the process timeline
      // on every frame while the user is several screens away.
      if (processTrack) {
        const rect = processTrack.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) {
          const travel = Math.max(1, rect.height + innerHeight * 0.3);
          processTrack.style.setProperty('--process-progress',
            clamp((innerHeight * 0.76 - rect.top) / travel).toFixed(3));
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    const closeMobileMenu = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('.ed-mobile-menu nav a')) {
        document.querySelector<HTMLDetailsElement>('.ed-mobile-menu')?.removeAttribute('open');
      }
    };
    document.addEventListener('click', closeMobileMenu);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('click', closeMobileMenu);
      if (frame) cancelAnimationFrame(frame);
      mutation.disconnect();
      observer.disconnect();
      root.classList.remove('motion-ready');
      root.style.removeProperty('--page-progress');
    };
  }, []);

  return null;
}
