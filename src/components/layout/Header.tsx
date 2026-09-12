'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [activeSection, setActiveSection] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 48);
      const scrollPos = window.scrollY + 220;

      for (const sectionId of ['work', 'services', 'about', 'contact']) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(sectionId);
          return;
        }
      }

      if (window.scrollY < 450) setActiveSection('');
    };

    onScroll();
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

  const navOpacity = Math.max(0.45, 1 - (scrollProgress > 0.3 ? (scrollProgress - 0.3) * 1.5 : 0));

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:shadow-2xl"
      >
        Skip to main content →
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4"
        style={{ opacity: navOpacity }}
      >
        <div
          className={`max-w-[1480px] mx-auto px-4 sm:px-5 lg:px-6 flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? 'min-h-[58px] rounded-2xl border border-white/12 bg-[#07090b]/88 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.24)]'
              : 'min-h-[64px] border border-transparent bg-transparent'
          }`}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label="ADMAKI Home"
          >
            <span className="h-2 w-2 rounded-full bg-[#69dceb] shadow-[0_0_10px_rgba(105,220,235,0.65)]" />
            <span className="font-black text-base sm:text-lg tracking-[0.18em] uppercase text-white">
              ADMAKI
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9 text-[11px] uppercase tracking-[0.18em] font-mono"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative py-2 transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-[#69dceb]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center">
            <Button asLink href="#contact" variant="secondary" size="sm" className="bg-black/10">
              Start a Project
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            className="md:hidden flex flex-col items-center justify-center min-w-[44px] min-h-[44px] gap-1.5 text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`block w-5 h-px bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile Navigation"
            className="md:hidden max-w-[1480px] mx-auto mt-2 rounded-2xl border border-white/12 bg-[#07090b]/96 backdrop-blur-2xl p-5 shadow-2xl"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[48px] flex items-center justify-between border-b border-white/10 text-sm text-zinc-200 hover:text-white transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-zinc-600">↗</span>
                </a>
              ))}
            </div>
            <Button
              asLink
              href="#contact"
              variant="primary"
              size="md"
              className="w-full mt-5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start a Project
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
