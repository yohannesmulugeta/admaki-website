import React from 'react';
import Link from 'next/link';

const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-[#050607] text-white border-t border-white/12 pt-16 sm:pt-20 pb-8"
      aria-label="ADMAKI Footer"
    >
      <div className="absolute inset-0 studio-grid-dark opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 border-t border-white/16 pt-6 sm:pt-8">
          <div className="lg:col-span-8">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.26em] uppercase text-[#69dceb]">
              ADMAKI / CREATIVE TECHNOLOGY STUDIO
            </span>
            <p className="mt-5 max-w-2xl text-lg sm:text-2xl text-zinc-300 tracking-[-0.02em] leading-snug">
              Strategy, design, software and automation brought together to build useful digital work.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <Link
          href="/"
          className="group mt-14 sm:mt-20 block border-y border-white/12 py-5 sm:py-7 focus:outline-none"
          aria-label="ADMAKI Home"
        >
          <span className="block text-[clamp(4.6rem,17vw,15rem)] font-black uppercase tracking-[-0.075em] leading-[0.72] text-white transition-colors group-hover:text-[#dff9fc]">
            ADMAKI
          </span>
        </Link>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] sm:text-xs font-mono tracking-[0.14em] uppercase text-zinc-600">
          <span>© ADMAKI</span>
          <div className="flex items-center gap-5">
            <span>Ideas → Systems → Impact</span>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
