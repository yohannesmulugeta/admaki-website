'use client';

import { useEffect, useRef, useState } from 'react';

const moments = [
  { number: '01', label: 'The spark', heading: 'Every breakthrough starts somewhere.', detail: 'A question. A problem. A possibility worth exploring.' },
  { number: '02', label: 'The direction', heading: 'We give the idea structure.', detail: 'Strategy turns possibilities into a clear path forward.' },
  { number: '03', label: 'The experience', heading: 'We make it tangible.', detail: 'Design and storytelling create something people can see and feel.' },
  { number: '04', label: 'The system', heading: 'We make it work.', detail: 'Technology connects the details and helps a business move forward.' },
];

export default function IdeaEngine() {
  const sceneRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let animationFrame = 0;
    const update = () => {
      const rect = scene.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(0.999, -rect.top / travel));
      setPhase((previous) => {
        const next = Math.min(3, Math.floor(progress * 4));
        return next === previous ? previous : next;
      });
      animationFrame = 0;
    };
    const onScroll = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="home" className="idea-scroll" ref={sceneRef} aria-label="ADMAKI idea engine introduction">
      <div className="idea-pin">
        <div className="ed-wrap idea-layout">
          <div className="idea-copy">
            <div className="ed-eyebrow"><span className="ed-pin-dot" /> INDEPENDENT CREATIVE & DIGITAL STUDIO <span className="ed-eyebrow-number">/ ADDIS ABABA</span></div>
            <h1>Ideas that <em>move.</em><br />Systems that <span>work.</span></h1>
            <p className="idea-lead">We shape bold ideas into memorable websites, creative campaigns and software that solves real business problems.</p>
            <div className="idea-actions">
              <a className="ed-btn ed-btn-dark" href="#work">Explore our work <span aria-hidden="true">↗</span></a>
              <a className="ed-btn ed-btn-line" href="#services">What we do <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="engine-display" data-stage={phase} aria-label={moments[phase].label + ': ' + moments[phase].detail}>
            <div className="engine-coordinate engine-coordinate-left">38°45′ E / 9°01′ N</div>
            <div className="engine-coordinate engine-coordinate-right">IDEA — 001 / 004</div>
            <div className="engine-orbit engine-orbit-one" />
            <div className="engine-orbit engine-orbit-two" />
            <div className="engine-cross engine-cross-one">+</div>
            <div className="engine-cross engine-cross-two">+</div>
            <div className="engine-blade engine-blade-left" />
            <div className="engine-blade engine-blade-right" />
            <div className="engine-blueprint" />
            <div className="engine-square" />
            <div className="engine-disc"><div className="engine-disc-inner"><span>AD.</span></div></div>
            <div className="engine-rail engine-rail-top" />
            <div className="engine-rail engine-rail-bottom" />
            <div className="engine-mini-ui" aria-hidden="true">
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
              <button type="button" key={moment.number} className={i === phase ? 'idea-stage active' : 'idea-stage'} onClick={() => setPhase(i)} aria-pressed={phase === i}>
                <span className="stage-index">{moment.number}</span>
                <span>{moment.label}</span>
              </button>
            ))}
          </div>
          <div className="idea-stage-caption" aria-live="polite">
            <strong>{moments[phase].heading}</strong>
            <span>{moments[phase].detail}</span>
          </div>
          <span className="idea-scroll-hint">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
        </div>
      </div>
    </section>
  );
}
