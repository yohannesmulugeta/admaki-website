'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const moments = [
  { number: '01', label: 'The spark', heading: 'Every breakthrough starts somewhere.', detail: 'A question. A problem. A possibility worth exploring.' },
  { number: '02', label: 'The direction', heading: 'We give the idea structure.', detail: 'Strategy turns possibilities into a clear path forward.' },
  { number: '03', label: 'The experience', heading: 'We make it tangible.', detail: 'Design and storytelling create something people can see and feel.' },
  { number: '04', label: 'The system', heading: 'We make it work.', detail: 'Technology connects the details and helps a business move forward.' },
];

type Pose = { x: number; y: number; scale: number; rotate?: number };
const poses = {
  disc: [
    { x: 0, y: 0, scale: 1 },
    { x: 20, y: -12, scale: 0.7 },
    { x: -40, y: 15, scale: 0.8 },
    { x: -53, y: -45, scale: 0.62 },
  ],
  square: [
    { x: 0, y: 0, scale: 1, rotate: -24 },
    { x: 0, y: 0, scale: 1.08, rotate: 0 },
    { x: 0, y: 0, scale: 0.87, rotate: 17 },
    { x: 0, y: 0, scale: 0.96, rotate: 0 },
  ],
  card: [
    { x: 0, y: 0, scale: 1, rotate: 9 },
    { x: -35, y: 35, scale: 1, rotate: -5 },
    { x: -33, y: 47, scale: 1.6, rotate: 0 },
    { x: -38, y: 69, scale: 1.35, rotate: 0 },
  ],
  left: [
    { x: 0, y: 0, scale: 1, rotate: -35 },
    { x: 48, y: 94, scale: 1, rotate: -5 },
    { x: 100, y: 50, scale: 1, rotate: 50 },
    { x: 110, y: 70, scale: 1, rotate: 0 },
  ],
  right: [
    { x: 0, y: 0, scale: 1, rotate: 145 },
    { x: -66, y: -67, scale: 1, rotate: 95 },
    { x: -20, y: -160, scale: 1, rotate: -25 },
    { x: -92, y: -130, scale: 1, rotate: 0 },
  ],
} satisfies Record<string, Pose[]>;

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
function interpolate(frames: Pose[], progress: number): Pose {
  const position = Math.max(0, Math.min(3, progress * 3));
  const index = Math.min(2, Math.floor(position));
  const t = position - index;
  const a = frames[index];
  const b = frames[index + 1];
  return {
    x: mix(a.x, b.x, t),
    y: mix(a.y, b.y, t),
    scale: mix(a.scale, b.scale, t),
    rotate: mix(a.rotate ?? 0, b.rotate ?? 0, t),
  };
}

function setPose(node: HTMLElement | null, pose: Pose) {
  if (!node) return;
  node.style.transform = `translate3d(${pose.x.toFixed(2)}%, ${pose.y.toFixed(2)}%, 0) rotate(${(pose.rotate ?? 0).toFixed(2)}deg) scale(${pose.scale.toFixed(3)})`;
}

