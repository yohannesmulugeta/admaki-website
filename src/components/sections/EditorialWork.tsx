'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { flushSync } from 'react-dom';
import { socialBrands, workProjects, type WorkCategory, type WorkProject } from '@/data/portfolio';
import { withBasePath } from '@/lib/siteConfig';

type Filter = 'All work' | WorkCategory;
const filters: Filter[] = ['All work', 'Websites', 'Business systems'];

// Open with a stronger visual mix: cinematic site, electronics, restaurant tech,
// and an ERP product. KKGT Coffee stays in the portfolio without leading it.
const showcaseOrder = [
  'sibu', 'universal', 'gurshamenu', 'hayked', 'kkgt-coffee', 'getfit',
  'orbit', 'kkgt-trade', 'beanledger', 'lobelia', 'ephrem', 'bethager', 'koffera',
];
const order = new Map(showcaseOrder.map((id, index) => [id, index]));
const orderedProjects = [...workProjects].sort(
  (left, right) => (order.get(left.id) ?? 99) - (order.get(right.id) ?? 99)
);

function ProjectCard({ project, index }: { project: WorkProject; index: number }) {
  const primaryUrl = project.caseStudyUrl ? withBasePath(project.caseStudyUrl) : (project.liveUrl || project.repoUrl || '');
  const external = !!primaryUrl && /^https?:/.test(primaryUrl);

  return (
    <article className="ed-project" data-project={project.id} data-reveal style={{ '--reveal-delay': Math.min(index % 2, 1) * 100 + 'ms' } as CSSProperties}>
      <div className="ed-project-top"><span>{String(index + 1).padStart(2, '0')} / {project.eyebrow}</span><span>{project.status}</span></div>
      {primaryUrl ? (
        <a className={`ed-project-art theme-${project.theme}`} data-cursor-label={project.category === 'Websites' ? 'VIEW SITE ↗' : 'CASE STUDY ↗'} href={primaryUrl} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={`Explore ${project.title}`}>
          <ProjectArtwork project={project} />
          <span className="ed-art-arrow" aria-hidden="true">↗</span>
        </a>
      ) : (
        <div className={`ed-project-art theme-${project.theme}`}><ProjectArtwork project={project} /></div>
      )}
      <div className="ed-project-meta">
        <div><h3>{project.title}</h3><p>{project.description}</p></div>
        <div className="ed-project-links">
          {project.caseStudyUrl && <a href={withBasePath(project.caseStudyUrl)}>Case study ↗</a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open website ↗</a>}
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">Source ↗</a>}
        </div>
      </div>
    </article>
  );
}

