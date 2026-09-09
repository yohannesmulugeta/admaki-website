import React from 'react';
import Button from '@/components/ui/Button';

// Central contact data object - update your real contact details here:
export const contactData = {
  email: {
    label: 'Email',
    value: 'hello@admaki.com', // [PLACEHOLDER - Replace with your email]
    href: 'mailto:hello@admaki.com',
    description: 'Inquiries & New Projects',
  },
  telegram: {
    label: 'Telegram',
    value: '@admaki_studio', // [PLACEHOLDER - Replace with your Telegram handle]
    href: 'https://t.me/admaki_studio',
    description: 'Direct Message & Automation Demos',
  },
  linkedin: {
    label: 'LinkedIn',
    value: 'linkedin.com/in/admaki', // [PLACEHOLDER - Replace with your LinkedIn URL]
    href: 'https://linkedin.com/in/admaki',
    description: 'Professional Network',
  },
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-black text-white py-24 sm:py-36 border-t border-white/[0.06] overflow-hidden"
      aria-label="Start a Project - Contact ADMAKI"
    >
      {/* Subtle ambient lighting only */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Asymmetric Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Side: Headline & Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-cyan-400" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold">
                START A PROJECT
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.94] max-w-2xl">
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                SOMETHING USEFUL.
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
              Have a website, social media, software, ERP, or automation project in mind? Tell me what
              you are trying to solve.
            </p>

            {/* Direct Project Inquiry Action */}
            <div className="pt-4 sm:pt-6 w-full sm:w-auto">
              <Button
                asLink
                href={contactData.email.href}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.2)] text-sm sm:text-base font-semibold"
              >
                <span>Start a Conversation</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </div>

          {/* Right Side: Contact Channels with Large Touch Targets */}
          <div className="lg:col-span-5 flex flex-col space-y-4 lg:pt-4 w-full">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2">
              Direct Contact Methods
            </span>

            {/* Email Channel */}
            <a
              href={contactData.email.href}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-cyan-400/40 transition-all duration-300 gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {contactData.email.label}
                </span>
                <span className="text-base sm:text-lg font-mono font-medium text-white group-hover:text-cyan-300 transition-colors">
                  {contactData.email.value}
                </span>
                <span className="text-xs text-zinc-500 font-light mt-0.5">
                  {contactData.email.description}
                </span>
              </div>
              <span className="self-end sm:self-center text-sm font-mono text-zinc-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>

            {/* Telegram Channel */}
            <a
              href={contactData.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-cyan-400/40 transition-all duration-300 gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {contactData.telegram.label}
                </span>
                <span className="text-base sm:text-lg font-mono font-medium text-white group-hover:text-cyan-300 transition-colors">
                  {contactData.telegram.value}
                </span>
                <span className="text-xs text-zinc-500 font-light mt-0.5">
                  {contactData.telegram.description}
                </span>
              </div>
              <span className="self-end sm:self-center text-sm font-mono text-zinc-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>

            {/* LinkedIn Channel */}
            <a
              href={contactData.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-cyan-400/40 transition-all duration-300 gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {contactData.linkedin.label}
                </span>
                <span className="text-base sm:text-lg font-mono font-medium text-white group-hover:text-cyan-300 transition-colors">
                  {contactData.linkedin.value}
                </span>
                <span className="text-xs text-zinc-500 font-light mt-0.5">
                  {contactData.linkedin.description}
                </span>
              </div>
              <span className="self-end sm:self-center text-sm font-mono text-zinc-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
