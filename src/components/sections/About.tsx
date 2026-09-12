import React from 'react';

const coreCapabilities = [
  { id: '01', title: 'Strategy', desc: 'Define the real problem, audience, priorities and roadmap.' },
  { id: '02', title: 'Design', desc: 'Create clear interfaces, visual systems and communication that feels intentional.' },
  { id: '03', title: 'Development', desc: 'Turn the approved direction into dependable websites, systems and tools.' },
  { id: '04', title: 'Automation', desc: 'Connect repetitive work, notifications and workflows so teams move faster.' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#f0ede5] text-[#111315] py-24 sm:py-32"
      aria-label="About ADMAKI"
    >
      <div className="absolute inset-0 studio-grid-light opacity-35 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-black/18 pt-6 sm:pt-8">
          <div className="lg:col-span-4">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] uppercase text-[#0f8195]">
              03 / ABOUT ADMAKI
            </span>
            <p className="mt-5 max-w-xs text-sm text-black/55 leading-relaxed">
              Creative thinking and technical execution in one place.
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-[clamp(3rem,7.5vw,7rem)] font-semibold tracking-[-0.065em] leading-[0.87] text-[#111315] max-w-6xl">
              One studio for the thinking, the interface and the system behind it.
            </h2>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 lg:col-start-5">
            <p className="text-lg sm:text-xl text-black/80 leading-relaxed tracking-[-0.015em]">
              ADMAKI combines creative communication, digital design, software development and automation to build practical digital solutions for businesses.
            </p>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-black/55 leading-relaxed max-w-lg">
              The work starts with understanding the business problem first. The design, technology and workflow come after that — so the final result is useful, maintainable and easier to grow.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 border-t border-black/18">
          {coreCapabilities.map((cap) => (
            <div
              key={cap.id}
              className="group grid grid-cols-[3rem_1fr] md:grid-cols-12 gap-4 md:gap-6 py-6 sm:py-8 border-b border-black/14 items-start transition-colors hover:bg-black/[0.018]"
            >
              <span className="md:col-span-1 text-[10px] sm:text-xs font-mono text-[#0f8195] pt-1">
                {cap.id}
              </span>
              <h3 className="md:col-span-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.035em] leading-none text-[#111315]">
                {cap.title}
              </h3>
              <p className="col-start-2 md:col-start-auto md:col-span-7 text-sm sm:text-base text-black/55 leading-relaxed max-w-2xl">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