function ProjectArtwork({ project }: { project: WorkProject }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (project.screenshot && !imageFailed) {
    return (
      <div className="ed-cover-shell">
        <div className="ed-cover-toolbar" aria-hidden="true">
          <span className="ed-cover-dots"><i /><i /><i /></span>
          <span className="ed-cover-url">{project.liveUrl ? new URL(project.liveUrl).hostname : project.title}</span>
          <span className="ed-cover-toolbar-icon">↗</span>
        </div>
        <div className="ed-cover-window">
          <Image
            className="ed-project-screenshot"
            src={withBasePath(project.screenshot)}
            alt={project.title + ' — genuine homepage hero preview'}
            width={1440}
            height={900}
            unoptimized
            loading="lazy"
            decoding="async"
            sizes="(max-width: 700px) 100vw, 50vw"
            onError={() => setImageFailed(true)}
          />
          <span className="ed-cover-annotation">
            {project.category === 'Business systems' ? 'PRODUCT PREVIEW' : project.status === 'Concept' ? 'CONCEPT HOMEPAGE' : 'ACTUAL HOMEPAGE'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="ed-artwork" aria-hidden="true">
      <div className="ed-art-browser"><span /><span /><span /><small>ADMAKI / SELECTED WORK</small></div>
      <div className="ed-art-circle" />
      <div className="ed-art-panel" />
      <span className="ed-art-index">CREATIVE DIGITAL WORK &nbsp; / &nbsp; 2026</span>
      <div className="ed-art-words"><span>{project.eyebrow}</span><strong>{project.title}</strong><i>↗</i></div>
      <span className="ed-art-sidenote">Conceptual preview artwork — open project for the actual website</span>
    </div>
  );
}

export default function EditorialWork() {
  const [filter, setFilter] = useState<Filter>('All work');
  const [showAll, setShowAll] = useState(false);
  const filtered = orderedProjects.filter((project) => filter === 'All work' || project.category === filter);
  const shown = showAll ? filtered : filtered.slice(0, 6);

  // The View Transitions API animates filter changes in supporting browsers.
  // The fallback remains an immediate, keyboard-accessible React update.
  const transition = (update: () => void) => {
    const doc = document as Document & { startViewTransition?: (callback: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(() => flushSync(update));
    } else {
      update();
    }
  };

  return (
    <>
      <section id="work" className="ed-section ed-work" aria-labelledby="work-heading">
        <div className="ed-wrap">
          <div className="ed-section-head" data-reveal>
            <span className="ed-kicker">01 / SELECTED WORK</span>
            <div><h2 id="work-heading">Made to look good.<br /><em>Built to do good.</em></h2>
              <p>Real digital projects across websites, brands and business systems. Explore the work, visit the published sites or look at the underlying code.</p>
            </div>
          </div>
          <div className="ed-filter-bar" role="group" aria-label="Filter portfolio projects">
            <div className="ed-tabs">
              {filters.map((item) => (
                <button type="button" key={item} onClick={() => transition(() => { setFilter(item); setShowAll(false); })} className={filter === item ? 'ed-tab active' : 'ed-tab'} aria-pressed={filter === item}>
                  {item}<sup>{item === 'All work' ? workProjects.length : workProjects.filter((project) => project.category === item).length}</sup>
                </button>
              ))}
            </div>
            <span className="ed-results" role="status" aria-live="polite">{filtered.length} PROJECTS</span>
          </div>
          <div className="ed-project-grid">{shown.map((project, i) => <ProjectCard project={project} index={i} key={project.id} />)}</div>
          {filtered.length > 6 && (
            <div className="ed-center-action">
              <button className="ed-btn ed-btn-outline" data-magnetic type="button" onClick={() => transition(() => setShowAll(!showAll))}>
                {showAll ? 'Show fewer projects' : `View all ${filtered.length} projects`} <span aria-hidden="true">{showAll ? '↑' : '↘'}</span>
              </button>
            </div>
          )}
        </div>
      </section>
      <section id="social" className="ed-section ed-social" aria-labelledby="social-heading">
        <div className="ed-wrap">
          <div className="ed-section-head" data-reveal>
            <span className="ed-kicker">02 / SOCIAL & CAMPAIGNS</span>
            <div><h2 id="social-heading">Stories made<br /><em>to be seen.</em></h2>
              <p>Strategy, content direction and short-form production for ambitious Ethiopian brands. Video and profile links will be added as approved work is published.</p>
            </div>
          </div>
          <div className="ed-social-grid">
            {socialBrands.map((brand, i) => (
              <article key={brand.id} data-reveal className="ed-social-card" style={{ '--brand-accent': brand.accent } as CSSProperties}>
                <div className="ed-social-art">
                  <div className="ed-social-art-no">0{i + 1}</div>
                  <span className="ed-social-tag">ADMAKI / SOCIAL STUDIO</span>
                  <div className="ed-social-art-name">{brand.name.split(' ').map((word) => <span key={word}>{word}</span>)}</div>
                  <div className="ed-social-lines"><span /><span /><span /></div>
                  <span className="ed-social-watermark">↗</span>
                </div>
                <div className="ed-social-content">
                  <span className="ed-card-kicker">{brand.sector}</span>
                  <h3>{brand.name}</h3>
                  <p>{brand.summary}</p>
                  <div className="ed-social-tags">{brand.deliverables.map((label) => <span key={label}>{label}</span>)}</div>
                  <div className="ed-social-links" aria-label={brand.name + ' social links'}>
                    {brand.channels.map((channel) => channel.url ? (
                      <a key={channel.label} href={channel.url} target="_blank" rel="noopener noreferrer">{channel.label} ↗</a>
                    ) : (
                      <span key={channel.label} className="ed-link-placeholder" title="Update src/data/portfolio.ts to add link">{channel.label} · link coming soon</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="ed-small-footnote">Social visuals are editorial placeholders, not campaign photographs. Replace them with approved video thumbnails and add live URLs in <code>src/data/portfolio.ts</code>.</p>
        </div>
      </section>
    </>
  );
}
