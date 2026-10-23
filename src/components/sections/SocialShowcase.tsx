'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { socialBrands, type SocialVideo } from '@/data/portfolio';

const PLAYER_ORIGIN = 'https://www.tiktok.com';
type EmbedStatus = 'idle' | 'loading' | 'ready' | 'error';
type TikTokPlayerEvent = {
  'x-tiktok-player'?: boolean;
  type?: string;
  value?: unknown;
};

function playerUrl(id: string) {
  // Official TikTok iframe player; muted=1 prevents audio changing without
  // visitor intent, autoplay is still subject to browser/TikTok policy.
  return `${PLAYER_ORIGIN}/player/v1/${id}?autoplay=1&muted=1&loop=1&controls=1&volume_control=0&rel=0&description=0&music_info=0`;
}

function sendPlayerCommand(player: HTMLIFrameElement | null, type: 'play' | 'pause' | 'mute') {
  player?.contentWindow?.postMessage({ 'x-tiktok-player': true, type, value: null }, PLAYER_ORIGIN);
}

export default function SocialShowcase() {
  const [brandIndex, setBrandIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<EmbedStatus>('idle');
  const [playerError, setPlayerError] = useState('');
  const [playerPlaying, setPlayerPlaying] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerReadyRef = useRef(false);

  const brand = socialBrands[brandIndex];
  const activeVideo = brand.videos[videoIndex];
  const permittedToStart = sectionVisible && pageVisible && (!reducedMotion || manualPlay);
  const embedActive = permittedToStart && status !== 'error';
  const shouldPlay = embedActive && !paused;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const readPreference = () => setReducedMotion(motion.matches);
    readPreference();
    motion.addEventListener('change', readPreference);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => {
      motion.removeEventListener('change', readPreference);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      // A tall section may never cross a 50% intersection threshold;
      // use visible pixels rather than only intersection ratio.
      const enoughInView = entry.isIntersecting &&
        entry.intersectionRect.height >= Math.min(240, window.innerHeight * 0.28);
      setSectionVisible(enoughInView);
    }, { threshold: [0, 0.05, 0.12, 0.2, 0.35, 0.55] });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Only on narrow screens, selecting a horizontally swiped card also
  // selects the sole player. Desktop shows all three side by side.
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !('IntersectionObserver' in window)) return;
    const small = window.matchMedia('(max-width: 700px)');
    if (!small.matches) return;
    const cards = Array.from(carousel.querySelectorAll<HTMLElement>('[data-video-index]'));
    const observer = new IntersectionObserver((entries) => {
      const first = entries.filter((entry) => entry.isIntersecting && entry.intersectionRatio > 0.65)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (first) {
        const next = Number((first.target as HTMLElement).dataset.videoIndex);
        setVideoIndex((current) => current === next ? current : next);
      }
    }, { root: carousel, threshold: [0.65, 0.85] });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [brandIndex]);

  const chooseBrand = (index: number) => {
    if (brandIndex === index) return;
    sendPlayerCommand(iframeRef.current, 'pause');
    setBrandIndex(index);
    setVideoIndex(0);
    setManualPlay(false);
    setPaused(false);
    carouselRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  };

  const chooseVideo = (index: number) => {
    if (index !== videoIndex) {
      sendPlayerCommand(iframeRef.current, 'pause');
      setVideoIndex(index);
    }
    setManualPlay(true);
    setPaused(false);
  };

  const navigateMobile = (direction: -1 | 1) => {
    const next = (videoIndex + direction + brand.videos.length) % brand.videos.length;
    chooseVideo(next);
    const grid = carouselRef.current;
    const card = grid?.querySelector<HTMLElement>(`[data-video-index="${next}"]`);
    if (grid && card) {
      grid.scrollTo({
        left: card.offsetLeft - grid.offsetLeft,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const resetPlayer = useCallback(() => {
    setStatus('idle');
    setPlayerError('');
    setPlayerPlaying(false);
    playerReadyRef.current = false;
  }, []);

  useEffect(() => {
    resetPlayer();
  }, [brandIndex, videoIndex, resetPlayer]);

  // A single iframe is ever present. It is entirely unmounted when offscreen
  // or in a background tab, preventing nine embeds from consuming bandwidth.
  useEffect(() => {
    // Unmounting the iframe discards its ready state. Ensure that returning to
    // this section doesn't mistakenly treat a fresh player as ready.
    if (!permittedToStart) {
      playerReadyRef.current = false;
      setStatus('idle');
      setPlayerPlaying(false);
    }
  }, [permittedToStart]);

  useEffect(() => {
    if (!embedActive || !shouldPlay || !playerReadyRef.current) {
      sendPlayerCommand(iframeRef.current, 'pause');
      setPlayerPlaying(false);
      return;
    }
    sendPlayerCommand(iframeRef.current, 'mute');
    sendPlayerCommand(iframeRef.current, 'play');
  }, [embedActive, shouldPlay, brandIndex, videoIndex, status]);

  useEffect(() => {
    if (!embedActive) return;

    const onMessage = (event: MessageEvent<TikTokPlayerEvent>) => {
      if (event.origin !== PLAYER_ORIGIN || event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || data['x-tiktok-player'] !== true) return;
      if (data.type === 'onPlayerReady') {
        playerReadyRef.current = true;
        setStatus('ready');
        if (shouldPlay) {
          sendPlayerCommand(iframeRef.current, 'mute');
          sendPlayerCommand(iframeRef.current, 'play');
        } else {
          sendPlayerCommand(iframeRef.current, 'pause');
        }
      } else if (data.type === 'onStateChange') {
        setPlayerPlaying(data.value === 1);
      } else if (data.type === 'onPlayerError') {
        const error = data.value as { errorCode?: number; errorType?: string } | null;
        setPlayerError(error?.errorCode === 3002
          ? 'Your browser blocked automatic playback.'
          : 'TikTok could not load this preview in your browser.');
        setStatus('error');
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [embedActive, shouldPlay, brandIndex, videoIndex]);

  useEffect(() => {
    if (!embedActive || status === 'ready') return;
    // When the TikTok iframe is blocked, show a usable source link instead
    // of leaving an indefinite empty rectangle.
    const timeout = window.setTimeout(() => {
      if (!playerReadyRef.current) {
        setPlayerError('The embedded preview is unavailable on this connection.');
        setStatus('error');
      }
    }, 13000);
    return () => window.clearTimeout(timeout);
  }, [embedActive, brandIndex, videoIndex, status]);

  const retry = () => {
    resetPlayer();
    setManualPlay(true);
    setPaused(false);
  };

  return (
    <section id="social" className="ed-section ed-social ad-social-showcase" aria-labelledby="social-heading" ref={sectionRef}>
      <div className="ed-wrap">
        <div className="ed-section-head" data-reveal>
          <span className="ed-kicker">02 / SOCIAL & CAMPAIGNS</span>
          <div>
            <h2 id="social-heading">Stories made<br /><em>to be seen.</em></h2>
            <p>Three campaigns per brand. Real work, made for real audiences — with smart, muted previews that only load when you reach this section.</p>
          </div>
        </div>

        <div className="ad-campaign-nav" role="group" aria-label="Choose a brand campaign">
          <div className="ad-campaign-tabs">
            {socialBrands.map((item, index) => (
              <button key={item.id} type="button" onClick={() => chooseBrand(index)}
                className={brandIndex === index ? 'ad-campaign-tab is-selected' : 'ad-campaign-tab'}
                aria-pressed={brandIndex === index}>
                <span className="ad-campaign-tab-index">0{index + 1}</span>
                {item.shortName}
              </button>
            ))}
          </div>
          <span className="ad-campaign-counter">03 SELECTED VIDEOS / BRAND</span>
        </div>

        <div className="ad-campaign-intro" style={{ '--ad-brand': brand.accent } as CSSProperties}>
          <div>
            <span className="ad-campaign-eyebrow">{brand.sector}</span>
            <h3 key={brand.id}>{brand.name}</h3>
            <p>{brand.summary}</p>
          </div>
          <a href={brand.profileUrl} className="ad-campaign-profile" target="_blank" rel="noopener noreferrer">
            View TikTok profile <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="ad-video-grid" ref={carouselRef} aria-label={brand.name + ' video portfolio'}>
          {brand.videos.map((video: SocialVideo, index) => {
            const active = videoIndex === index;
            const displayPlayer = active && embedActive;
            const unavailable = active && status === 'error';
            return (
              <article className={active ? 'ad-video-card is-active' : 'ad-video-card'}
                key={video.id} data-video-index={index}
                style={{ '--ad-brand': brand.accent, '--ad-contrast': brand.accentContrast } as CSSProperties}>
                <div className="ad-video-stage">
                  {/* An editorial preview, not a fabricated video still. */}
                  <div className="ad-video-art" aria-hidden="true">
                    <span className="ad-video-art-kicker">ADMAKI / SELECTED CONTENT</span>
                    <span className="ad-video-art-shape" />
                    <span className="ad-video-art-shape-small" />
                    <span className="ad-video-art-brand">{brand.shortName}</span>
                    <span className="ad-video-art-number">0{index + 1}<i>/03</i></span>
                  </div>

                  {displayPlayer && (
                    <iframe
                      ref={iframeRef}
                      key={video.id}
                      className="ad-tiktok-frame"
                      title={brand.name + ' — ' + video.label + ' from TikTok'}
                      src={playerUrl(video.id)}
                      loading="lazy"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  )}

                  {active && displayPlayer && status !== 'ready' && (
                    <div className="ad-video-loading" role="status">
                      <span className="ad-video-spinner" aria-hidden="true" />
                      <span>Connecting to TikTok…</span>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">Open directly ↗</a>
                    </div>
                  )}

                  {unavailable && (
                    <div className="ad-video-error">
                      <span className="ad-error-symbol" aria-hidden="true">↗</span>
                      <strong>Preview unavailable</strong>
                      <p>{playerError}</p>
                      <button type="button" onClick={retry}>Retry video</button>
                      <a href={video.url} target="_blank" rel="noopener noreferrer">Watch on TikTok ↗</a>
                    </div>
                  )}

                  {!displayPlayer && !unavailable && (
                    <button type="button" className="ad-video-play"
                      onClick={() => chooseVideo(index)}
                      aria-label={'Play ' + brand.name + ' — ' + video.label}>
                      <span className="ad-play-icon" aria-hidden="true">▶</span>
                      <span>{active ? 'Play muted' : 'Watch preview'}</span>
                    </button>
                  )}

                  {active && displayPlayer && status === 'ready' && (
                    <button type="button" className="ad-video-toggle" onClick={() => setPaused(!paused)}
                      aria-label={paused ? 'Resume muted preview' : 'Pause preview'}>
                      <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
                      {paused ? 'RESUME' : 'PAUSE'}
                    </button>
                  )}
                </div>
                <div className="ad-video-meta">
                  <div className="ad-video-meta-top">
                    <span>0{index + 1} / {video.label}</span>
                    {active && sectionVisible && !paused && playerPlaying && <span className="ad-now-playing">PLAYING · MUTED</span>}
                  </div>
                  <div className="ad-video-meta-bottom">
                    <span>Uploaded by {video.creator}</span>
                    <a href={video.url} target="_blank" rel="noopener noreferrer"
                      aria-label={'Open ' + video.label + ' on TikTok'}>
                      TikTok ↗
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="ad-mobile-video-controls" aria-label="Mobile video navigation">
          <span>0{videoIndex + 1} / 03</span>
          <div>
            <button type="button" onClick={() => navigateMobile(-1)} aria-label="Previous campaign video">←</button>
            <button type="button" onClick={() => navigateMobile(1)} aria-label="Next campaign video">→</button>
          </div>
        </div>

        <div className="ad-showcase-footer">
          <p><span className="ad-live-dot" aria-hidden="true" /> Only one muted preview plays at a time. Playback pauses when you leave this section.</p>
          <p>Swipe to explore on mobile <span aria-hidden="true">↔</span></p>
        </div>
      </div>
    </section>
  );
}
