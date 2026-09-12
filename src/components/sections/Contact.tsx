'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

// Central contact data object - placeholder details clearly marked
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

const serviceOptions = [
  'Website Design & Dev',
  'Custom Software / ERP',
  'Telegram Bot & Automation',
  'Social Media System',
];

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>(serviceOptions[0]);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const copyToClipboard = async (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, contact handle, and brief description.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Provide immediate client-side feedback and prepare mailto link
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      const subject = encodeURIComponent(`Project Inquiry: ${selectedService} — ${name}`);
      const body = encodeURIComponent(
        `Hi ADMAKI,\n\nName: ${name}\nContact: ${contactInfo}\nService: ${selectedService}\n\nProject Scope:\n${message}\n`
      );
      
      // Also open user's default email client if available
      window.location.href = `mailto:${contactData.email.value}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black text-white py-24 sm:py-36 border-t border-white/[0.08] overflow-hidden"
      aria-label="Start a Project - Contact ADMAKI"
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-cyan-400" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold">
              START A PROJECT
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.94]">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              SOMETHING USEFUL.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            Have a website, social media, software, ERP, or automation project in mind? Tell me what
            you are trying to solve.
          </p>
        </div>

        {/* Interactive Layout: Project Brief Form + Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Interactive Quick Brief Form */}
          <div className="lg:col-span-7 bg-zinc-950/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold block">
                  FAST INQUIRY
                </span>
                <span className="text-xs text-zinc-400 font-light">
                  Send details directly or start an email conversation
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] text-zinc-300">
                ACTIVE
              </span>
            </div>

            {submitSuccess ? (
              <div className="py-12 text-center flex flex-col items-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-mono">
                  ✓
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Message Dispatched
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm font-light">
                  Your inquiry draft has been prepared. If your email client did not launch automatically, feel free to reach out directly via Telegram or Email.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(false);
                    setName('');
                    setContactInfo('');
                    setMessage('');
                  }}
                  className="mt-4 px-5 py-2 rounded-full border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/40 transition-all"
                >
                  Send Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Service Selector Chips */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    Select Focus Area
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => {
                      const isSelected = selectedService === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedService(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                            isSelected
                              ? 'bg-cyan-500/10 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                              : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="brief-name"
                      className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5"
                    >
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brief-contact"
                      className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5"
                    >
                      Email or Telegram <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="brief-contact"
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="name@company.com or @handle"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="brief-message"
                    className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5"
                  >
                    What are you looking to build? <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="brief-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your objectives, requirements, or problem to solve..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-xs font-mono text-rose-300"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  >
                    {isSubmitting ? (
                      <span>Preparing Transmission...</span>
                    ) : (
                      <>
                        <span>Start Conversation</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Side: Direct Contact Channels with Copy Actions */}
          <div className="lg:col-span-5 flex flex-col space-y-4 w-full">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-1">
              Direct Communication Channels
            </span>

            {/* Email Channel */}
            <div className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-cyan-400/40 transition-all duration-300 gap-3">
              <div className="flex items-start justify-between">
                <a
                  href={contactData.email.href}
                  className="flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
                  aria-label={`Send Email to ${contactData.email.value}`}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    {contactData.email.label}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {contactData.email.value}
                  </span>
                  <span className="text-xs text-zinc-400 font-light mt-0.5">
                    {contactData.email.description}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={(e) => copyToClipboard(contactData.email.value, 'email', e)}
                  className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-[10px] font-mono text-zinc-400 hover:text-white hover:border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Copy email address"
                >
                  {copiedKey === 'email' ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Telegram Channel */}
            <div className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-cyan-400/40 transition-all duration-300 gap-3">
              <div className="flex items-start justify-between">
                <a
                  href={contactData.telegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
                  aria-label={`Open Telegram ${contactData.telegram.value}`}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    {contactData.telegram.label}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {contactData.telegram.value}
                  </span>
                  <span className="text-xs text-zinc-400 font-light mt-0.5">
                    {contactData.telegram.description}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={(e) => copyToClipboard(contactData.telegram.value, 'telegram', e)}
                  className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-[10px] font-mono text-zinc-400 hover:text-white hover:border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Copy Telegram handle"
                >
                  {copiedKey === 'telegram' ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>
            </div>

            {/* LinkedIn Channel */}
            <div className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-cyan-400/40 transition-all duration-300 gap-3">
              <div className="flex items-start justify-between">
                <a
                  href={contactData.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
                  aria-label={`Visit LinkedIn profile ${contactData.linkedin.value}`}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    {contactData.linkedin.label}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {contactData.linkedin.value}
                  </span>
                  <span className="text-xs text-zinc-400 font-light mt-0.5">
                    {contactData.linkedin.description}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={(e) => copyToClipboard(contactData.linkedin.value, 'linkedin', e)}
                  className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-[10px] font-mono text-zinc-400 hover:text-white hover:border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Copy LinkedIn URL"
                >
                  {copiedKey === 'linkedin' ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
