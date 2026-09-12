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
      className="group relative block w-full overflow-hidden rounded-[1.15rem] border border-white/12 bg-[#0b0d10] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      aria-label={`View case study for ${project.title}`}
    >
      <div className={`relative w-full ${aspectClass} overflow-hidden`}>
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
        )}

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#69dceb]" />
          {project.category}
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 h-11 w-11 rounded-full border border-white/25 bg-black/45 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:rotate-45">
          ↗
        </div>
      </div>
    </Link>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center justify-between gap-4 border-b border-white/14 pb-4 mb-6">
        <span className="text-xs font-mono tracking-[0.22em] uppercase text-[#69dceb]">
          Project {project.number}
        </span>
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.16em] uppercase text-zinc-500">
          {project.year} / {project.category}
        </span>
      </div>

      <h3 className="text-[clamp(2.35rem,5vw,5.4rem)] font-semibold tracking-[-0.055em] leading-[0.9] text-white">
        {project.title}
      </h3>

      <p className="mt-5 text-sm sm:text-base font-medium text-zinc-200 leading-relaxed max-w-2xl">
        {project.tagline}
      </p>

      <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
        {project.description}
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-600 block mb-3">
            Scope
          </span>
          <div className="space-y-1.5">
            {project.services.slice(0, 4).map((service) => (
              <div key={service} className="text-xs sm:text-sm text-zinc-300">
                {service}
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-600 block mb-3">
            Technology
          </span>
          <div className="space-y-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <div key={tech} className="text-xs sm:text-sm text-zinc-400">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href={project.href || '#'}
          className="group inline-flex items-center gap-4 text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-white transition-colors hover:text-[#83e3ef]"
        >
          <span className="border-b border-white/30 pb-1 group-hover:border-[#83e3ef] transition-colors">
            View Case Study
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">↗</span>
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
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -70px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visualFirst = layoutVariant !== 'visual-right';
  const isWide = layoutVariant === 'full-width';

  return (
    <article
      ref={containerRef}
      className={`relative w-full border-t border-white/12 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-6'
      }`}
      aria-label={`Case study: ${project.title}`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div
          className={`absolute h-[38rem] w-[38rem] rounded-full blur-[150px] ${
            index % 2 === 0 ? '-left-64 top-1/4 bg-cyan-400/[0.035]' : '-right-64 top-1/4 bg-blue-500/[0.035]'
          }`}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-28">
        {isWide ? (
          <div className="space-y-10 lg:space-y-12">
            <ProjectVisual project={project} aspectClass="aspect-[16/9] lg:aspect-[21/9]" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="text-[clamp(5rem,10vw,9rem)] leading-none font-black tracking-[-0.07em] text-white/[0.055]">
                  {project.number}
                </div>
              </div>
              <div className="lg:col-span-8">
                <ProjectDetails project={project} />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              visualFirst ? '' : 'lg:[&>*:first-child]:order-2'
            }`}
          >
            <div className="lg:col-span-7">
              <ProjectVisual
                project={project}
                aspectClass={layoutVariant === 'split' ? 'aspect-[4/3]' : 'aspect-[16/10]'}
              />
            </div>
            <div className="lg:col-span-5">
              <ProjectDetails project={project} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