export default function IdeaEngine() {
  const sceneRef = useRef<HTMLElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bladeLeftRef = useRef<HTMLDivElement>(null);
  const bladeRightRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const mobileMode = useRef(true);

  useEffect(() => {
    const scene = sceneRef.current;
    const engine = engineRef.current;
    if (!scene || !engine) return;
    const media = window.matchMedia('(min-width: 851px) and (prefers-reduced-motion: no-preference)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let raf = 0;
    let target = 0;
    let current = 0;
    let desiredX = 0;
    let desiredY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let engineBounds = engine.getBoundingClientRect();

    const reset = () => {
      [discRef, squareRef, cardRef, bladeLeftRef, bladeRightRef].forEach((ref) => {
        ref.current?.style.removeProperty('transform');
      });
      engine.style.removeProperty('--tilt-x');
      engine.style.removeProperty('--tilt-y');
      engine.classList.remove('engine-motion-active');
      current = target = smoothX = smoothY = desiredX = desiredY = 0;
    };
    const paint = () => {
      raf = 0;
      if (!media.matches) return;
      current += (target - current) * 0.12;
      smoothX += (desiredX - smoothX) * 0.13;
      smoothY += (desiredY - smoothY) * 0.13;
      const p = Math.max(0, Math.min(0.9999, current));
      setPose(discRef.current, interpolate(poses.disc, p));
      setPose(squareRef.current, interpolate(poses.square, p));
      setPose(cardRef.current, interpolate(poses.card, p));
      setPose(bladeLeftRef.current, interpolate(poses.left, p));
      setPose(bladeRightRef.current, interpolate(poses.right, p));
      engine.style.setProperty('--tilt-x', smoothX.toFixed(2) + 'px');
      engine.style.setProperty('--tilt-y', smoothY.toFixed(2) + 'px');
      setPhase((previous) => {
        const next = Math.min(3, Math.floor(p * 4));
        return previous === next ? previous : next;
      });
      if (Math.abs(target - current) > 0.0003 || Math.abs(desiredX - smoothX) > 0.1 || Math.abs(desiredY - smoothY) > 0.1) {
        raf = requestAnimationFrame(paint);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onScroll = () => {
      if (!media.matches) return;
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
      target = Math.max(0, Math.min(0.9999, -rect.top / travel));
      schedule();
    };
    const onPointer = (event: PointerEvent) => {
      if (!media.matches || !pointer.matches) return;
      // Cache bounds on entry; do not force a layout read for every mouse move.
      desiredX = ((event.clientX - engineBounds.left) / engineBounds.width - 0.5) * 9;
      desiredY = ((event.clientY - engineBounds.top) / engineBounds.height - 0.5) * 9;
      schedule();
    };
    const onEnter = () => { engineBounds = engine.getBoundingClientRect(); };
    const onLeave = () => {
      desiredX = desiredY = 0;
      schedule();
    };
    const onModeChange = () => {
      mobileMode.current = !media.matches;
      if (media.matches) {
        engine.classList.add('engine-motion-active');
        onScroll();
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        reset();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onModeChange);
    engine.addEventListener('pointerenter', onEnter);
    engine.addEventListener('pointermove', onPointer, { passive: true });
    engine.addEventListener('pointerleave', onLeave);
    media.addEventListener('change', onModeChange);
    onModeChange();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onModeChange);
      engine.removeEventListener('pointerenter', onEnter);
      engine.removeEventListener('pointermove', onPointer);
      engine.removeEventListener('pointerleave', onLeave);
      media.removeEventListener('change', onModeChange);
      if (raf) cancelAnimationFrame(raf);
      reset();
    };
  }, []);

  const selectStage = useCallback((index: number) => {
    const scene = sceneRef.current;
    const enabled = window.matchMedia('(min-width: 851px) and (prefers-reduced-motion: no-preference)').matches;
    if (!scene || !enabled || mobileMode.current) {
      setPhase(index);
      return;
    }
    const travel = Math.max(1, scene.offsetHeight - window.innerHeight);
    const sceneTop = window.scrollY + scene.getBoundingClientRect().top;
    const progress = index === 0 ? 0 : Math.min(0.99, (index + 0.18) / 4);
    window.scrollTo({ top: sceneTop + travel * progress, behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="idea-scroll" ref={sceneRef} aria-label="ADMAKI idea engine introduction">
      <div className="idea-pin">
        <div className="ed-wrap idea-layout">
          <div className="idea-copy">
            <div className="ed-eyebrow"><span className="ed-pin-dot" /> INDEPENDENT CREATIVE & DIGITAL STUDIO <span className="ed-eyebrow-number">/ ADDIS ABABA</span></div>
            <h1>
              <span className="idea-title-line"><span>Ideas that <em>move.</em></span></span>
              <span className="idea-title-line"><span>Systems that <span className="idea-work-word">work.</span></span></span>
            </h1>
            <p className="idea-lead">We shape bold ideas into memorable websites, creative campaigns and software that solves real business problems.</p>
            <div className="idea-actions">
              <a className="ed-btn ed-btn-dark" data-magnetic href="#work">Explore our work <span aria-hidden="true">↗</span></a>
              <a className="ed-btn ed-btn-line" data-magnetic href="#services">What we do <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="engine-display" ref={engineRef} data-stage={phase} aria-label={moments[phase].label + ': ' + moments[phase].detail}>
            <div className="engine-coordinate engine-coordinate-left">38°45′ E / 9°01′ N</div>
            <div className="engine-coordinate engine-coordinate-right">IDEA — 00{phase + 1} / 004</div>
            <div className="engine-orbit engine-orbit-one" />
            <div className="engine-orbit engine-orbit-two" />
            <div className="engine-cross engine-cross-one">+</div>
            <div className="engine-cross engine-cross-two">+</div>
            <div className="engine-blade engine-blade-left" ref={bladeLeftRef} />
            <div className="engine-blade engine-blade-right" ref={bladeRightRef} />
            <div className="engine-blueprint" />
            <div className="engine-square" ref={squareRef} />
            <div className="engine-disc" ref={discRef}><div className="engine-disc-inner"><span>AD.</span></div></div>
            <div className="engine-rail engine-rail-top" />
            <div className="engine-rail engine-rail-bottom" />
            <div className="engine-mini-ui" ref={cardRef} aria-hidden="true">
              <span className="engine-ui-dots">● &nbsp; ● &nbsp; ●</span>
              <span className="engine-ui-line wide" /><span className="engine-ui-line" /><span className="engine-ui-line short" />
              <span className="engine-ui-block" />
            </div>
            <div className="engine-small-note"><span className="engine-small-mark" /> FROM POSSIBILITY<br/>TO PURPOSE</div>
            <div className="engine-label">THE <strong>IDEA ENGINE</strong> <span>®</span></div>
          </div>
        </div>

        <div className="ed-wrap idea-bottom">
          <div className="idea-stages" aria-label="Idea engine stages">
            {moments.map((moment, i) => (
              <button type="button" key={moment.number} className={i === phase ? 'idea-stage active' : 'idea-stage'} onClick={() => selectStage(i)} aria-pressed={phase === i}>
                <span className="stage-index">{moment.number}</span>
                <span>{moment.label}</span>
              </button>
            ))}
          </div>
          <div className="idea-stage-caption" aria-live="polite">
            <strong key={moments[phase].heading}>{moments[phase].heading}</strong>
            <span key={moments[phase].detail}>{moments[phase].detail}</span>
          </div>
          <span className="idea-scroll-hint">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
        </div>
      </div>
    </section>
  );
}
