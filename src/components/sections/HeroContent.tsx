import React, { forwardRef } from 'react';
import Button from '@/components/ui/Button';

interface HeroContentProps {
  className?: string;
}

const services = [
  { id: '01', title: 'Social Media', desc: 'Strategy, campaigns & content systems' },
  { id: '02', title: 'Web Development', desc: 'Business websites & interactive platforms' },
  { id: '03', title: 'Custom Software', desc: 'ERP, dashboards & internal tools' },
  { id: '04', title: 'Automation', desc: 'Telegram, workflows & connected systems' },
];

const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(function HeroContent(
  { className = '' },
  ref
) {
  return (
    <div
      ref={ref}
      className={`relative z-30 flex h-full w-full flex-col justify-end px-6 sm:px-10 md:px-12 lg:px-16 pb-8 sm:pb-10 lg:pb-12 text-white will-change-transform ${className}`}
      style={{ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }}
    >
      <div className="w-full max-w-[1480px] mx-auto">
        <div className="border-t border-white/20 pt-5 sm:pt-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.24em] uppercase text-zinc-200">
                  <span className="h-2 w-2 rounded-full bg-[#69e1f1] shadow-[0_0_12px_rgba(105,225,241,0.7)]" />
                  Creative Technology Studio
                </span>
                <span className="hidden sm:block h-px w-10 bg-white/25" />
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-zinc-400">
                  Strategy · Design · Development · Automation
                </span>
              </div>

              <h1 className="text-[clamp(4.7rem,12vw,11.5rem)] font-black uppercase tracking-[-0.065em] leading-[0.75] text-white">
                ADMAKI
              </h1>

              <div className="mt-7 sm:mt-9 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
                <h2 className="md:col-span-7 text-[clamp(1.65rem,3.2vw,3.3rem)] font-semibold tracking-[-0.045em] leading-[0.98] text-white">
                  Digital work that looks sharp — and works hard for the business.
                </h2>

                <p className="md:col-span-5 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl md:pb-1">
                  Websites, social media, ERP systems and automation designed around real business needs, not generic templates.
                </p>
              </div>

              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3">
                <Button
                  asLink
                  href="#work"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-none"
                >
                  <span>View Selected Work</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </Button>

                <Button
                  asLink
                  href="#contact"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 bg-black/15 backdrop-blur-sm"
                >
                  Start a Project
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-white/20 lg:pl-8">
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-1">
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] uppercase text-zinc-400">
                  What I Build
                </span>
                <span className="text-[10px] font-mono text-zinc-500">01—04</span>
              </div>

              <ul>
                {services.map((svc) => (
                  <li
                    key={svc.id}
                    className="group grid grid-cols-[2.25rem_1fr] gap-3 py-3.5 border-b border-white/12"
                  >
                    <span className="text-[10px] sm:text-xs font-mono text-[#79dfed] pt-0.5">
                      {svc.id}
                    </span>
                    <div>
                      <div className="text-sm sm:text-base font-semibold tracking-tight text-white">
                        {svc.title}
                      </div>
                      <div className="mt-0.5 text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                        {svc.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeroContent;
