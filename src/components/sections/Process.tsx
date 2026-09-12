'use client';

import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    tagline: 'DISCOVERY & ARCHITECTURE',
    description: 'Understand the business, user, workflow and actual problem.',
    deliverables: ['Problem Definition', 'Workflow Mapping', 'Requirement Analysis', 'Feasibility Review'],
  },
  {
    number: '02',
    title: 'PLAN',
    tagline: 'STRATEGY & UX DESIGN',
    description: 'Define the structure, user experience, technology and execution plan.',
    deliverables: ['Information Architecture', 'System Specs', 'Technical Stack', 'Execution Roadmap'],
  },
  {
    number: '03',
    title: 'BUILD',
    tagline: 'DESIGN & DEVELOPMENT',
    description: 'Design, develop, test and refine the solution.',
    deliverables: ['Full-Stack Engineering', 'UI/UX Craft', 'API & Bot Integration', 'Rigorous Testing'],
  },
  {
    number: '04',
    title: 'IMPROVE',
    tagline: 'ITERATION & SCALING',
    description: 'Review real usage, fix problems and improve the product over time.',
    deliverables: ['Production Monitoring', 'User Feedback Review', 'Optimization Cycles', 'Continuous Scaling'],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        {
          threshold: 0.45,
          rootMargin: '-10% 0px -30% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section
      className="section-surface-muted relative w-full text-white py-20 sm:py-28 border-t border-white/[0.08] overflow-hidden"
      aria-label="How I Work - Process"
    >
      {/* Background subtle spatial glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-start border-b border-white/10 pb-10 sm:pb-14 mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-cyan-400" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold">
              HOW I WORK
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
            FROM PROBLEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
              TO PRODUCT.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-xl leading-relaxed">
            A practical 4-step creative and technical process designed to turn business challenges into useful digital solutions.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* VERTICAL PROCESS TIMELINE                                                 */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Continuous Left Vertical Timeline Rail (Desktop only) */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-px bg-white/10">
            {/* Animated filling bar */}
            <div
              className="w-full bg-gradient-to-b from-cyan-400 to-indigo-500 transition-all duration-700 ease-out"
              style={{
                height: `${((activeStep + 1) / processSteps.length) * 100}%`,
              }}
            />
          </div>

          {/* Steps Sequence */}
          <div className="space-y-8 sm:space-y-10 md:pl-24">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`relative rounded-3xl border p-6 sm:p-10 lg:p-12 transition-all duration-500 ease-out ${
                    isActive
                      ? 'border-cyan-400/30 bg-zinc-900/60 shadow-[0_0_45px_rgba(56,189,248,0.12)] scale-100 opacity-100'
                      : isPast
                        ? 'border-white/12 bg-white/[0.025] scale-[0.995]'
                        : 'border-white/10 bg-black/20 scale-[0.995]'
                  }`}
                >
                  {/* Timeline Rail Marker Node (Desktop only) */}
                  <div className="hidden md:flex absolute -left-[76px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-black items-center justify-center transition-all duration-300">
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-3.5 h-3.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8]'
                          : isPast
                            ? 'w-2 h-2 bg-indigo-400'
                            : 'w-1.5 h-1.5 bg-zinc-700'
                      }`}
                    />
                  </div>

                  {/* Step Header & Big Number */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`text-5xl sm:text-6xl font-mono font-black tracking-tighter transition-colors duration-300 ${
                          isActive ? 'text-cyan-400' : 'text-zinc-400'
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                        {step.title}
                      </h3>
                    </div>

                    <span className="text-xs font-mono tracking-[0.2em] text-zinc-300 uppercase">
                      {'//'} {step.tagline}
                    </span>
                  </div>

                  {/* Step Description */}
                  <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
                    {step.description}
                  </p>

                  {/* Step Key Deliverables */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-2.5">
                    {step.deliverables.map((item) => (
                      <span
                        key={item}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors duration-300 ${
                          isActive
                            ? 'border border-cyan-400/25 bg-cyan-400/5 text-cyan-200'
                            : 'border border-white/12 bg-white/[0.03] text-zinc-300'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION END CTA                                                           */}
        {/* ========================================================================= */}
        <div className="pt-20 sm:pt-28">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 via-black to-zinc-950 p-10 sm:p-16 lg:p-20 text-center flex flex-col items-center justify-center overflow-hidden shadow-2xl">
            {/* Ambient center glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.15)_0%,rgba(99,102,241,0.08)_40%,transparent_70%)]" />

            <span className="relative z-10 text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold mb-4">
              COLLABORATION // LET&apos;S TALK
            </span>

            <h3 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight max-w-3xl">
              HAVE AN IDEA? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                LET&apos;S TURN IT INTO SOMETHING REAL.
              </span>
            </h3>

            <div className="relative z-10 mt-8 sm:mt-10">
              <Button
                asLink
                href="#contact"
                variant="primary"
                size="lg"
                className="shadow-[0_0_22px_rgba(103,232,249,0.16)] text-sm sm:text-base tracking-wide"
              >
                <span>Start a Conversation</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 text-black">
                  →
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
