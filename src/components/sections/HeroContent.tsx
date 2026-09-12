import React, { forwardRef } from 'react';
import Button from '@/components/ui/Button';

interface HeroContentProps {
  className?: string;
}

const services = [
  { id: '01', title: 'Social Media', desc: 'Growth & Management' },
  { id: '02', title: 'Web Development', desc: 'Design & Code' },
  { id: '03', title: 'Custom Software', desc: 'ERP & Systems' },
  { id: '04', title: 'Telegram Bots', desc: 'Automation & APIs' },
];

const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(function HeroContent(
  { className = '' },
  ref
) {
  return (
    <div
      ref={ref}
      className={`relative z-30 flex h-full w-full flex-col justify-end px-6 sm:px-10 md:px-14 lg:px-18 pb-10 sm:pb-14 md:pb-16 text-white will-change-transform select-none ${className}`}
      style={{
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      }}
    >
      {/* Asymmetric Editorial Grid */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-14">
        {/* Left Column: Dominant Branding, Headline, Description & CTAs */}
        <div className="w-full lg:max-w-3xl flex flex-col items-start text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="h-px w-6 sm:w-8 bg-emerald-400" />
            <span className="text-xs font-mono tracking-[0.22em] uppercase text-cyan-300 font-medium">
              DIGITAL • CREATIVE • TECHNOLOGY
            </span>
          </div>

          {/* Main Dominant Title: ADMAKI */}
          <h1 className="text-[clamp(3.75rem,11.5vw,10.5rem)] font-black uppercase tracking-[-0.04em] leading-[0.84] text-white">
            ADMAKI
          </h1>

          {/* Headline */}
          <h2 className="mt-4 sm:mt-5 text-[clamp(1.25rem,2.8vw,2.4rem)] font-bold uppercase tracking-[-0.02em] leading-[1.12] text-zinc-100 max-w-2xl">
            I turn ideas into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              digital experiences.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed">
            Social media, websites, custom software and automation built to move businesses forward.
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              asLink
              href="#work"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-[0_0_20px_rgba(103,232,249,0.16)]"
            >
              <span>Explore My Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>

            <Button
              asLink
              href="#contact"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Let&apos;s Build Something
            </Button>
          </div>
        </div>

        {/* Right Column: Editorial Service Micro-List */}
        <div className="w-full lg:w-auto flex flex-col items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono tracking-[0.2em] text-zinc-300 uppercase">
              Core Capabilities
            </span>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3 sm:gap-6 lg:gap-3 w-full">
            {services.map((svc) => (
              <li
                key={svc.id}
                className="group flex flex-col lg:items-end text-left lg:text-right"
              >
                <div className="flex items-center lg:justify-end gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 group-hover:text-white transition-colors duration-200">
                  <span className="text-xs text-cyan-300 font-semibold">{svc.id}</span>
                  <span className="font-semibold">{svc.title}</span>
                </div>
                <span className="text-xs tracking-wider text-zinc-400 hidden sm:block">
                  {svc.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default HeroContent;
