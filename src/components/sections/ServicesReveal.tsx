'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import ServiceVisual from '@/components/services/ServiceVisual';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ServiceData {
  id: string;
  num: string;
  titleLines: string[];
  description: string;
  capabilities: string[];
  tagline: string;
}

const servicesData: ServiceData[] = [
  {
    id: 'social-media',
    num: '01',
    titleLines: ['SOCIAL', 'MEDIA'],
    tagline: 'STRATEGY & GROWTH',
    description:
      'Social media strategy, content planning, campaign direction, visual communication, and brand growth.',
    capabilities: ['Strategy', 'Content', 'Campaigns', 'Brand Growth'],
  },
  {
    id: 'web-development',
    num: '02',
    titleLines: ['WEB', 'DEVELOPMENT'],
    tagline: 'EXPERIENCES & PLATFORMS',
    description:
      'Modern business websites, interactive experiences, landing pages, portfolio sites, and custom web platforms.',
    capabilities: ['Business Websites', 'Interactive Web', 'Landing Pages', 'Web Platforms'],
  },
  {
    id: 'custom-software',
    num: '03',
    titleLines: ['CUSTOM', 'SOFTWARE'],
    tagline: 'INTERNAL SYSTEMS & ERP',
    description:
      'ERP systems, internal business tools, dashboards, workflow systems, inventory systems, and custom applications.',
    capabilities: ['ERP Systems', 'Dashboards', 'Workflow Tools', 'Business Applications'],
  },
  {
    id: 'automation',
    num: '04',
    titleLines: ['AUTOMATION', 'SYSTEMS'],
    tagline: 'TELEGRAM & WORKFLOWS',
    description:
      'Telegram bots, business automation, notifications, AI-assisted workflows, and connected digital systems.',
    capabilities: ['Telegram Bots', 'Notifications', 'AI Workflows', 'System Automation'],
  },
];

function getServiceWeight(p: number, index: number): number {
  const centers = [0.125, 0.375, 0.625, 0.875];
  const halfWindow = 0.125;
  const blend = 0.045; // Smooth overlap blend zone

  if (index === 0 && p <= centers[0]) return 1;
  if (index === 3 && p >= centers[3]) return 1;

  const dist = Math.abs(p - centers[index]);
  if (dist <= halfWindow - blend) return 1;
  if (dist >= halfWindow + blend) return 0;
  return Math.max(0, Math.min(1, 1 - (dist - (halfWindow - blend)) / (2 * blend)));
}

