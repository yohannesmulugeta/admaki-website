'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface HeaderProps {
  scrollProgress?: number;
}

const navItems = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Header({ scrollProgress = 0 }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection based on viewport position
      const sections = ['work', 'services', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      if (window.scrollY < 400) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Fade navigation subtly as video scrub reaches high intensity (e.g. after 35%),
  // or keep it minimal and crisp.
  const navOpacity = Math.max(0.2, 1 - (scrollProgress > 0.25 ? (scrollProgress - 0.25) * 2 : 0));

  return (
    <>
      {/* Skip to Main Content Link (WCAG 2.2 / UI/UX Pro Max Rule 45) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:shadow-2xl focus:ring-2 focus:ring-cyan-400 focus:outline-none"
      >
        Skip to main content →
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#08111c]/95 backdrop-blur-xl border-b border-white/[0.1] shadow-[0_8px_30px_rgba(8,17,28,0.12)]'
            : 'py-5 sm:py-7 bg-transparent'
        }`}
        style={{ opacity: navOpacity }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo / Left */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-white tracking-tighter focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 -m-1"
            aria-label="ADMAKI Home"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] transition-transform duration-300 group-hover:scale-125" />
            <span className="font-extrabold text-lg sm:text-xl tracking-[0.2em] uppercase font-sans">
              ADMAKI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header CTA / Right */}
          <div className="hidden sm:flex items-center">
            <Button
              asLink
              href="#contact"
              variant="secondary"
              size="sm"
              className="border-white/20 text-white hover:border-white/40 tracking-wider"
            >
              Let&apos;s Build
            </Button>
          </div>

          {/* Mobile Menu Button with 44x44px minimum touch target */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            className="md:hidden flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 gap-1.5 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg -mr-2"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile Navigation"
            className="md:hidden fixed inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto bg-[#050608]/98 backdrop-blur-2xl border-b border-white/12 px-6 py-8 flex flex-col gap-5 text-sm uppercase tracking-[0.2em] text-zinc-200 shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 min-h-[44px] flex items-center hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Button
                asLink
                href="#contact"
                variant="primary"
                size="md"
                className="w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let&apos;s Build
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
