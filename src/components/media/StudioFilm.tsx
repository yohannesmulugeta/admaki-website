'use client';

import { useEffect, useRef } from 'react';
import { withBasePath } from '@/lib/siteConfig';

const film = withBasePath('/videos/admaki-studio.mp4');
const poster = withBasePath('/images/admaki-studio.webp');

export default function StudioFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motion.matches) loadFilm();
    }, { rootMargin: '240px 0px' });
    const playback = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
        video.pause();
      } else if (!motion.matches) {
        loadFilm();
        video.muted = true;
        void video.play().catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === 'AbortError')) showPoster();
        });
      }
    }, { threshold: 0.5 });

    const loadFilm = () => {
      if (!video.hasAttribute('src')) video.src = film;
      preload.disconnect();
    };

    const showPoster = () => {
      preload.disconnect();
      playback.disconnect();
      video.pause();
      if (video.hasAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
    };

    const syncMotionPreference = () => {
      if (motion.matches) {
        showPoster();
      } else {
        preload.observe(video);
        playback.observe(video);
      }
    };

    syncMotionPreference();
    motion.addEventListener('change', syncMotionPreference);
    video.addEventListener('error', showPoster);

    return () => {
      preload.disconnect();
      playback.disconnect();
      video.pause();
      motion.removeEventListener('change', syncMotionPreference);
      video.removeEventListener('error', showPoster);
    };
  }, []);

  return (
    <video ref={videoRef} className="ed-studio-film" poster={poster}
      width={960} height={540} preload="auto" muted playsInline loop disablePictureInPicture aria-hidden="true" />
  );
}
