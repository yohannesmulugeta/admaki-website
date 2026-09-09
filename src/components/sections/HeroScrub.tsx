'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from 'react';
import Image from 'next/image';
import HeroContent from './HeroContent';

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
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
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
      // Keep visible until video is ready. Once ready, smoothly fade away during first 3-5% of scroll.
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

      // 5. Hero content editorial transition:
      // 0%–5%: hero remains almost unchanged
      // 5%–18%: headline, description and buttons smoothly fade and move slightly upward
      // Around 20%: hero foreground content is completely gone
      if (contentRef.current) {
        let contentOpacity = 1;
        let translateY = 0;
        let scale = 1;

        if (nextProgress <= 0.05) {
          contentOpacity = 1;
          translateY = 0;
          scale = 1;
        } else if (nextProgress < 0.20) {
          const t = (nextProgress - 0.05) / (0.20 - 0.05); // 0.0 at 5%, 1.0 at 20%
          contentOpacity = Math.max(0, 1 - t);
          translateY = -t * 28; // moves slightly upward by 28px
          scale = 1 - t * 0.015; // very subtle scale (1.0 -> 0.985)
        } else {
          contentOpacity = 0;
          translateY = -30;
          scale = 0.98;
        }

        contentRef.current.style.opacity = String(contentOpacity);
        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        contentRef.current.style.visibility = contentOpacity <= 0 ? 'hidden' : 'visible';
        contentRef.current.style.pointerEvents = contentOpacity <= 0.1 ? 'none' : 'auto';
      }

      // 6. Subtle gradient overlay transition (softens so video transition is 100% visible)
      if (gradientOverlayRef.current) {
        const gradOpacity = nextProgress <= 0.05 ? 1 : Math.max(0.25, 1 - (nextProgress - 0.05) * 3);
        gradientOverlayRef.current.style.opacity = String(gradOpacity);
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

    // Initial calculation
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

        {/* Layer 3: Cinematic Vignette (z-20) */}
        <div
          ref={gradientOverlayRef}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/85 via-black/30 to-black/50 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Layer 4: Final Asymmetric Editorial Hero Interface (z-30) */}
        <HeroContent ref={contentRef} />
      </div>
    </section>
  );
}
