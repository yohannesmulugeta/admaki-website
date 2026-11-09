'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { flushSync } from 'react-dom';
import { workProjects, type WorkCategory, type WorkProject } from '@/data/portfolio';
import { withBasePath } from '@/lib/siteConfig';

type Filter = 'All work' | WorkCategory;
const filters: Filter[] = ['All work', 'Websites', 'Business systems'];

// Showcase real custom-domain websites first. This ranking also adapts when
// another project gains its own domain: update only its liveUrl in portfolio.ts.
// Draft sites with custom domains retain their explicit Preview status.
const showcaseOrder = [
  'sibu', 'universal', 'enkupanet', 'kkgt-coffee', 'kkgt-trade', 'maison-debrah',
  'gurshamenu', 'hayked', 'hayked-trading', 'getfit', 'orbit', 'beanledger',
  'lobelia', 'ephrem', 'bethager', 'koffera',
];
const order = new Map(showcaseOrder.map((id, index) => [id, index]));
const hasCustomDomain = (project: WorkProject): boolean => {
  if (!project.liveUrl) return false;
  try {
    const hostname = new URL(project.liveUrl).hostname;
    return hostname !== 'github.io' && !hostname.endsWith('.github.io');
  } catch {
    return false;
  }
};
const orderedProjects = [...workProjects].sort(
  (left, right) =>
    Number(hasCustomDomain(right)) - Number(hasCustomDomain(left)) ||
    (order.get(left.id) ?? 99) - (order.get(right.id) ?? 99)
);

function ProjectCard({ project, index }: { project: WorkProject; index: number }) {
  const primaryUrl = project.caseStudyUrl ? withBasePath(project.caseStudyUrl) : (project.liveUrl || '');
  const external = !!primaryUrl && /^https?:/.test(primaryUrl);

  return (
    <article className="ed-project" data-project={project.id} data-reveal style={{ '--reveal-delay': Math.min(index % 2, 1) * 100 + 'ms' } as CSSProperties}>
      <div className="ed-project-top"><span>{String(index + 1).padStart(2, '0')} / {project.eyebrow}</span><span>{project.status}</span></div>
      {primaryUrl ? (
        <a className={`ed-project-art theme-${project.theme}`} data-cursor-label={project.status === 'Preview' ? 'PREVIEW ↗' : project.category === 'Websites' ? 'VIEW SITE ↗' : 'CASE STUDY ↗'} href={primaryUrl} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={`Explore ${project.title}`}>
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
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.status === 'Preview' ? 'View preview ↗' : 'Open website ↗'}</a>}
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
            {project.category === 'Business systems' ? 'PRODUCT PREVIEW' : project.status === 'Concept' ? 'CONCEPT HOMEPAGE' : project.status === 'Preview' ? 'DRAFT PREVIEW' : 'ACTUAL HOMEPAGE'}
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
    </div>
  );
}

export default function EditorialWork() {
  const [filter, setFilter] = useState<Filter>('All work');
  const [showAll, setShowAll] = useState(false);

  const filtered = filter === 'All work'
    ? orderedProjects
    : orderedProjects.filter((project) => project.category === filter);

  const shown = showAll ? filtered : filtered.slice(0, 6);

  const transition = (update: () => void) => {
    const doc = document as Document & { startViewTransition?: (callback: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(() => flushSync(update));
    } else {
      update();
    }
  };

  return (
    <section id="work" className="ed-section ed-work" aria-labelledby="work-heading">
      <div className="ed-wrap">
        <div className="ed-section-head" data-reveal>
          <span className="ed-kicker">02 / SELECTED WORK</span>
          <div><h2 id="work-heading">Made to look good.<br /><em>Built to do good.</em></h2>
            <p>Real digital projects across websites, brands and business systems. Explore the work, visit the published sites, and discover the thinking behind our digital projects.</p>
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
          <div className="ed-center-action" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="ed-btn ed-btn-outline" data-magnetic type="button" onClick={() => transition(() => setShowAll(!showAll))}>
              {showAll ? 'Show fewer projects' : `View all ${filtered.length} projects`} <span aria-hidden="true">{showAll ? '↑' : '↘'}</span>
            </button>
            <Link href="/websites" className="ed-btn ed-btn-dark" data-magnetic>
              All Websites (14) →
            </Link>
            <Link href="/erp" className="ed-btn ed-btn-dark" data-magnetic>
              All ERP Systems →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
