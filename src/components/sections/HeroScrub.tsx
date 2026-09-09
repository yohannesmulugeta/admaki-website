'use client';

import React, {
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react';
import Image from 'next/image';

interface HeroScrubProps {
  imageSrc?: string;
  videoSrc?: string;
}

// SSR-safe subscription for prefers-reduced-motion
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function HeroScrub({
  imageSrc = '/images/hero/hero-main.webp',
  videoSrc = '/videos/hero-transition.mp4',
}: HeroScrubProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // High-performance scrub tracking refs (avoids React re-render overhead on 60/120Hz scroll)
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const videoDurationRef = useRef<number>(0);

  // Initialize and prime video metadata
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.duration && !Number.isNaN(video.duration)) {
      videoDurationRef.current = video.duration;

      // Prime video decoder to the first frame
      try {
        video.currentTime = 0.001;
      } catch {
        // Fallback for strict browser media policies
      }
    }
  }, []);

  // Update target progress from window scroll
  const updateScrollProgress = useCallback(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = container.offsetHeight - windowHeight;

    if (totalScrollable <= 0) return;

    // Progress from 0 (top) to 1 (when scrub section ends)
    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
    targetProgressRef.current = progress;
  }, [prefersReducedMotion]);

  // Main animation / render loop running on requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      // Smooth lerp (factor 0.20 provides instantaneous response without stutter)
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.20;
      } else {
        currentProgressRef.current = target;
      }

      const p = currentProgressRef.current;

      // 1. Video scrub synchronization
      const video = videoRef.current;
      const duration = videoDurationRef.current;

      if (video && duration > 0 && video.readyState >= 2 && !isSeekingRef.current) {
        const targetTime = p * duration;
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          isSeekingRef.current = true;
          video.currentTime = Math.min(Math.max(targetTime, 0), duration);
        }
      }

      // 2. Seamless image fade:
      // Image remains 100% visible initially. In the first 6% of scroll (0 to 0.06),
      // it seamlessly blends into the video. First frame visually matches the image.
      if (imageOverlayRef.current) {
        const imgOpacity = p <= 0 ? 1 : Math.max(0, 1 - p * 16);
        imageOverlayRef.current.style.opacity = String(imgOpacity);
        imageOverlayRef.current.style.visibility = imgOpacity <= 0 ? 'hidden' : 'visible';
      }

      // 3. Hero content fade and drift
      if (contentRef.current) {
        const textOpacity = Math.max(0, 1 - p * 4.5);
        const translateY = p * -45;
        contentRef.current.style.opacity = String(textOpacity);
        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        contentRef.current.style.visibility = textOpacity <= 0 ? 'hidden' : 'visible';
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Video seek completed listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener('seeked', onSeeked);
    return () => {
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  // Passive scroll and resize listeners
  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    // Initial positioning
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        prefersReducedMotion ? 'h-screen min-h-[100dvh]' : 'h-[350vh]'
      }`}
      aria-label="ADMAKI Hero"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden bg-black">
        {/* Background Video */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onLoadedMetadata={handleLoadedMetadata}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none will-change-transform"
            aria-hidden="true"
          />
        )}

        {/* Hero Poster / Starting Image Layer */}
        <div
          ref={imageOverlayRef}
          className="absolute inset-0 h-full w-full pointer-events-none select-none will-change-opacity transition-opacity duration-75"
          style={{ opacity: 1 }}
        >
          <Image
            src={imageSrc}
            alt="ADMAKI Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Subtle cinematic gradient vignette for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/50"
          aria-hidden="true"
        />

        {/* Foreground Content */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 py-12 text-center text-white select-none will-change-transform"
          style={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Top Badge */}
          <div className="pt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Digital Studio
            </span>
          </div>

          {/* Center Title & Tagline */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
              ADMAKI
            </h1>
            <p className="text-lg font-light tracking-wide text-zinc-300 sm:text-2xl md:text-3xl">
              Digital Experiences
            </p>
          </div>

          {/* Bottom Scroll Indicator */}
          {!prefersReducedMotion ? (
            <div className="flex flex-col items-center gap-2 pb-6 text-xs uppercase tracking-widest text-zinc-400">
              <span>Scroll to explore</span>
              <div className="relative h-10 w-5 rounded-full border border-white/30 p-1">
                <div className="h-2 w-1.5 rounded-full bg-white animate-bounce mx-auto" />
              </div>
            </div>
          ) : (
            <div className="pb-6" />
          )}
        </div>
      </div>
    </section>
  );
}
