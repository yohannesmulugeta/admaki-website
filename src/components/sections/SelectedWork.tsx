import React from 'react';
import { projectsData } from '@/data/projects';
import ProjectShowcase from '@/components/projects/ProjectShowcase';
import Button from '@/components/ui/Button';

export default function SelectedWork() {
  const layoutVariants: ('visual-left' | 'visual-right' | 'full-width' | 'split')[] = [
    'visual-left',
    'visual-right',
    'full-width',
    'split',
  ];

  return (
    <section
      id="work"
      className="section-light-muted relative w-full text-slate-950 py-20 sm:py-28"
      aria-label="Selected Work"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-96 pointer-events-none bg-gradient-to-b from-[#f7f6f2] via-white/40 to-transparent" />

      {/* ========================================================================= */}
      {/* SECTION INTRO HEADER                                                      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12 mb-16 sm:mb-24">
        <div className="flex flex-col items-start border-b border-slate-300 pb-10 sm:pb-14">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-cyan-700" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-700 font-semibold">
              SELECTED WORK
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-slate-950 leading-[0.95] max-w-4xl">
            DIGITAL WORK <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500">
              BUILT FOR REAL BUSINESS.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
            A selection of websites, software systems, automation tools and digital experiences.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDIES VERTICAL SEQUENCE                                            */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full flex flex-col space-y-8 sm:space-y-12">
        {projectsData.map((project, i) => (
          <ProjectShowcase
            key={project.id}
            project={project}
            layoutVariant={layoutVariants[i % layoutVariants.length]}
            index={i}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION END CTA                                                           */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 md:px-12 pt-20 sm:pt-28">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-black p-10 sm:p-16 lg:p-20 text-center flex flex-col items-center justify-center overflow-hidden shadow-2xl">
          {/* Subtle central glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.12)_0%,rgba(99,102,241,0.06)_45%,transparent_70%)]" />

          {/* Eyebrow */}
          <span className="relative z-10 text-xs font-mono tracking-[0.3em] uppercase text-cyan-300 font-semibold mb-4">
            NEXT STEP // ENGAGEMENT
          </span>

          {/* Headline */}
          <h3 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight max-w-3xl">
            MORE THAN A PORTFOLIO. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              I BUILD SYSTEMS THAT WORK.
            </span>
          </h3>

          {/* Button CTA */}
          <div className="relative z-10 mt-8 sm:mt-10">
            <Button
              asLink
              href="#contact"
              variant="primary"
              size="lg"
              className="shadow-[0_0_22px_rgba(103,232,249,0.16)] text-sm sm:text-base tracking-wide"
            >
              <span>Start a Project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 text-black">
                →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
