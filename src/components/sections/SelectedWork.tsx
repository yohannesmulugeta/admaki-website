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
      className="relative w-full overflow-hidden bg-[#07090b] text-white py-24 sm:py-32"
      aria-label="Selected Work"
    >
      <div className="absolute inset-0 studio-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cyan-400/[0.04] to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/16 pt-6 sm:pt-8">
          <div className="lg:col-span-4 flex items-start justify-between lg:block">
            <div>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] uppercase text-[#69dceb]">
                02 / SELECTED WORK
              </span>
              <p className="mt-4 hidden lg:block text-xs text-zinc-500 max-w-[15rem] leading-relaxed">
                A small selection of digital systems, interfaces and communication work.
              </p>
            </div>
            <span className="lg:hidden text-[10px] font-mono text-zinc-600">2026</span>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-[clamp(2.8rem,7vw,6.7rem)] font-semibold tracking-[-0.06em] leading-[0.88] text-white max-w-5xl">
              Work built around real problems, not decorative screens.
            </h2>
            <p className="mt-7 max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
              Each project combines the right mix of strategy, design, development and automation for the job.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full">
        {projectsData.map((project, i) => (
          <ProjectShowcase
            key={project.id}
            project={project}
            layoutVariant={layoutVariants[i % layoutVariants.length]}
            index={i}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/16 pt-8 sm:pt-10 items-end">
          <div className="lg:col-span-8">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
              Have something worth building?
            </span>
            <h3 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.045em] leading-[0.95] text-white max-w-3xl">
              Bring the problem. I&apos;ll help shape the right digital solution.
            </h3>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Button
              asLink
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-none"
            >
              <span>Start a Project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
