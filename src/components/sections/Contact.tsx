'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

// Verify these business contact details before production launch.
export const contactData = {
  email: {
    label: 'Email',
    value: 'hello@admaki.com',
    href: 'mailto:hello@admaki.com',
    description: 'Project inquiries and new work',
  },
  telegram: {
    label: 'Telegram',
    value: '@admaki_studio',
    href: 'https://t.me/admaki_studio',
    description: 'Direct message and automation demos',
  },
  linkedin: {
    label: 'LinkedIn',
    value: 'linkedin.com/in/admaki',
    href: 'https://linkedin.com/in/admaki',
    description: 'Professional network',
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
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !contactInfo.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, contact handle, and project brief.');
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

    window.location.href = `mailto:${contactData.email.value}?subject=${subject}&body=${body}`;
    setSubmitSuccess(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#f0ede5] text-[#111315] py-24 sm:py-32 border-t border-black/10"
      aria-label="Start a Project - Contact ADMAKI"
    >
      <div className="absolute inset-0 studio-grid-light opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-black/18 pt-6 sm:pt-8">
          <div className="lg:col-span-4">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] uppercase text-[#0f8195]">
              05 / START A PROJECT
            </span>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-[clamp(3rem,7.5vw,7rem)] font-semibold tracking-[-0.065em] leading-[0.87] max-w-5xl">
              Tell me what you&apos;re trying to solve.
            </h2>
            <p className="mt-7 max-w-2xl text-sm sm:text-base text-black/55 leading-relaxed">
              Website, social media, ERP, automation or something between them — start with the problem and the goal.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8 border-t border-black/18 pt-6">
            {submitSuccess ? (
              <div className="min-h-[28rem] flex flex-col justify-between border-b border-black/18 pb-8">
                <div>
                  <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#0f8195]">
                    Email draft prepared
                  </span>
                  <h3 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-[-0.045em] leading-tight max-w-2xl">
                    Your mail app should now have the project brief ready to review.
                  </h3>
                  <p className="mt-5 max-w-xl text-sm sm:text-base text-black/55 leading-relaxed">
                    Nothing has been sent automatically. Review the draft and press Send from your mail app.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(false);
                    setName('');
                    setContactInfo('');
                    setMessage('');
                  }}
                  className="mt-10 w-fit text-xs font-mono uppercase tracking-[0.18em] border-b border-black/35 pb-1 hover:border-[#0f8195] hover:text-[#0f8195] transition-colors"
                >
                  Prepare another brief ↗
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="pb-8 border-b border-black/14">
                  <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-black/45 mb-4">
                    What do you need?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {serviceOptions.map((option, index) => {
                      const selected = selectedService === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedService(option)}
                          aria-pressed={selected}
                          className={`min-h-[48px] px-4 py-3 text-left border transition-colors flex items-center gap-3 ${
                            selected
                              ? 'border-[#0f8195] bg-[#0f8195]/[0.06] text-[#111315]'
                              : 'border-black/14 bg-transparent text-black/55 hover:border-black/28 hover:text-[#111315]'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-black/35">0{index + 1}</span>
                          <span className="text-sm">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8 border-b border-black/14">
                  <div>
                    <label htmlFor="brief-name" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-black/45 mb-3">
                      Your name
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent border-0 border-b border-black/22 px-0 py-3 text-base text-[#111315] placeholder:text-black/28 focus:outline-none focus:border-[#0f8195] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="brief-contact" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-black/45 mb-3">
                      Email or Telegram
                    </label>
                    <input
                      id="brief-contact"
                      type="text"
                      autoComplete="email"
                      required
                      value={contactInfo}
                      onChange={(event) => setContactInfo(event.target.value)}
                      placeholder="name@company.com or @handle"
                      className="w-full bg-transparent border-0 border-b border-black/22 px-0 py-3 text-base text-[#111315] placeholder:text-black/28 focus:outline-none focus:border-[#0f8195] transition-colors"
                    />
                  </div>
                </div>

                <div className="py-8 border-b border-black/14">
                  <label htmlFor="brief-message" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-black/45 mb-3">
                    Project brief
                  </label>
                  <textarea
                    id="brief-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="What are you trying to build, improve or automate?"
                    className="w-full resize-none bg-transparent border border-black/16 p-4 text-sm sm:text-base text-[#111315] placeholder:text-black/28 focus:outline-none focus:border-[#0f8195] transition-colors"
                  />
                </div>

                {errorMessage && (
                  <div role="alert" className="mt-5 border-l-2 border-red-700 pl-4 text-sm text-red-800">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <p className="text-xs text-black/42 max-w-md leading-relaxed">
                    This prepares an email draft on your device. It does not submit data to a server.
                  </p>
                  <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
                    Prepare Project Email ↗
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-4 border-t border-black/18 pt-6">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-black/45">
              Direct channels
            </span>

            <div className="mt-5 border-t border-black/14">
              {Object.values(contactData).map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group block py-5 border-b border-black/14"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#0f8195]">0{index + 1}</span>
                        <span className="text-xs font-mono uppercase tracking-[0.16em] text-black/45">
                          {item.label}
                        </span>
                      </div>
                      <div className="mt-3 text-sm sm:text-base font-medium text-[#111315] break-all">
                        {item.value}
                      </div>
                      <div className="mt-1 text-xs text-black/42">{item.description}</div>
                    </div>
                    <span className="text-black/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs text-black/42 leading-relaxed">
              For larger projects, include the business goal, current problem, preferred timeline and any existing materials.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
