'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

// Verify these business contact details before production launch.
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_PATTERN = /^@[a-zA-Z0-9_]{5,32}$/;

function isValidContact(value: string) {
  const contact = value.trim();
  return EMAIL_PATTERN.test(contact) || TELEGRAM_PATTERN.test(contact);
}

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>(serviceOptions[0]);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
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

    if (!isValidContact(contactInfo)) {
      setErrorMessage('Enter a valid email address or Telegram handle such as @username.');
      return;
    }

    setErrorMessage('');
    const subject = encodeURIComponent(`Project Inquiry: ${selectedService} — ${name}`);
    const body = encodeURIComponent(
      `Hi ADMAKI,\n\nName: ${name}\nContact: ${contactInfo}\nService: ${selectedService}\n\nProject Scope:\n${message}\n`
    );

    // Prepare a local email draft. This does not claim that a message was sent.
    window.location.href = `mailto:${contactData.email.value}?subject=${subject}&body=${body}`;
    setSubmitSuccess(true);
  };

  return (
    <section
      id="contact"
      className="section-light-muted relative w-full text-slate-950 py-20 sm:py-28 border-t border-slate-300 overflow-hidden"
      aria-label="Start a Project - Contact ADMAKI"
    >
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/[0.06] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-cyan-700" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-700 font-semibold">
              START A PROJECT
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-slate-950 leading-[0.94]">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500">
              SOMETHING USEFUL.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-light leading-relaxed">
            Have a website, social media, software, ERP, or automation project in mind? Tell me what
            you are trying to solve.
          </p>
        </div>

        {/* Interactive Layout: Project Brief Form + Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Interactive Quick Brief Form */}
          <div className="lg:col-span-7 bg-white/90 border border-slate-200 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_55px_rgba(15,23,42,0.1)]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-700 font-semibold block">
                  FAST INQUIRY
                </span>
                <span className="text-xs text-slate-500 font-light">
                  Prepare a pre-filled email draft with your project details
                </span>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-cyan-700/25 bg-cyan-700/[0.07] text-cyan-800">
                EMAIL DRAFT
              </span>
            </div>

            {submitSuccess ? (
              <div className="py-12 text-center flex flex-col items-center space-y-4" aria-live="polite">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 text-xl font-mono">
                  ✓
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-950">
                  Email Draft Prepared
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm font-light">
                  Nothing has been sent yet. Review the prepared email in your mail app, then press Send. If it did not open, use one of the direct contact options.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(false);
                    setName('');
                    setContactInfo('');
                    setMessage('');
                  }}
                  className="mt-4 px-5 py-2 rounded-full border border-slate-300 text-xs font-mono text-slate-700 hover:text-cyan-800 hover:border-cyan-700/40 transition-all"
                >
                  Send Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Service Selector Chips */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
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
                          aria-pressed={isSelected}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                            isSelected
                              ? 'bg-cyan-700/10 border-cyan-700/45 text-cyan-800 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300'
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
                      className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-1.5"
                    >
                      Your Name <span className="text-cyan-700">*</span>
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brief-contact"
                      className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-1.5"
                    >
                      Email or Telegram <span className="text-cyan-700">*</span>
                    </label>
                    <input
                      id="brief-contact"
                      type="text"
                      required
                      autoComplete="email"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="name@company.com or @handle"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="brief-message"
                    className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-1.5"
                  >
                    What are you looking to build? <span className="text-cyan-700">*</span>
                  </label>
                  <textarea
                    id="brief-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your objectives, requirements, or problem to solve..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all resize-none"
                  />
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl border border-rose-300 bg-rose-50 text-xs font-mono text-rose-700"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="accent"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    <span>Prepare Email Draft</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Side: Direct Contact Channels with Copy Actions */}
          <div className="lg:col-span-5 flex flex-col space-y-4 w-full">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600 block mb-1">
              Direct Communication Channels
            </span>

            {/* Email Channel */}
            <div className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white/85 hover:bg-white hover:border-cyan-700/35 hover:shadow-md transition-all duration-300 gap-3">
              <div className="flex items-start justify-between">
                <a
                  href={contactData.email.href}
                  className="flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 rounded-lg"
                  aria-label={`Send Email to ${contactData.email.value}`}
                >
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {contactData.email.label}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-medium text-slate-950 group-hover:text-cyan-800 transition-colors">
                    {contactData.email.value}
                  </span>
                  <span className="text-xs text-slate-500 font-light mt-0.5">
                    {contactData.email.description}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={(e) => copyToClipboard(contactData.email.value, 'email', e)}
                  className="px-2.5 py-1 rounded-md border border-slate-300 bg-slate-50 text-xs font-mono text-slate-700 hover:text-cyan-800 hover:border-cyan-700/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                  aria-label="Copy email address"
                >
                  {copiedKey === 'email' ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Telegram Channel */}
            <div className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white/85 hover:bg-white hover:border-cyan-700/35 hover:shadow-md transition-all duration-300 gap-3">
              <div className="flex items-start justify-between">
                <a
                  href={contactData.telegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 rounded-lg"
                  aria-label={`Open Telegram ${contactData.telegram.value}`}
                >
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {contactData.telegram.label}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-medium text-slate-950 group-hover:text-cyan-800 transition-colors">
                    {contactData.telegram.value}
                  </span>
                  <span className="text-xs text-slate-500 font-light mt-0.5">
                    {contactData.telegram.description}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={(e) => copyToClipboard(contactData.telegram.value, 'telegram', e)}
                  className="px-2.5 py-1 rounded-md border border-slate-300 bg-slate-50 text-xs font-mono text-slate-700 hover:text-cyan-800 hover:border-cyan-700/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
                  aria-label="Copy Telegram handle"
                >
                  {copiedKey === 'telegram' ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>
            </div>

            {/* LinkedIn Channel */}
            <div className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white/85 hover:bg-white hover:border-cyan-700/35 hover:shadow-md transition-all duration-300 gap-3">
              <div className="flex items-start justify-between">
                <a
                  href={contactData.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 rounded-lg"
                  aria-label={`Visit LinkedIn profile ${contactData.linkedin.value}`}
                >
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {contactData.linkedin.label}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-medium text-slate-950 group-hover:text-cyan-800 transition-colors">
                    {contactData.linkedin.value}
                  </span>
                  <span className="text-xs text-slate-500 font-light mt-0.5">
                    {contactData.linkedin.description}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={(e) => copyToClipboard(contactData.linkedin.value, 'linkedin', e)}
                  className="px-2.5 py-1 rounded-md border border-slate-300 bg-slate-50 text-xs font-mono text-slate-700 hover:text-cyan-800 hover:border-cyan-700/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700"
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