export default function ServicesReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const serviceItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const currentNumRef = useRef<HTMLSpanElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Measure raw scroll position relative to container
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = container.offsetHeight - windowHeight;

    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
    targetProgressRef.current = progress;
  }, []);

  // Main animation / render loop on requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion || !isInViewport) return;

    let rafId: number;
    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;

      // Smooth lerp (0.09 factor) for buttery transitions
      const nextProgress = current + (target - current) * 0.09;
      smoothProgressRef.current = nextProgress;

      const centers = [0.125, 0.375, 0.625, 0.875];

      // Update each desktop service element directly via DOM refs (zero React re-renders)
      for (let i = 0; i < 4; i++) {
        const el = serviceItemRefs.current[i];
        if (!el) continue;

        const weight = getServiceWeight(nextProgress, i);
        const isPastCenter = nextProgress > centers[i];
        const translateY = (1 - weight) * (isPastCenter ? -26 : 26);
        const scale = 0.98 + weight * 0.02;

        el.style.opacity = String(weight);
        el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        el.style.visibility = weight <= 0.01 ? 'hidden' : 'visible';
        el.style.pointerEvents = weight > 0.5 ? 'auto' : 'none';
      }

      // Update desktop progress bar width
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.min(Math.max(nextProgress * 100, 4), 100)}%`;
      }

      // Update desktop active index display
      if (currentNumRef.current) {
        const activeIdx = Math.min(3, Math.floor(nextProgress * 4));
        currentNumRef.current.textContent = `0${activeIdx + 1}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
    };
  }, [isInViewport, prefersReducedMotion]);

  // Attach passive scroll and resize listeners
  useEffect(() => {
    if (prefersReducedMotion || !isInViewport) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll, isInViewport, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="services"
      className="section-light relative w-full text-slate-950"
      aria-label="Capabilities Showcase"
    >
      {/* ========================================================================= */}
      {/* DESKTOP / TABLET: Focused sticky capabilities reveal                      */}
      {/* ========================================================================= */}
      <div className={`${prefersReducedMotion ? 'hidden' : 'hidden md:block'} relative w-full h-[300vh]`}>
        {/* Sticky Full-Viewport Stage */}
        <div className="sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between px-8 lg:px-16 pt-24 pb-10 lg:pt-24 lg:pb-14 bg-[#f7f6f2]">
          {/* Spatial Depth & Energy Core Background (Continues the final frame of hero video) */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(8,145,178,0.1)_0%,rgba(37,99,235,0.05)_35%,transparent_70%)]" />
          {/* Subtle tunnel floor perspective grid lines */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Top Stage Header */}
          <div className="relative z-20 flex items-end justify-between border-b border-slate-300/80 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-cyan-700" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-700 font-semibold">
                  WHAT ADMAKI BUILDS
                </span>
              </div>
              <h2 className="mt-2 text-2xl lg:text-3xl font-black uppercase tracking-tight text-slate-950">
                From Ideas <span className="text-slate-400 font-light">—</span> To Working Systems.
              </h2>
            </div>

            {/* Stage Counter & Scroll Track */}
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1 font-mono text-sm">
                <span ref={currentNumRef} className="text-slate-950 font-bold text-lg">01</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-500 text-xs">04</span>
              </div>
              <div className="w-28 lg:w-36 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full transition-all duration-75"
                  style={{ width: '4%' }}
                />
              </div>
            </div>
          </div>

          {/* Center Split Reveal Stage */}
          <div className="relative z-20 flex-1 my-auto w-full max-w-7xl mx-auto flex items-center">
            {servicesData.map((svc, i) => (
              <div
                key={svc.id}
                ref={(el) => {
                  serviceItemRefs.current[i] = el;
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-between gap-10 lg:gap-16 will-change-transform"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  visibility: i === 0 ? 'visible' : 'hidden',
                  transform: 'translate3d(0, 0, 0) scale(1)',
                }}
              >
                {/* Left Side: Editorial Typography & Capability Details */}
                <div className="w-1/2 flex flex-col justify-center pr-6">
                  {/* Service Number */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl lg:text-6xl font-mono font-extrabold tracking-tighter text-cyan-700">
                      {svc.num}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                      {'//'} {svc.tagline}
                    </span>
                  </div>

                  {/* Large Dominant Service Title */}
                  <h3 className="text-4xl lg:text-6xl xl:text-7xl font-black uppercase tracking-[-0.03em] leading-[0.92] text-slate-950">
                    {svc.titleLines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-5 text-sm lg:text-base text-slate-600 font-light leading-relaxed max-w-lg">
                    {svc.description}
                  </p>

                  {/* Capabilities Pill List */}
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {svc.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="px-3.5 py-1.5 rounded-full border border-slate-300 bg-white/70 text-xs font-mono text-slate-700 backdrop-blur-md"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Abstract Graphic Visual Area */}
                <div className="w-1/2 flex items-center justify-center">
                  <ServiceVisual index={i} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Micro Footer of Stage */}
          <div className="relative z-20 flex items-center justify-between border-t border-slate-300/80 pt-4 text-xs font-mono text-slate-500">
            <span className="hidden lg:inline">
              Creative, technical, and business-focused digital solutions built around real needs.
            </span>
            <span className="text-cyan-700 uppercase tracking-wider text-xs font-semibold">
              Scroll through capabilities ↓
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE: Clean Vertical Flow (High usability, touch-friendly, no scroll bug) */}
      {/* ========================================================================= */}
      <div className={`${prefersReducedMotion ? 'block' : 'md:hidden'} w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-12`}>
        {/* Mobile Header Intro */}
        <div className="border-b border-slate-300 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-5 bg-cyan-700" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-700 font-semibold">
              WHAT ADMAKI BUILDS
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 leading-tight">
            From Ideas <br />
            To Working Systems.
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">
            Creative, technical, and business-focused digital solutions built around real needs.
          </p>
        </div>

        {/* Stacked Vertical Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((svc, i) => (
            <div
              key={svc.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-3xl font-mono font-black text-cyan-700">{svc.num}</span>
                <span className="text-xs font-mono tracking-wider text-slate-500 uppercase">
                  {svc.tagline}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950">
                  {svc.titleLines.join(' ')}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed font-light">
                  {svc.description}
                </p>
              </div>

              {/* Visual Composition */}
              <div className="w-full">
                <ServiceVisual index={i} />
              </div>

              {/* Capabilities */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {svc.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-3 py-1.5 rounded-full border border-slate-300 bg-slate-50 text-xs font-mono text-slate-700"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
