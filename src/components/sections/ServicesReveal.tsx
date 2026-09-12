'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ServiceVisual from '@/components/services/ServiceVisual';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ServiceData {
  id: string;
  num: string;
  title: string;
  kicker: string;
  description: string;
  capabilities: string[];
}

const servicesData: ServiceData[] = [
  {
    id: 'social-media',
    num: '01',
    title: 'Social Media',
    kicker: 'Strategy & Growth',
    description:
      'Content planning, campaign direction, visual communication and social systems designed around a clear business objective.',
    capabilities: ['Strategy', 'Content', 'Campaigns', 'Brand Growth'],
  },
  {
    id: 'web-development',
    num: '02',
    title: 'Web Development',
    kicker: 'Experiences & Platforms',
    description:
      'Modern business websites, interactive experiences, landing pages, portfolio sites and custom web platforms.',
    capabilities: ['Business Websites', 'Interactive Web', 'Landing Pages', 'Web Platforms'],
  },
  {
    id: 'custom-software',
    num: '03',
    title: 'Custom Software',
    kicker: 'Internal Systems & ERP',
    description:
      'ERP systems, dashboards, workflow tools, inventory systems and custom applications built around real operations.',
    capabilities: ['ERP Systems', 'Dashboards', 'Workflow Tools', 'Business Applications'],
  },
  {
    id: 'automation',
    num: '04',
    title: 'Automation',
    kicker: 'Telegram & Workflows',
    description:
      'Telegram bots, notifications, AI-assisted workflows and connected automations that reduce repetitive work.',
    capabilities: ['Telegram Bots', 'Notifications', 'AI Workflows', 'System Automation'],
  },
];

function getWeight(progress: number, index: number) {
  const centers = [0.125, 0.375, 0.625, 0.875];
  const distance = Math.abs(progress - centers[index]);
  const inner = 0.085;
  const outer = 0.17;

  if (index === 0 && progress <= centers[0]) return 1;
  if (index === 3 && progress >= centers[3]) return 1;
  if (distance <= inner) return 1;
  if (distance >= outer) return 0;
  return 1 - (distance - inner) / (outer - inner);
}

export default function ServicesReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
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

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const totalScrollable = container.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    targetProgressRef.current = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isInViewport) return;

    let rafId = 0;
    let running = true;

    const tick = () => {
      if (!running) return;

      const current = smoothProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * 0.09;
      smoothProgressRef.current = next;

      serviceRefs.current.forEach((el, index) => {
        if (!el) return;
        const weight = getWeight(next, index);
        const offset = (1 - weight) * (next > (index + 0.5) / 4 ? -22 : 22);
        el.style.opacity = String(weight);
        el.style.visibility = weight < 0.02 ? 'hidden' : 'visible';
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
        el.style.pointerEvents = weight > 0.7 ? 'auto' : 'none';
      });

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(0.03, next)})`;
      }

      if (countRef.current) {
        const active = Math.min(3, Math.floor(next * 4));
        countRef.current.textContent = `0${active + 1}`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, [isInViewport, prefersReducedMotion]);

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
      className="relative w-full bg-[#f0ede5] text-[#111315]"
      aria-label="Capabilities Showcase"
    >
      <div className={`${prefersReducedMotion ? 'hidden' : 'hidden md:block'} relative h-[235vh]`}>
        <div className="sticky top-0 h-screen min-h-[100dvh] overflow-hidden">
          <div className="absolute inset-0 studio-grid-light opacity-30 pointer-events-none" />

          <div className="relative z-10 h-full w-full max-w-[1480px] mx-auto px-8 lg:px-16 py-8 lg:py-10 flex flex-col">
            <div className="flex items-start justify-between gap-8 border-t border-black/18 pt-5">
              <div>
                <span className="text-[10px] lg:text-xs font-mono tracking-[0.28em] uppercase text-[#0f8195]">
                  01 / CAPABILITIES
                </span>
                <p className="mt-3 text-sm text-black/50 max-w-sm">
                  Four disciplines brought together around one business problem.
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <span ref={countRef} className="font-semibold text-[#111315]">01</span>
                <span className="text-black/30">/ 04</span>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 mt-8 lg:mt-10">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  ref={(el) => {
                    serviceRefs.current[index] = el;
                  }}
                  className="absolute inset-0 grid grid-cols-12 gap-8 lg:gap-16 items-center will-change-transform"
                  style={{ opacity: index === 0 ? 1 : 0, visibility: index === 0 ? 'visible' : 'hidden' }}
                >
                  <div className="col-span-7 xl:col-span-6">
                    <div className="flex items-center gap-4 mb-7">
                      <span className="text-sm font-mono text-[#0f8195]">{service.num}</span>
                      <span className="h-px flex-1 bg-black/15" />
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-black/45">
                        {service.kicker}
                      </span>
                    </div>

                    <h2 className="text-[clamp(4rem,7.6vw,8rem)] font-semibold tracking-[-0.065em] leading-[0.82] text-[#111315]">
                      {service.title}
                    </h2>

                    <p className="mt-8 max-w-xl text-base lg:text-lg text-black/58 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-10 border-t border-black/16">
                      {service.capabilities.map((capability, capIndex) => (
                        <div
                          key={capability}
                          className="grid grid-cols-[2.5rem_1fr] py-3 border-b border-black/12 text-sm"
                        >
                          <span className="text-[10px] font-mono text-black/35">0{capIndex + 1}</span>
                          <span className="text-black/72">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-5 xl:col-span-6 flex items-center justify-center pl-4 lg:pl-8">
                    <div className="w-full max-w-[34rem]">
                      <ServiceVisual index={index} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/16 pt-4">
              <div className="h-px w-full bg-black/10 overflow-hidden origin-left">
                <div
                  ref={progressRef}
                  className="h-full w-full bg-[#0f8195] origin-left will-change-transform"
                  style={{ transform: 'scaleX(0.03)' }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono tracking-[0.16em] uppercase text-black/40">
                <span>Scroll to explore</span>
                <span>Strategy → Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${prefersReducedMotion ? 'block' : 'md:hidden'} relative px-6 sm:px-10 py-20 sm:py-24`}>
        <div className="absolute inset-0 studio-grid-light opacity-25 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="border-t border-black/18 pt-5 pb-10">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#0f8195]">
              01 / CAPABILITIES
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-[-0.05em] leading-[0.95]">
              Four disciplines. One connected approach.
            </h2>
          </div>

          <div className="border-t border-black/16">
            {servicesData.map((service, index) => (
              <article key={service.id} className="py-10 border-b border-black/16">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono text-[#0f8195]">{service.num}</span>
                  <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-black/40">
                    {service.kicker}
                  </span>
                </div>

                <h3 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-[-0.04em]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-black/58 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-7 w-full max-w-md">
                  <ServiceVisual index={index} />
                </div>

                <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-xs text-black/55">
                  {service.capabilities.map((capability) => (
                    <span key={capability}>{capability}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
