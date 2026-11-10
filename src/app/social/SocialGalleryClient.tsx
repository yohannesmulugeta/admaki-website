'use client';

import BrandLogo from '@/components/ui/BrandLogo';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CampaignVideoPlayer from '@/components/media/CampaignVideoPlayer';
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

function SocialCardVideoPlayer({ video, isActive, onActivate }: {
  video: VideoWithBrand;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    const stage = stageRef.current;
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.1);
    }, { threshold: [0, 0.1] }) : null;
    if (stage) observer?.observe(stage);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [isActive]);

  return <div className="social-card-stage" ref={stageRef}>
    {video.videoSrc && isActive ? <CampaignVideoPlayer video={video}
      shouldPlay={visible && pageVisible && !paused} paused={paused} setPaused={setPaused}
      className="social-card-video" /> : <div className="ad-video-art social-card-preview">
      {video.poster && <Image src={withBasePath(video.poster)} alt="" fill
        sizes="(max-width:640px) 100vw, (max-width:950px) 50vw, 33vw" className="ad-video-poster-img" unoptimized />}
      <span className="ad-video-art-kicker">ADMAKI / SHORT-FORM</span>
      <span className="ad-video-art-shape" />
      <span className="ad-video-art-brand">{video.brand.shortName}</span>
      {video.videoSrc ? <button type="button" className="ad-video-play"
        onClick={() => { setPaused(false); onActivate(); }} aria-label={`Play ${video.brand.name} — ${video.label}`}>
        <span className="ad-play-icon" aria-hidden="true">▶</span><span>Play preview</span>
      </button> : <a href={video.url} target="_blank" rel="noopener noreferrer" className="ad-video-play">
        <span className="ad-play-icon" aria-hidden="true">▶</span><span>Watch on TikTok ↗</span>
      </a>}
    </div>}
  </div>;
}

export default function SocialGalleryClient() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('all');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const displayedVideos = selectedBrandId === 'all'
    ? allVideos
    : allVideos.filter((v) => v.brand.id === selectedBrandId);

  return (
    <div className="social-page">
      {/* Top Navigation */}
      <header className="social-nav">
        <div className="ed-wrap social-nav-inner">
          <Link href="/#social" className="social-back-link" aria-label="Back to home">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="social-logo" aria-label="ADMAKI Home">
            <BrandLogo />
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
            Explore all creative campaigns, product demonstrations and athlete collaborations produced for TikTok and digital audiences. Choose a preview to play with optional sound, or open the original on TikTok. Only the selected preview loads.
          </p>

          <div className="social-stats-strip">
            <div className="social-stat-item">
              <span className="social-stat-num">{allVideos.length}</span>
              <span className="social-stat-label">Campaign videos</span>
            </div>
            <div className="social-stat-item">
              <span className="social-stat-num">{socialBrands.length}</span>
              <span className="social-stat-label">Featured brands</span>
            </div>
            <div className="social-stat-item">
              <span className="social-stat-num">H.264</span>
              <span className="social-stat-label">Fast web streaming</span>
            </div>
            <div className="social-stat-item">
              <span className="social-stat-num">On demand</span>
              <span className="social-stat-label">One preview at a time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <section className="social-filter-section">
        <div className="ed-wrap social-filter-bar">
          <div className="social-tabs" role="group" aria-label="Filter videos by brand">
            <button
              type="button"
              aria-pressed={selectedBrandId === 'all'}
              className={`social-tab ${selectedBrandId === 'all' ? 'is-active' : ''}`}
              onClick={() => { setSelectedBrandId('all'); setActiveVideoId(null); }}
            >
              All campaigns ({allVideos.length})
            </button>
            {socialBrands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                aria-pressed={selectedBrandId === brand.id}
                className={`social-tab ${selectedBrandId === brand.id ? 'is-active' : ''}`}
                onClick={() => { setSelectedBrandId(brand.id); setActiveVideoId(null); }}
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
              const isActive = activeVideoId === video.id;
              return (
                <article key={video.id} className="social-gallery-card">
                  <SocialCardVideoPlayer
                    video={video}
                    isActive={isActive}
                    onActivate={() => setActiveVideoId(video.id)}
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
                          {isActive ? 'SELECTED' : 'PLAY ON DEMAND'}
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
