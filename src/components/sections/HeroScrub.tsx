'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import HeroContent from './HeroContent';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroScrubProps {
  imageSrc?: string;
  videoSrc?: string;
}

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export default function HeroScrub({
  imageSrc = '/images/hero/hero-main.webp',
  videoSrc = '/videos/hero-transition-scrub.mp4',
}: HeroScrubProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const effectiveVideoSrc =
    videoSrc.startsWith('/') && basePath ? `${basePath}${videoSrc}` : videoSrc;

  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isInViewport, setIsInViewport] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const desiredVideoTimeRef = useRef(0);
  const videoDurationRef = useRef(0);
  const isVideoReadyRef = useRef(false);
  const isSeekingRef = useRef(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.matchMedia('(max-width: 767px)').matches;

    const handleBreakpointChange = () => {
      isMobileRef.current = window.matchMedia('(max-width: 767px)').matches;
    };

    window.addEventListener('resize', handleBreakpointChange, { passive: true });
    return () => window.removeEventListener('resize', handleBreakpointChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: '160px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    if (video.duration && Number.isFinite(video.duration)) {
      videoDurationRef.current = video.duration;
    }
  }, []);

  const handleReady = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    if (video.duration && Number.isFinite(video.duration)) {
      videoDurationRef.current = video.duration;
    }

    isVideoReadyRef.current = true;
  }, []);

  const requestNextSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isVideoReadyRef.current || isSeekingRef.current) return;

    const threshold = isMobileRef.current ? 0.075 : 0.035;
    const desiredTime = desiredVideoTimeRef.current;

    if (Math.abs(video.currentTime - desiredTime) <= threshold) return;

    isSeekingRef.current = true;
    video.currentTime = desiredTime;
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    requestNextSeek();
  }, [requestNextSeek]);

  const handleScroll = useCallback(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const totalScrollable = container.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    targetProgressRef.current = clamp01(-rect.top / totalScrollable);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !isInViewport) return;

    let rafId = 0;
    let running = true;

    const tick = () => {
      if (!running) return;

      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const ease = isMobileRef.current ? 0.22 : 0.16;
      let nextProgress = current + (target - current) * ease;

      if (Math.abs(target - nextProgress) < 0.0005) {
        nextProgress = target;
      }

      smoothProgressRef.current = nextProgress;

      const videoProgress = clamp01((nextProgress - 0.025) / 0.95);
      const duration = videoDurationRef.current;

      if (duration > 0) {
        desiredVideoTimeRef.current = videoProgress * duration;
        requestNextSeek();
      }

      if (imageOverlayRef.current) {
        if (!isVideoReadyRef.current) {
          imageOverlayRef.current.style.opacity = '1';
          imageOverlayRef.current.style.visibility = 'visible';
        } else {
          const imageOpacity = clamp01(1 - nextProgress / 0.075);
          imageOverlayRef.current.style.opacity = String(imageOpacity);
          imageOverlayRef.current.style.visibility = imageOpacity < 0.01 ? 'hidden' : 'visible';
        }
      }

      if (contentRef.current) {
        const fadeStart = 0.07;
        const fadeEnd = 0.27;
        const fadeProgress = clamp01((nextProgress - fadeStart) / (fadeEnd - fadeStart));
        const contentOpacity = 1 - fadeProgress;
        const translateY = -fadeProgress * 22;
        const scale = 1 - fadeProgress * 0.012;

        contentRef.current.style.opacity = String(contentOpacity);
        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        contentRef.current.style.visibility = contentOpacity < 0.01 ? 'hidden' : 'visible';
        contentRef.current.style.pointerEvents = contentOpacity < 0.08 ? 'none' : 'auto';
      }

      if (gradientOverlayRef.current) {
        const gradientOpacity = Math.max(0.34, 1 - nextProgress * 1.45);
        gradientOverlayRef.current.style.opacity = String(gradientOpacity);
      }

      rafId = requestAnimationFrame(tick);
    };

    handleScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll, isInViewport, prefersReducedMotion, requestNextSeek]);

  useEffect(() => {
    if (prefersReducedMotion || !isInViewport) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll, isInViewport, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        prefersReducedMotion ? 'h-screen min-h-[100dvh]' : 'h-[175vh] sm:h-[195vh] lg:h-[205vh]'
      }`}
      aria-label="ADMAKI Hero"
    >
      <div className="sticky top-0 h-screen min-h-[100dvh] w-full overflow-hidden bg-black">
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            src={effectiveVideoSrc}
            playsInline
            muted
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleReady}
            onLoadedData={handleReady}
            onSeeked={handleSeeked}
            onPlay={(event) => event.currentTarget.pause()}
            className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none select-none [transform:translateZ(0)] [backface-visibility:hidden]"
            aria-hidden="true"
          />
        )}

        <div
          ref={imageOverlayRef}
          className="absolute inset-0 z-10 h-full w-full pointer-events-none select-none will-change-opacity"
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

        <div
          ref={gradientOverlayRef}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/85 via-black/30 to-black/50 will-change-opacity"
          aria-hidden="true"
        />

        <HeroContent ref={contentRef} />
      </div>
    </section>
  );
}
