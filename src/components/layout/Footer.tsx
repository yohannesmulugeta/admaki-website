import React from 'react';

const services = [
  { label: 'Social Media', href: '#services' },
  { label: 'Web Development', href: '#services' },
  { label: 'Custom Software', href: '#services' },
  { label: 'Telegram Bots', href: '#services' },
];

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-black text-white border-t border-white/10 pt-16 pb-12 overflow-hidden"
      aria-label="ADMAKI Footer"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-14 border-b border-white/[0.08]">
          {/* Brand & Statement */}
          <div className="md:col-span-6 flex flex-col items-start space-y-4">
            <a
              href="#"
              className="group flex items-center gap-2.5 text-white tracking-tighter focus:outline-none"
              aria-label="ADMAKI Home"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              <span className="font-black text-2xl tracking-[0.2em] uppercase font-sans">
                ADMAKI
              </span>
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm leading-relaxed">
              Creative communication, digital design, software development and automation built to
              move businesses forward.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-medium">
                IDEAS → SYSTEMS → IMPACT
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500 font-semibold">
              Services
            </span>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500 font-semibold">
              Navigation
            </span>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Minimal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © ADMAKI
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wider text-zinc-500">
            <span>DIGITAL STUDIO</span>
            <span>•</span>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
