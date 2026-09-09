import React from 'react';

const coreCapabilities = [
  { id: '01', title: 'STRATEGY', desc: 'Problem definition, brand position & roadmap' },
  { id: '02', title: 'DESIGN', desc: 'Editorial aesthetics, UI systems & user journey' },
  { id: '03', title: 'DEVELOPMENT', desc: 'Next.js, TypeScript, APIs & cloud platforms' },
  { id: '04', title: 'AUTOMATION', desc: 'Telegram bots, event webhooks & workflows' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-black text-white py-24 sm:py-36 overflow-hidden"
      aria-label="About ADMAKI"
    >
      {/* Oversized background subtle watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full text-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[17vw] font-black tracking-tighter text-white/[0.015] leading-none whitespace-nowrap block">
          ADMAKI
        </span>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Large Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Main Dominant Headline */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-cyan-400" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold">
                ABOUT ADMAKI
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.94] max-w-2xl">
              CREATIVE THINKING. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                TECHNICAL EXECUTION.
              </span>
            </h2>

            {/* Editorial micro-indicator */}
            <div className="pt-4 flex items-center gap-4 text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              <span>DIGITAL STUDIO</span>
              <span className="h-1 w-1 rounded-full bg-zinc-700" />
              <span>EST. FOR IMPACT</span>
            </div>
          </div>

          {/* Right Column: Supporting Copy & Capability Labels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:pt-4">
            {/* Supporting Copy */}
            <div className="space-y-5 border-l border-white/10 pl-6 sm:pl-8">
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                ADMAKI combines creative communication, digital design, software development and
                automation to build practical digital solutions for businesses.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                From content and websites to ERP systems and Telegram automation, every project
                starts with understanding the real problem first.
              </p>
            </div>

            {/* Capability Labels */}
            <div className="pt-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 block">
                Foundational Pillars
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coreCapabilities.map((cap) => (
                  <div
                    key={cap.id}
                    className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between space-y-1 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white tracking-widest">
                        {cap.title}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400/80">{cap.id}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-light leading-tight">
                      {cap.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
