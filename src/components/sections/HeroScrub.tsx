'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from 'react';
import Image from 'next/image';

interface HeroScrubProps {
  imageSrc?: string;
  videoSrc?: string;
}

type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: (now: DOMHighResTimeStamp, metadata: unknown) => void) => number;
  cancelVideoFrameCallback?: (id: number) => void;
};

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
  videoSrc = '/videos/hero-transition-scrub.mp4',
}: HeroScrubProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [, setForceReadyState] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Pure ref-based state during scroll (zero React re-renders while scrolling)
  const targetProgressRef = useRef<number>(0);
  const smoothProgressRef = useRef<number>(0);
  const videoDurationRef = useRef<number>(0);
  const isVideoReadyRef = useRef<boolean>(false);

  // Mark video as ready and ensure strictly paused state
  const handleReady = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    if (video.duration && !Number.isNaN(video.duration)) {
      videoDurationRef.current = video.duration;
    }

    isVideoReadyRef.current = true;
    setForceReadyState(true);
  }, []);

  // When metadata loads: save duration, set currentTime = 0, pause()
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    if (video.duration && !Number.isNaN(video.duration)) {
      videoDurationRef.current = video.duration;
    }

    isVideoReadyRef.current = true;
    setForceReadyState(true);
  }, []);

  // Raw scroll position tracker (updates targetProgressRef only, no setState)
  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = container.offsetHeight - windowHeight;

    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const rawProgress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
    targetProgressRef.current = rawProgress;
  }, [prefersReducedMotion]);

  // Main animation / render loop running on requestAnimationFrame with smooth interpolation
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    let isRunning = true;

    // Optional requestVideoFrameCallback listener for synchronization
    const video = videoRef.current as VideoWithRVFC | null;
    let rvfcId: number | null = null;
    const hasRVFC = Boolean(video && typeof video.requestVideoFrameCallback === 'function');

    const onVideoFrame = () => {
      if (!isRunning) return;
      if (video && hasRVFC && video.requestVideoFrameCallback) {
        rvfcId = video.requestVideoFrameCallback(onVideoFrame);
      }
    };

    if (video && hasRVFC && video.requestVideoFrameCallback) {
      rvfcId = video.requestVideoFrameCallback(onVideoFrame);
    }

    const tick = () => {
      if (!isRunning) return;

      const videoEl = videoRef.current;
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;

      // 1. Smooth interpolation: smoothProgress += (targetProgress - smoothProgress) * 0.08
      const nextProgress = current + (target - current) * 0.08;
      smoothProgressRef.current = nextProgress;

      // 2. Softer beginning (0%–5%) and ending (95%–100%):
      const normalized =
        nextProgress < 0.05
          ? 0
          : nextProgress > 0.95
            ? 1
            : (nextProgress - 0.05) / 0.90;

      // 3. Direct video seek when difference is meaningful (> 0.015s)
      const duration = videoDurationRef.current || (videoEl ? videoEl.duration : 0);
      if (videoEl && duration > 0) {
        const targetTime = normalized * duration;

        if (Math.abs(videoEl.currentTime - targetTime) > 0.015) {
          videoEl.currentTime = targetTime;
        }
      }

      // 4. Poster image fade:
      // Keep visible until video is ready. Once ready, smoothly fade away during the first 3-5% of scroll.
      if (imageOverlayRef.current) {
        if (!isVideoReadyRef.current) {
          imageOverlayRef.current.style.opacity = '1';
          imageOverlayRef.current.style.visibility = 'visible';
        } else {
          const imgOpacity = nextProgress <= 0 ? 1 : Math.max(0, 1 - nextProgress / 0.04);
          imageOverlayRef.current.style.opacity = String(imgOpacity);
          imageOverlayRef.current.style.visibility = imgOpacity <= 0 ? 'hidden' : 'visible';
        }
      }

      // 5. Hero content drift and fade (z-30)
      if (contentRef.current) {
        const textOpacity = Math.max(0, 1 - nextProgress * 4.5);
        const translateY = nextProgress * -45;
        contentRef.current.style.opacity = String(textOpacity);
        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        contentRef.current.style.visibility = textOpacity <= 0 ? 'hidden' : 'visible';
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      if (video && hasRVFC && rvfcId !== null && video.cancelVideoFrameCallback) {
        video.cancelVideoFrameCallback(rvfcId);
      }
    };
  }, [prefersReducedMotion]);

  // Passive scroll and resize listeners
  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial positioning
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        prefersReducedMotion ? 'h-screen min-h-[100dvh]' : 'h-[450vh]'
      }`}
      aria-label="ADMAKI Hero"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden bg-black">
        {/* Layer 1: Background Video (z-0) */}
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
            onCanPlay={handleReady}
            onLoadedData={handleReady}
            onPlay={(e) => (e.currentTarget as HTMLVideoElement).pause()}
            className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none select-none will-change-transform"
            aria-hidden="true"
          />
        )}

        {/* Layer 2: Hero Poster Image (z-10 initially, then fades to 0) */}
        <div
          ref={imageOverlayRef}
          className="absolute inset-0 z-10 h-full w-full pointer-events-none select-none will-change-opacity transition-opacity duration-75"
          style={{ opacity: 1 }}
        >
          <Image
            src={imageSrc}
            alt="ADMAKI Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Layer 3: Cinematic Gradient Vignette (z-20) */}
        <div
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/50"
          aria-hidden="true"
        />

        {/* Layer 4: Foreground Hero Content (z-30) */}
        <div
          ref={contentRef}
          className="relative z-30 flex h-full w-full flex-col items-center justify-between px-6 py-12 text-center text-white select-none will-change-transform"
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
