import React from 'react';
import Button from '@/components/ui/Button';

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  note: string;
}

const contactMethods: ContactMethod[] = [
  {
    label: 'EMAIL',
    value: 'hello@admaki.com', // [Placeholder: Replace with primary contact email]
    href: 'mailto:hello@admaki.com',
    note: 'Inquiries & Proposals',
  },
  {
    label: 'TELEGRAM',
    value: '@admaki_studio', // [Placeholder: Replace with Telegram handle or link]
    href: 'https://t.me/admaki_studio',
    note: 'Instant Chat & Bot Demos',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/admaki', // [Placeholder: Replace with LinkedIn profile]
    href: 'https://linkedin.com/in/admaki',
    note: 'Professional Network',
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-black text-white py-24 sm:py-36 border-t border-white/[0.06] overflow-hidden"
      aria-label="Start a Project - Contact ADMAKI"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Headline, Supporting Copy, and Status */}
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

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
              Have a website, social media, software, ERP, or automation project in mind? Tell me what
              you are trying to solve.
            </p>

            {/* Availability Indicator */}
            <div className="pt-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Available for Selected Client Engagements
              </span>
            </div>
          </div>

          {/* Right Column: Direct Action & Clean Contact Channels */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:pt-4">
            {/* Primary Action Card */}
            <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 sm:p-10 space-y-8 backdrop-blur-xl shadow-2xl">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
                  DIRECT ACCESS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Initiate a conversation
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light">
                  Direct response typically within 24 business hours.
                </p>
              </div>

              {/* Primary CTA Button */}
              <div>
                <Button
                  asLink
                  href="mailto:hello@admaki.com"
                  variant="primary"
                  size="lg"
                  className="w-full justify-between shadow-[0_0_30px_rgba(255,255,255,0.2)] text-sm font-semibold"
                >
                  <span>Start a Conversation</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Button>
              </div>

              {/* Clean Contact Methods List */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
                  Communication Channels
                </span>

                <div className="space-y-3">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200"
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                          {method.label}
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-zinc-200 group-hover:text-cyan-300 transition-colors">
                          {method.value}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 hidden sm:inline">
                          {method.note}
                        </span>
                        <span className="text-zinc-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
