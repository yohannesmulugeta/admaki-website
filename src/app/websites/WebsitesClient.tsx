'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { workProjects } from '@/data/portfolio';
import { withBasePath } from '@/lib/siteConfig';
import Footer from '@/components/layout/Footer';
import './websites.css';

const websiteProjects = workProjects.filter((p) => p.category === 'Websites');

type FilterType = 'All' | 'Production' | 'Previews & Concepts';

export default function WebsitesClient() {
  const [filter, setFilter] = useState<FilterType>('All');

  const filtered = filter === 'All'
    ? websiteProjects
    : filter === 'Production'
    ? websiteProjects.filter((p) => p.status === 'Website' || p.status === 'Product')
    : websiteProjects.filter((p) => p.status === 'Preview' || p.status === 'Concept');

  return (
    <div className="websites-page">
      {/* Navigation */}
      <header className="websites-nav">
        <div className="ed-wrap websites-nav-inner">
          <Link href="/#work" className="websites-back-link" aria-label="Back to home">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="websites-logo" aria-label="ADMAKI Home">
            ADMAKI<span>®</span>
          </Link>
          <Link href="/#contact" className="websites-cta-btn">
            Start a project ↗
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="websites-hero">
        <div className="ed-wrap">
          <span className="websites-hero-kicker">01 / DIGITAL EXPERIENCES</span>
          <h1>
            Websites built<br />
            <em>to move &amp; perform.</em>
          </h1>
          <p className="websites-hero-lead">
            Every website we create is built around purposeful interaction, mobile-first performance, and genuine client identity. Explore our complete directory of corporate websites, product platforms, and editorial digital spaces.
          </p>

          <div className="websites-stats-strip">
            <div className="websites-stat-item">
              <span className="websites-stat-num">{websiteProjects.length}</span>
              <span className="websites-stat-label">Total web projects</span>
            </div>
            <div className="websites-stat-item">
              <span className="websites-stat-num">
                {websiteProjects.filter((p) => p.status === 'Website' || p.status === 'Product').length}
              </span>
              <span className="websites-stat-label">Live websites</span>
            </div>
            <div className="websites-stat-item">
              <span className="websites-stat-num">Mobile-first</span>
              <span className="websites-stat-label">Design approach</span>
            </div>
            <div className="websites-stat-item">
              <span className="websites-stat-num">Next.js</span>
              <span className="websites-stat-label">Modern web stack</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="websites-filter-section">
        <div className="ed-wrap websites-filter-bar">
          <div className="websites-tabs" role="group" aria-label="Filter websites">
            {(['All', 'Production', 'Previews & Concepts'] as FilterType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={filter === tab}
                className={`websites-tab ${filter === tab ? 'is-active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab} ({tab === 'All' ? websiteProjects.length : tab === 'Production' ? websiteProjects.filter((p) => p.status === 'Website' || p.status === 'Product').length : websiteProjects.filter((p) => p.status === 'Preview' || p.status === 'Concept').length})
              </button>
            ))}
          </div>
          <span className="websites-counter">
            Showing {filtered.length} {filtered.length === 1 ? 'website' : 'websites'}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="websites-gallery">
        <div className="ed-wrap">
          <div className="websites-grid">
            {filtered.map((project, idx) => {
              const hostname = project.liveUrl ? new URL(project.liveUrl).hostname : 'admakidigital.com';
              const statusClass =
                project.status === 'Website'
                  ? 'status-website'
                  : project.status === 'Product'
                  ? 'status-product'
                  : project.status === 'Preview'
                  ? 'status-preview'
                  : 'status-concept';

              return (
                <article key={project.id} className="website-card">
                  <div className="website-card-top">
                    <span>
                      {String(idx + 1).padStart(2, '0')} / {project.eyebrow}
                    </span>
                    <span className={`website-status-tag ${statusClass}`}>
                      {project.status}
                    </span>
                  </div>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-cover-stage"
                      aria-label={`Visit ${project.title} website`}
                    >
                      <div className="website-browser-bar">
                        <span className="website-browser-dots">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="website-browser-url">{hostname}</span>
                        <span>↗</span>
                      </div>
                      <div className="website-screenshot-wrap">
                        {project.screenshot ? (
                          <Image
                            src={withBasePath(project.screenshot)}
                            alt={`${project.title} homepage preview`}
                            fill
                            sizes="(max-width: 800px) 100vw, 50vw"
                            className="website-screenshot"
                            unoptimized
                          />
                        ) : (
                          <div className="ed-artwork" style={{ height: '100%' }}>
                            <span className="ed-art-index">{project.title}</span>
                          </div>
                        )}
                      </div>
                    </a>
                  ) : (
                    <div className="website-cover-stage">
                      <div className="website-browser-bar">
                        <span className="website-browser-dots">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="website-browser-url">{project.title}</span>
                      </div>
                      <div className="website-screenshot-wrap">
                        {project.screenshot ? (
                          <Image
                            src={withBasePath(project.screenshot)}
                            alt={`${project.title} homepage preview`}
                            fill
                            sizes="(max-width: 800px) 100vw, 50vw"
                            className="website-screenshot"
                            unoptimized
                          />
                        ) : (
                          <div className="ed-artwork" style={{ height: '100%' }}>
                            <span className="ed-art-index">{project.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="website-meta">
                    <h2 className="website-title">{project.title}</h2>
                    <p className="website-desc">{project.description}</p>
                    <div className="website-actions">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="website-live-link"
                        >
                          {project.status === 'Preview'
                            ? 'Open preview ↗'
                            : 'Visit website ↗'}
                        </a>
                      ) : (
                        <span className="website-theme-tag">Concept archive</span>
                      )}
                      <span className="website-theme-tag">Theme: {project.theme}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="websites-cta-section">
        <div className="ed-wrap">
          <h2>
            Ready to build a website<br />
            <em>people remember?</em>
          </h2>
          <p>
            From high-converting corporate portals to bespoke e-commerce and interactive editorial experiences, we design and build modern websites that work.
          </p>
          <div className="social-cta-actions">
            <Link href="/#contact" className="social-cta-btn-white">
              Start a project →
            </Link>
            <Link href="/erp" className="social-cta-btn-ghost">
              Explore ERP &amp; business systems
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
