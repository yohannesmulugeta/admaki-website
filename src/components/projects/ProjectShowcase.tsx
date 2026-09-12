'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectShowcaseProps {
  project: Project;
  layoutVariant: 'visual-left' | 'visual-right' | 'full-width' | 'split';
  index: number;
}

// Standalone Visual Component (declared outside render to satisfy React 19 rules)
function ProjectVisual({
  project,
  aspectClass = 'aspect-[16/10]',
}: {
  project: Project;
  aspectClass?: string;
}) {
  return (
    <Link
      href={project.href || '#'}
      className="group relative w-full block rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      aria-label={`View Case Study for ${project.title}`}
    >
      {/* Visual Image Container with 300-500ms hover scale */}
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        )}

        {/* Ambient Dark Gradient & Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-40" />

        {/* Top-Right Badge */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
          {project.category}
        </div>

        {/* Floating Quick Action indicator */}
        <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/70 backdrop-blur-md text-xs font-mono text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span>Explore Architecture</span>
          <span className="text-cyan-400">→</span>
        </div>
      </div>
    </Link>
  );
}

// Standalone Details Component (declared outside render)
function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-center space-y-6">
      {/* Category & Project Index Header */}
      <div className="flex items-center gap-3">
        <span className="text-4xl sm:text-5xl font-mono font-black text-cyan-700 tracking-tighter">
          {project.number}
        </span>
        <div className="h-4 w-px bg-slate-300" />
        <span className="text-xs font-mono tracking-[0.25em] text-slate-500 uppercase font-semibold">
          PROJECT {project.number} {'//'} {project.category}
        </span>
      </div>

      {/* Main Project Title */}
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] leading-[1.05] text-slate-950">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-xl">
        {project.description}
      </p>

      {/* Capabilities / Services Provided */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono tracking-[0.18em] text-slate-500 uppercase block">
          Scope of Execution
        </span>
        <div className="flex flex-wrap gap-2">
          {project.services.map((svc) => (
            <span
              key={svc}
              className="px-3 py-1 rounded-full border border-slate-300 bg-white/70 text-xs font-mono text-slate-700"
            >
              {svc}
            </span>
          ))}
        </div>
      </div>

      {/* Technologies Used */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-[0.18em] text-slate-500 uppercase block">
            Core Technology
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded border border-cyan-700/20 bg-cyan-700/5 text-[11px] font-mono text-cyan-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Primary Case Study CTA Button */}
      <div className="pt-4">
        <Link
          href={project.href || '#'}
          className="group/cta inline-flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold text-slate-950 hover:text-cyan-800 transition-colors duration-200"
        >
          <span className="border-b border-slate-400 pb-0.5 group-hover/cta:border-cyan-700 transition-colors">
            View Case Study
          </span>
          <span className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5 text-cyan-700">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ProjectShowcase({
  project,
  layoutVariant,
  index,
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={containerRef}
      className={`relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center py-12 lg:py-20 border-t border-slate-300/80 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-100 translate-y-6 scale-[0.99]'
      }`}
      aria-label={`Case Study: ${project.title}`}
    >
      {/* Ambient background shift per project */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-45' : 'opacity-0'
        } ${
          index % 2 === 0
            ? 'bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.08),transparent_60%)]'
            : 'bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.08),transparent_60%)]'
        }`}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* LAYOUT VARIANT 1: Visual Left, Content Right */}
        {layoutVariant === 'visual-left' && (
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-7/12">
              <ProjectVisual project={project} aspectClass="aspect-[16/10]" />
            </div>
            <div className="w-full lg:w-5/12">
              <ProjectDetails project={project} />
            </div>
          </div>
        )}

        {/* LAYOUT VARIANT 2: Content Left, Visual Right */}
        {layoutVariant === 'visual-right' && (
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-7/12">
              <ProjectVisual project={project} aspectClass="aspect-[16/10]" />
            </div>
            <div className="w-full lg:w-5/12">
              <ProjectDetails project={project} />
            </div>
          </div>
        )}

        {/* LAYOUT VARIANT 3: Visual Full-Width with Floating Content */}
        {layoutVariant === 'full-width' && (
          <div className="relative w-full">
            <div className="w-full">
              <ProjectVisual project={project} aspectClass="aspect-[16/9] sm:aspect-[21/9]" />
            </div>

            <div className="mt-8 lg:mt-0 lg:absolute lg:bottom-8 lg:left-8 lg:max-w-xl lg:p-8 lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-white/95 lg:backdrop-blur-xl lg:shadow-[0_20px_55px_rgba(15,23,42,0.16)]">
              <ProjectDetails project={project} />
            </div>
          </div>
        )}

        {/* LAYOUT VARIANT 4: Split Composition */}
        {layoutVariant === 'split' && (
          <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14">
            <div className="w-full lg:w-6/12 flex items-center">
              <ProjectVisual project={project} aspectClass="aspect-[4/3] lg:aspect-square" />
            </div>
            <div className="w-full lg:w-6/12 flex flex-col justify-center lg:pl-6">
              <ProjectDetails project={project} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
