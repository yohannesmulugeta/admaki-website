'use client';

import { useEffect, useRef } from 'react';

/**
 * A lightweight studio cursor with two independent followers:
 * a precise cobalt dot + a lagging editorial halo.
 * It is never shown for touch, coarse pointers, reduced motion, or
 * when the pointer leaves the homepage. Native keyboard focus is preserved.
 */
export default function StudioCursor() {
  const haloRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!halo || !dot || !label) return;

    const root = document.documentElement;
    const query = window.matchMedia('(min-width: 851px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let enabled = false;
    let frame = 0;
    let x = 0, y = 0, haloX = 0, haloY = 0;
    let positioned = false;
    let currentTarget: Element | null = null;
    let active = false;

    const hide = () => {
      active = false;
      halo.classList.remove('is-visible');
      dot.classList.remove('is-visible');
      halo.classList.remove('is-pressed');
      root.classList.remove('ed-cursor-text-entry');
    };

    const tick = () => {
      frame = 0;
      if (!active) return;

      haloX += (x - haloX) * 0.17;
      haloY += (y - haloY) * 0.17;
      halo.style.transform = `translate3d(${haloX.toFixed(1)}px, ${haloY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      if (Math.abs(haloX - x) > 0.15 || Math.abs(haloY - y) > 0.15) {
        frame = window.requestAnimationFrame(tick);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(tick); };

    const updateTarget = (event: PointerEvent) => {
      const hovered = event.target instanceof Element ? event.target : null;
      if (hovered === currentTarget) return;
      const interactive = hovered?.closest('[data-cursor-label], a, button, summary, input, textarea, select');
      if (interactive === currentTarget) return;
      currentTarget = interactive;
      const textInput = interactive?.matches('input, textarea, select');
      const explicit = interactive?.getAttribute('data-cursor-label');
      const isProject = interactive?.matches('.ed-project-art');
      const isLink = interactive?.matches('a, button, summary');
      const text = textInput ? '' : (explicit || (isProject ? 'VIEW ↗' : isLink ? 'OPEN ↗' : ''));
      const expanded = !!text;
      label.textContent = text;
      halo.classList.toggle('is-expanded', expanded);
      dot.classList.toggle('is-expanded', expanded);
      halo.classList.toggle('is-project', !!isProject);
      root.classList.toggle('ed-cursor-text-entry', !!textInput);
    };

    const pointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== 'mouse') return;
      const hovered = event.target instanceof Element ? event.target : null;
      const inside = !!hovered?.closest('.editorial-site');
      if (!inside) { hide(); return; }

      x = event.clientX;
      y = event.clientY;
      if (!positioned) { haloX = x; haloY = y; positioned = true; }
      active = true;
      halo.classList.add('is-visible');
      dot.classList.add('is-visible');
      updateTarget(event);
      schedule();
    };
    const pointerDown = () => { if (active) halo.classList.add('is-pressed'); };
    const pointerUp = () => halo.classList.remove('is-pressed');
    const pointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const onVisibility = () => {
      if (document.hidden) hide();
    };
    const configure = () => {
      enabled = query.matches;
      root.classList.toggle('ed-cursor-enabled', enabled);
      if (!enabled) {
        hide();
        currentTarget = null;
        root.classList.remove('ed-cursor-text-entry');
      }
    };

    document.addEventListener('pointermove', pointerMove, { passive: true });
    document.addEventListener('pointerdown', pointerDown, { passive: true });
    document.addEventListener('pointerup', pointerUp, { passive: true });
    document.addEventListener('pointerout', pointerOut);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', hide);
    query.addEventListener('change', configure);
    configure();

    return () => {
      document.removeEventListener('pointermove', pointerMove);
      document.removeEventListener('pointerdown', pointerDown);
      document.removeEventListener('pointerup', pointerUp);
      document.removeEventListener('pointerout', pointerOut);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', hide);
      query.removeEventListener('change', configure);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('ed-cursor-enabled', 'ed-cursor-text-entry');
    };
  }, []);

  return (
    <>
      <div className="ed-studio-cursor-halo" ref={haloRef} aria-hidden="true">
        <span className="ed-studio-cursor-circle" />
        <span className="ed-studio-cursor-label" ref={labelRef} />
        <span className="ed-studio-cursor-satellite" />
      </div>
      <div className="ed-studio-cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
