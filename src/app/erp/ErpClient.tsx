'use client';

import BrandLogo from '@/components/ui/BrandLogo';

import Link from 'next/link';
import Image from 'next/image';
import TelegramBotSimulator from '@/components/interactive/TelegramBotSimulator';
import Footer from '@/components/layout/Footer';
import { projectsData } from '@/data/projects';
import { withBasePath } from '@/lib/siteConfig';
import './erp.css';

const warehouseProject = projectsData.find((project) => project.id === 'project-01')!;

export default function ErpClient() {
  return (
    <div className="erp-page">
      {/* Navigation */}
      <header className="erp-nav">
        <div className="ed-wrap erp-nav-inner">
          <Link href="/#work" className="erp-back-link" aria-label="Back to home">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="erp-logo" aria-label="ADMAKI Home">
            <BrandLogo light />
          </Link>
          <Link href="/#contact" className="erp-cta-btn">
            Start a project ↗
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="erp-hero">
        <div className="ed-wrap">
          <span className="erp-hero-kicker">02 / BUSINESS SYSTEMS &amp; INTERNAL TOOLS</span>
          <h1>
            Useful behind the scenes.<br />
            <em>Systems that run the work.</em>
          </h1>
          <p className="erp-hero-lead">
            We architect custom ERPs, warehouse custody ledgers, and automated document pipelines built around how businesses actually operate — replacing fragmented spreadsheets with controlled, traceable workflows.
          </p>

          <div className="erp-stats-strip">
            <div className="erp-stat-item">
              <span className="erp-stat-num">GRN → Lot</span>
              <span className="erp-stat-label">Lot traceability</span>
            </div>
            <div className="erp-stat-item">
              <span className="erp-stat-num">Reviewable</span>
              <span className="erp-stat-label">Operational records</span>
            </div>
            <div className="erp-stat-item">
              <span className="erp-stat-num">Role-Based</span>
              <span className="erp-stat-label">Access controls</span>
            </div>
            <div className="erp-stat-item">
              <span className="erp-stat-num">PostgreSQL</span>
              <span className="erp-stat-label">Relational integrity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Showcase */}
      <section className="erp-showcase-section">
        <div className="ed-wrap">
          {/* System 01: Coffee Processing & Warehouse Management System */}
          <article className="erp-system-card">
            <div className="erp-card-header">
              <span className="erp-card-index">SYSTEM 01 // WAREHOUSE ERP</span>
              <span className="erp-card-status-pill">Project showcase</span>
            </div>
            <div className="erp-card-content">
              <div className="erp-card-graphic">
                <Image
                  src={withBasePath(warehouseProject.image)}
                  alt="Illustrated coffee warehouse workflow; no customer records"
                  fill
                  sizes="(max-width: 950px) 100vw, 55vw"
                  unoptimized
                />
              </div>
              <div className="erp-card-info">
                <h2>{warehouseProject.title}</h2>
                <div className="erp-card-tagline">
                  {warehouseProject.category}
                </div>
                <p className="erp-card-desc">
                  {warehouseProject.description}
                </p>
                <div className="erp-feature-list">
                  {warehouseProject.solution.points.map((feature) => (
                    <div className="erp-feature-item" key={feature}>
                      <span className="erp-feature-check">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="erp-card-links">
                  <Link
                    href="/work/coffee-processing-warehouse-management-system"
                    className="erp-btn-primary"
                  >
                    Read case study →
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* System 02: BeanLedger Coffee Export ERP */}
          <article className="erp-system-card">
            <div className="erp-card-header">
              <span className="erp-card-index">SYSTEM 02 // EXPORT LEDGER ERP</span>
              <span className="erp-card-status-pill">Project showcase</span>
            </div>
            <div className="erp-card-content">
              <div className="erp-card-graphic">
                <Image
                  src={withBasePath('/images/projects/beanledger-coffee-export-erp.webp')}
                  alt="BeanLedger Coffee Export ERP interface preview"
                  fill
                  sizes="(max-width: 950px) 100vw, 55vw"
                  unoptimized
                />
              </div>
              <div className="erp-card-info">
                <h2>BeanLedger Coffee Export ERP</h2>
                <div className="erp-card-tagline">
                  Purchases · Warehouse · Bag Ledger · Export Contracts
                </div>
                <p className="erp-card-desc">
                  A unified ledger connecting supplier purchases, warehouse receipts, processing outputs, bag stock, export contract balances, and document output into one connected system.
                </p>
                <div className="erp-feature-list">
                  <div className="erp-feature-item">
                    <span className="erp-feature-check">✓</span>
                    <span>Traceable stock trail across purchase, storage, and processing</span>
                  </div>
                  <div className="erp-feature-item">
                    <span className="erp-feature-check">✓</span>
                    <span>Operational bag balance reconciliation and export allocation</span>
                  </div>
                  <div className="erp-feature-item">
                    <span className="erp-feature-check">✓</span>
                    <span>Integrated official letter generation and audit trail</span>
                  </div>
                </div>
                <div className="erp-card-links">
                  <Link href="/work/beanledger" className="erp-btn-primary">
                    Read case study →
                  </Link>
                  <a
                    href="https://bean-ledger-five.vercel.app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="erp-btn-secondary"
                  >
                    Launch system ↗
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* System 03: Telegram Automation Daemon & Bots (Interactive) */}
          <article className="erp-automation-card">
            <div className="erp-automation-grid">
              <div>
                <span className="erp-card-index" style={{ display: 'block', marginBottom: '8px' }}>
                  SYSTEM 03 // AUTOMATION &amp; DAEMONS
                </span>
                <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 850, margin: '0 0 12px', color: '#fff' }}>
                  Telegram Workflow Simulator
                </h2>
                <div className="erp-card-tagline">
                  Interactive prototype · Example commands · Sample responses
                </div>
                <p className="erp-card-desc">
                  Explore a browser-based demonstration of command-driven workflows. Responses and telemetry are illustrative; this preview is not connected to Telegram, customer records, or a live database.
                </p>
                <div className="erp-feature-list">
                  <div className="erp-feature-item">
                    <span className="erp-feature-check">✓</span>
                    <span>Illustrative command and response flows</span>
                  </div>
                  <div className="erp-feature-item">
                    <span className="erp-feature-check">✓</span>
                    <span>Sample operational events and status messages</span>
                  </div>
                  <div className="erp-feature-item">
                    <span className="erp-feature-check">✓</span>
                    <span>Example customer service, lead, and order workflows</span>
                  </div>
                </div>
                <p style={{ font: '600 11px/1 var(--font-geist-mono), monospace', color: '#38bdf8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Try the interactive simulation:
                </p>
              </div>

              <div>
                <TelegramBotSimulator />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="erp-cta-section">
        <div className="ed-wrap">
          <h2>
            Need a system that fits<br />
            <em>how your business works?</em>
          </h2>
          <p>
            Off-the-shelf software rarely fits complex Ethiopian trade, warehouse, and inventory flows. We build custom platforms that give you total control.
          </p>
          <div className="social-cta-actions">
            <Link href="/#contact" className="erp-btn-primary" style={{ padding: '14px 28px', fontSize: '12px' }}>
              Start an ERP consultation →
            </Link>
            <Link href="/websites" className="erp-btn-secondary" style={{ padding: '14px 28px', fontSize: '12px' }}>
              Explore public websites
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
