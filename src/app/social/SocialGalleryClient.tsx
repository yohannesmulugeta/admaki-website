'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { socialBrands, type SocialBrand, type SocialVideo } from '@/data/portfolio';
import { withBasePath } from '@/lib/siteConfig';
import Footer from '@/components/layout/Footer';
import './social-page.css';
import '@/app/social-showcase.css';

interface VideoWithBrand extends SocialVideo {
  brand: SocialBrand;
}

const allVideos: VideoWithBrand[] = socialBrands.flatMap((brand) =>
  brand.videos.map((video) => ({
    ...video,
    brand,
  }))
);

function SocialCardVideoPlayer({
  video,
  isAudioActive,
  onActivateAudio,
  onDeactivateAudio,
}: {
  video: VideoWithBrand;
  isAudioActive: boolean;
  onActivateAudio: () => void;
  onDeactivateAudio: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !isAudioActive;
  }, [isAudioActive]);

  const toggleMute = () => {
    if (isAudioActive) {
      onDeactivateAudio();
    } else {
      onActivateAudio();
    }
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="social-card-stage">
      {video.videoSrc ? (
        <>
          <video
            ref={videoRef}
            src={withBasePath(video.videoSrc)}
            poster={video.poster ? withBasePath(video.poster) : undefined}
            className="social-card-video"
            playsInline
            loop
            muted={!isAudioActive}
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <button
            type="button"
            className={`ad-video-sound-toggle ${isAudioActive ? 'is-unmuted' : 'is-muted'}`}
            onClick={toggleMute}
            aria-label={isAudioActive ? 'Mute audio' : 'Unmute audio'}
          >
            <span aria-hidden="true">{isAudioActive ? '🔊' : '🔇'}</span>
            <span>{isAudioActive ? 'MUTE' : 'UNMUTE'}</span>
          </button>

          <button
            type="button"
            className="ad-video-toggle"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
        </>
      ) : (
        <div className="ad-video-art" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <span className="ad-video-art-kicker">ADMAKI / SHORT-FORM</span>
          <span className="ad-video-art-shape" />
          <span className="ad-video-art-brand">{video.brand.shortName}</span>
          <span className="ad-video-art-number">0{video.label.replace(/\D/g, '') || '1'}</span>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ad-video-play"
            style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', width: 'auto', padding: '10px 18px' }}
          >
            <span className="ad-play-icon" aria-hidden="true">▶</span>
            <span>Watch on TikTok ↗</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default function SocialGalleryClient() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [activeAudioVideoId, setActiveAudioVideoId] = useState<string | null>(null);

  const displayedVideos = selectedBrandId === 'all'
    ? allVideos
    : allVideos.filter((v) => v.brand.id === selectedBrandId);

  return (
    <div className="social-page">
      {/* Top Navigation */}
      <header className="social-nav">
        <div className="ed-wrap social-nav-inner">
          <Link href="/#social" className="social-back-link">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="social-logo" aria-label="ADMAKI Home">
            ADMAKI<span>®</span>
          </Link>
          <Link href="/#contact" className="social-cta-btn">
            Start a project ↗
          </Link>
        </div>
      </header>

      {/* Hero Header */}
      <section className="social-hero">
        <div className="ed-wrap">
          <span className="social-hero-kicker">01 / SOCIAL &amp; SHORT-FORM VIDEO</span>
          <h1>
            Campaigns made<br />
            <em>to be seen &amp; heard.</em>
          </h1>
          <p className="social-hero-lead">
            Explore all creative campaigns, product demonstrations and athlete collaborations produced for TikTok and digital audiences. Every video plays in high quality with interactive audio controls.
          </p>

          <div className="social-stats-strip">
            <div className="social-stat-item">
              <span className="social-stat-num">09</span>
              <span className="social-stat-label">Campaign videos</span>
            </div>
            <div className="social-stat-item">
              <span className="social-stat-num">03</span>
              <span className="social-stat-label">Featured brands</span>
            </div>
            <div className="social-stat-item">
              <span className="social-stat-num">H.264</span>
              <span className="social-stat-label">Fast web streaming</span>
            </div>
            <div className="social-stat-item">
              <span className="social-stat-num">100%</span>
              <span className="social-stat-label">Mobile optimized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <section className="social-filter-section">
        <div className="ed-wrap social-filter-bar">
          <div className="social-tabs" role="tablist" aria-label="Filter videos by brand">
            <button
              type="button"
              role="tab"
              aria-selected={selectedBrandId === 'all'}
              className={`social-tab ${selectedBrandId === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedBrandId('all')}
            >
              All campaigns ({allVideos.length})
            </button>
            {socialBrands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                role="tab"
                aria-selected={selectedBrandId === brand.id}
                className={`social-tab ${selectedBrandId === brand.id ? 'is-active' : ''}`}
                onClick={() => setSelectedBrandId(brand.id)}
              >
                {brand.shortName} ({brand.videos.length})
              </button>
            ))}
          </div>
          <span className="social-counter">
            Showing {displayedVideos.length} {displayedVideos.length === 1 ? 'video' : 'videos'}
          </span>
        </div>
      </section>

      {/* Videos Gallery Grid */}
      <section className="social-gallery">
        <div className="ed-wrap">
          <div className="social-gallery-grid">
            {displayedVideos.map((video) => {
              const isAudioActive = activeAudioVideoId === video.id;
              return (
                <article key={video.id} className="social-gallery-card">
                  <SocialCardVideoPlayer
                    video={video}
                    isAudioActive={isAudioActive}
                    onActivateAudio={() => setActiveAudioVideoId(video.id)}
                    onDeactivateAudio={() => setActiveAudioVideoId(null)}
                  />

                  <div className="social-card-meta">
                    <div className="social-card-top">
                      <span
                        className="social-card-brand-badge"
                        style={{
                          background: video.brand.accent,
                          color: video.brand.accentContrast,
                        }}
                      >
                        {video.brand.name}
                      </span>
                      {video.videoSrc && (
                        <span className="social-card-status">
                          {isAudioActive ? 'SOUND ON' : 'MUTED'}
                        </span>
                      )}
                    </div>

                    <h2 className="social-card-title">{video.label}</h2>

                    <div className="social-card-bottom">
                      <span className="social-card-creator">
                        Uploaded by {video.creator}
                      </span>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-card-link"
                      >
                        TikTok ↗
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="social-page-cta">
        <div className="ed-wrap">
          <h2>
            Have a campaign in mind?<br />
            <em>Let&apos;s make it matter.</em>
          </h2>
          <p>
            Whether you need product storytelling, short-form creator collaboration, or a complete brand campaign, we produce content that earns real attention.
          </p>
          <div className="social-cta-actions">
            <Link href="/#contact" className="social-cta-btn-white">
              Start a project →
            </Link>
            <Link href="/#work" className="social-cta-btn-ghost">
              Explore web &amp; software work
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
