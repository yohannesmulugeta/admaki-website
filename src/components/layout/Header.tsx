'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface HeaderProps {
  scrollProgress?: number;
}

export default function Header({ scrollProgress = 0 }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fade navigation subtly as video scrub reaches high intensity (e.g. after 35%),
  // or keep it minimal and crisp.
  const navOpacity = Math.max(0.2, 1 - (scrollProgress > 0.25 ? (scrollProgress - 0.25) * 2 : 0));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-black/40 backdrop-blur-xl border-b border-white/[0.08]'
          : 'py-5 sm:py-7 bg-transparent'
      }`}
      style={{ opacity: navOpacity }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo / Left */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-white tracking-tighter"
          aria-label="ADMAKI Home"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] transition-transform duration-300 group-hover:scale-125" />
          <span className="font-extrabold text-lg sm:text-xl tracking-[0.2em] uppercase font-sans">
            ADMAKI
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
          <a
            href="#work"
            className="hover:text-white transition-colors duration-200"
          >
            Work
          </a>
          <a
            href="#services"
            className="hover:text-white transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
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
        <div className="md:hidden fixed inset-x-0 top-full bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 text-sm uppercase tracking-[0.25em] text-zinc-300">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            Work
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            Services
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            Contact
          </a>
          <div className="pt-2">
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
  );
}
