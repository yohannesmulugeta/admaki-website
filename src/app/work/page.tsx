import BrandLogo from '@/components/ui/BrandLogo';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { workProjects } from '@/data/portfolio';
import { withBasePath } from '@/lib/siteConfig';
import Footer from '@/components/layout/Footer';
import '@/app/websites/websites.css';

export const metadata: Metadata = {
  alternates: { canonical: '/work' },
  title: 'Selected Work & Systems Directory',
  description:
    'Complete portfolio directory for ADMAKI: custom websites, coffee export and warehouse ERP systems, and digital campaigns.',
};

export default function WorkDirectoryPage() {
  return (
    <div className="websites-page">
      <header className="websites-nav">
        <div className="ed-wrap websites-nav-inner">
          <Link href="/" className="websites-back-link" aria-label="Back to home">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="websites-logo" aria-label="ADMAKI Home">
            <BrandLogo />
          </Link>
          <Link href="/#contact" className="websites-cta-btn">
            Start a project ↗
          </Link>
        </div>
      </header>

      <section className="websites-hero">
        <div className="ed-wrap">
          <span className="websites-hero-kicker">WORK DIRECTORY</span>
          <h1>
            Selected projects &amp;<br />
            <em>business platforms.</em>
          </h1>
          <p className="websites-hero-lead">
            Explore our work across creative websites, custom ERP and warehouse platforms, and brand-led digital campaigns.
          </p>

          <div className="websites-stats-strip">
            <Link href="/websites" className="websites-tab is-active" style={{ textDecoration: 'none' }}>
              Explore Websites ({workProjects.filter((p) => p.category === 'Websites').length}) →
            </Link>
            <Link href="/erp" className="websites-tab is-active" style={{ textDecoration: 'none' }}>
              Explore ERP &amp; Systems (3) →
            </Link>
            <Link href="/social" className="websites-tab is-active" style={{ textDecoration: 'none' }}>
              Explore Video Campaigns (9) →
            </Link>
          </div>
        </div>
      </section>

      <section className="websites-gallery">
        <div className="ed-wrap">
          <div className="websites-grid">
            {workProjects.map((project, idx) => {
              const primaryUrl = project.caseStudyUrl
                ? project.caseStudyUrl
                : project.liveUrl || '';
              const isExternal = /^https?:/.test(primaryUrl);

              return (
                <article key={project.id} className="website-card">
                  <div className="website-card-top">
                    <span>
                      {String(idx + 1).padStart(2, '0')} / {project.eyebrow}
                    </span>
                    <span className="website-status-tag status-website">
                      {project.status}
                    </span>
                  </div>

                  <div className="website-cover-stage">
                    <div className="website-browser-bar">
                      <span className="website-browser-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="website-browser-url">
                        {project.category === 'Business systems'
                          ? 'ERP Product System'
                          : project.liveUrl
                          ? new URL(project.liveUrl).hostname
                          : project.title}
                      </span>
                    </div>
                    <div className="website-screenshot-wrap">
                      {project.screenshot ? (
                        <Image
                          src={withBasePath(project.screenshot)}
                          alt={`${project.title} preview`}
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

                  <div className="website-meta">
                    <h2 className="website-title">{project.title}</h2>
                    <p className="website-desc">{project.description}</p>
                    <div className="website-actions">
                      {project.caseStudyUrl && (
                        <Link href={project.caseStudyUrl} className="website-live-link">
                          Read Case Study →
                        </Link>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="website-live-link"
                        >
                          Visit Site ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
