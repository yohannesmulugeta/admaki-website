'use client';

import { useEffect } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/**
 * One small motion controller for the editorial homepage.
 * Progressive enhancement: all content stays visible if JavaScript,
 * IntersectionObserver or motion preferences disable animation.
 */
export default function MotionSignals() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const revealed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('ed-in-view');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.09, rootMargin: '0px 0px -5% 0px' }
    );

    const register = (scope: ParentNode) => {
      scope.querySelectorAll('[data-reveal]').forEach((el) => {
        if (revealed.has(el)) return;
        revealed.add(el);
        observer.observe(el);
      });
    };
    register(document);
    root.classList.add('motion-ready');

    // Newly filtered project cards and "view more" cards need an observer too.
    const mutation = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('[data-reveal]') && !revealed.has(node)) {
            revealed.add(node);
            observer.observe(node);
          }
          register(node);
        });
      }
    });
    mutation.observe(document.getElementById('work') || document.body, { childList: true, subtree: true });

    let frame = 0;
    let active = '';
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.ed-nav-links a[href^="#"]'));
    const sections = ['work', 'social', 'services', 'studio', 'contact']
      .map((id) => document.getElementById(id)).filter((section): section is HTMLElement => !!section);
    const processTrack = document.querySelector<HTMLElement>('.ed-process-grid');

    const update = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty('--page-progress', String(clamp(window.scrollY / maxScroll)));

      const markerY = Math.min(window.innerHeight * 0.35, 290);
      let current = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= markerY) current = section.id;
      }
      if (current !== active) {
        active = current;
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute('href') === '#' + current;
          if (isCurrent) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }

      if (processTrack) {
        const rect = processTrack.getBoundingClientRect();
        const travel = Math.max(1, rect.height + window.innerHeight * 0.3);
        const progress = clamp((window.innerHeight * 0.76 - rect.top) / travel);
        processTrack.style.setProperty('--process-progress', progress.toFixed(3));
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    let activeMagnetic: HTMLElement | null = null;
    const clearMagnetic = () => {
      if (!activeMagnetic) return;
      activeMagnetic.style.removeProperty('--mag-x');
      activeMagnetic.style.removeProperty('--mag-y');
      activeMagnetic = null;
    };
    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-magnetic]') : null;
      if (!target) { clearMagnetic(); return; }
      if (activeMagnetic && activeMagnetic !== target) clearMagnetic();
      activeMagnetic = target;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      target.style.setProperty('--mag-x', x.toFixed(2) + 'px');
      target.style.setProperty('--mag-y', y.toFixed(2) + 'px');
    };

    const closeMobileMenu = (event: MouseEvent) => {
      const clickedLink = event.target instanceof Element ? event.target.closest('.ed-mobile-menu nav a') : null;
      if (clickedLink) document.querySelector<HTMLDetailsElement>('.ed-mobile-menu')?.removeAttribute('open');
    };
    document.addEventListener('pointermove', handlePointer, { passive: true });
    document.addEventListener('click', closeMobileMenu);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('pointermove', handlePointer);
      document.removeEventListener('click', closeMobileMenu);
      if (frame) window.cancelAnimationFrame(frame);
      clearMagnetic();
      mutation.disconnect();
      observer.disconnect();
      root.classList.remove('motion-ready');
      root.style.removeProperty('--page-progress');
    };
  }, []);
  return null;
}
