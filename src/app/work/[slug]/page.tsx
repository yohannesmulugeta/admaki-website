import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projectsData, getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import TelegramBotSimulator from '@/components/interactive/TelegramBotSimulator';
import Footer from '@/components/layout/Footer';
import { absoluteAssetUrl, withBasePath } from '@/lib/siteConfig';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const socialImage = absoluteAssetUrl(project.image);

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ADMAKI Digital Studio`,
      description: project.description,
      type: 'article',
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ADMAKI`,
      description: project.description,
      images: [socialImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find index for next/previous navigation
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const projectImage = withBasePath(project.image);
  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Editorial Inner Header */}
      <header className="sticky top-0 z-50 w-full bg-black/70 backdrop-blur-xl border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-zinc-400 hover:text-white uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md py-1 px-2 -ml-2"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1 text-cyan-400">
              ←
            </span>
            <span>Back to Selected Work</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-mono font-bold tracking-[0.2em] uppercase text-white hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md p-1"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>ADMAKI</span>
          </Link>

          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono tracking-widest text-white hover:border-cyan-400 hover:text-cyan-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Let&apos;s Build →
          </Link>
        </div>
      </header>

      {/* Main Case Study Article */}
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-24 pb-16 border-b border-white/[0.08] overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            {/* Project Index & Category */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <span className="px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] font-mono text-xs text-cyan-300 tracking-widest uppercase">
                {project.category}
              </span>
              <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
                PROJECT {project.number} {'//'} {project.year}
              </span>
              <div className="h-3 w-px bg-white/20" />
              <span className="font-mono text-xs text-zinc-300 tracking-wider">
                {project.clientType}
              </span>
            </div>

            {/* Case Study Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.03em] leading-[1.05] mb-6 max-w-5xl">
              {project.title}
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-lg sm:text-2xl text-zinc-300 font-light max-w-3xl leading-relaxed mb-12">
              {project.tagline}
            </p>

            {/* Project Meta Spec Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 font-mono text-xs">
              <div>
                <span className="text-zinc-400 uppercase tracking-widest block mb-2 font-medium">Sector</span>
                <span className="text-zinc-200">{project.clientType}</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase tracking-widest block mb-2 font-medium">Timeline</span>
                <span className="text-zinc-200">Year {project.year}</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase tracking-widest block mb-2 font-medium">Deliverables</span>
                <span className="text-zinc-200">{project.services.join(', ')}</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase tracking-widest block mb-2 font-medium">Technologies</span>
                <span className="text-cyan-400 font-semibold">{project.technologies.join(' • ')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Outcomes / Metrics Strip */}
        {project.metricsOrOutcomes && project.metricsOrOutcomes.length > 0 && (
          <section className="border-b border-white/[0.08] bg-zinc-950/60 py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.metricsOrOutcomes.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-6 rounded-xl border border-white/[0.07] bg-black/40 relative group hover:border-white/20 transition-all"
                  >
                    <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight mb-2">
                      {metric.value}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-zinc-400 font-light">
                      {metric.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Primary Interactive or Visual Asset */}
        <section className="py-16 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
                {project.slug === 'telegram-automation'
                  ? 'LIVE INTERACTIVE SIMULATION'
                  : 'SYSTEM BLUEPRINT & PREVIEW'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                ASSET // {project.number}
              </span>
            </div>

            {project.slug === 'telegram-automation' ? (
              /* Embed Interactive Telegram Bot Simulator */
              <div className="w-full">
                <TelegramBotSimulator />
              </div>
            ) : (
              /* Cinematic Architecture Graphic Container */
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl border border-white/10 bg-zinc-950/90 overflow-hidden shadow-2xl">
                <Image
                  src={projectImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-400 bg-black/60 backdrop-blur-md px-4 py-3 rounded-lg border border-white/10">
                  <span>Architecture Schematic: {project.title}</span>
                  <span className="text-cyan-300">PROJECT SHOWCASE</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Core Analysis: Overview, Challenge & Solution */}
        <section className="py-20 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {/* Overview Narrative */}
            <div className="max-w-4xl mb-20">
              <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold block mb-4">
                01 // EXECUTIVE SUMMARY
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
                System Context & Objective
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Challenge Column */}
              <div className="p-8 sm:p-10 rounded-2xl border border-rose-500/20 bg-rose-950/5 relative">
                <span className="text-xs font-mono tracking-[0.25em] text-rose-400 uppercase font-semibold block mb-4">
                  02 // THE CHALLENGE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {project.challenge.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-8">
                  {project.challenge.description}
                </p>

                <div className="space-y-4">
                  <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase block">
                    Core Bottlenecks
                  </span>
                  <ul className="space-y-3">
                    {project.challenge.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <span className="text-rose-400 font-mono mt-0.5">✕</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solution Column */}
              <div className="p-8 sm:p-10 rounded-2xl border border-cyan-500/20 bg-cyan-950/5 relative">
                <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold block mb-4">
                  03 // THE ENGINEERING SOLUTION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {project.solution.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-8">
                  {project.solution.description}
                </p>

                <div className="space-y-4">
                  <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase block">
                    Key Implementations
                  </span>
                  <ul className="space-y-3">
                    {project.solution.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <span className="text-cyan-400 font-mono mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Architecture & Pipeline */}
        <section className="py-20 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold block mb-4">
              04 // SYSTEM TOPOLOGY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-6">
              {project.architecture.title}
            </h2>

            {/* Architecture Flow Box */}
            <div className="p-6 sm:p-8 rounded-xl border border-white/10 bg-zinc-950/80 mb-12 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-x-auto">
              <div className="text-xs tracking-wider text-zinc-400 uppercase mb-3">
                Pipeline Diagram
              </div>
              <div className="text-cyan-300">
                {project.architecture.description}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.architecture.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-white/[0.06] bg-black/40 flex items-start gap-4"
                >
                  <span className="text-xs font-mono text-zinc-400">0{idx + 1}</span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous / Next Project Switcher */}
        <section className="py-16 border-b border-white/[0.08] bg-zinc-950/40">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Previous Project */}
              <Link
                href={prevProject.href}
                className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/60 hover:border-white/20 transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3 flex items-center gap-2">
                  <span className="transition-transform group-hover:-translate-x-1 text-cyan-400">←</span>
                  <span>Previous Project</span>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold uppercase text-white group-hover:text-cyan-300 transition-colors">
                    {prevProject.title}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-1">
                    {prevProject.category}
                  </div>
                </div>
              </Link>

              {/* Next Project */}
              <Link
                href={nextProject.href}
                className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/60 hover:border-white/20 transition-all flex flex-col justify-between text-left sm:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3 flex items-center gap-2 sm:justify-end">
                  <span>Next Project</span>
                  <span className="transition-transform group-hover:translate-x-1 text-cyan-400">→</span>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold uppercase text-white group-hover:text-cyan-300 transition-colors">
                    {nextProject.title}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-1">
                    {nextProject.category}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Project Specific Call To Action */}
        <section className="py-24 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold block mb-4">
              START A CONVERSATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Have a Similar Challenge in Mind?
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto leading-relaxed mb-8">
              Whether you need high-retention social systems, modern web engineering, ERP software, or Telegram automation, let&apos;s build something useful.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/#contact"
                className="px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Start a Project →
              </Link>
              <Link
                href="/#work"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-all"
              >
                View All Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
