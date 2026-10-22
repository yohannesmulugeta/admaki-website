import IdeaEngine from '@/components/sections/IdeaEngine';
import MotionSignals from '@/components/motion/MotionSignals';
import type { CSSProperties } from 'react';
import EditorialWork from '@/components/sections/EditorialWork';
import './editorial.css';

const services = [
  { number: '01', title: 'Creative & social', subtitle: 'Stories with a reason to exist.', body: 'Campaign thinking, content strategy, visual direction and short-form video made to connect with people.', tags: ['Social media', 'Content production', 'Art direction'] },
  { number: '02', title: 'Digital experiences', subtitle: 'Made for the way people browse.', body: 'Distinctive websites and digital products with purposeful interaction, mobile-first design and room to grow.', tags: ['Web development', 'UI/UX', 'Interactive experiences'] },
  { number: '03', title: 'Business systems', subtitle: 'Useful behind the scenes, too.', body: 'Custom ERP, operational dashboards and workflow solutions built around how a business actually works.', tags: ['ERP & inventory', 'Internal platforms', 'Automation'] },
];

const process = [
  { n: '01', name: 'Discover', desc: 'Listen carefully, map the problem and define what success should look like.' },
  { n: '02', name: 'Shape', desc: 'Turn insights into a strong creative direction, structure and delivery plan.' },
  { n: '03', name: 'Make', desc: 'Design, produce, develop and test the things people will actually use.' },
  { n: '04', name: 'Evolve', desc: 'Refine the experience as needs change and new opportunities emerge.' },
];

export default function Home() {
  return (
    <main className="editorial-site" id="main-content">
      <MotionSignals />
      <a href="#work" className="ed-skip">Skip to work</a>
      <header className="ed-nav">
        <div className="ed-wrap ed-nav-inner">
          <a href="#home" className="ed-logo" aria-label="ADMAKI, home">ADMAKI<span>®</span></a>
          <nav className="ed-nav-links" aria-label="Main navigation">
            <a href="#work">Work</a><a href="#social">Campaigns</a><a href="#services">Services</a><a href="#studio">Studio</a>
          </nav>
          <a className="ed-nav-cta" data-magnetic href="#contact">Start a project <span aria-hidden="true">↗</span></a>
          <details className="ed-mobile-menu">
            <summary aria-label="Open navigation">MENU <span aria-hidden="true">☰</span></summary>
            <nav aria-label="Mobile navigation"><a href="#work">Work</a><a href="#social">Campaigns</a><a href="#services">Services</a><a href="#studio">Studio</a><a href="#contact">Start a project</a></nav>
          </details>
        </div>
      </header>

      <IdeaEngine />

      <div className="ed-marquee" aria-label="ADMAKI disciplines">
        <div className="ed-wrap ed-marquee-inner"><span>STRATEGY</span><i>✳</i><span>DESIGN</span><i>✳</i><span>DEVELOPMENT</span><i>✳</i><span>STORYTELLING</span><i>✳</i><span>BUSINESS SYSTEMS</span></div>
      </div>

      <EditorialWork />

      <section id="services" className="ed-section ed-services" aria-labelledby="services-heading">
        <div className="ed-wrap">
          <div className="ed-section-head" data-reveal>
            <span className="ed-kicker">03 / WHAT WE DO</span>
            <div><h2 id="services-heading">Creative on the outside.<br /><em>Considered on the inside.</em></h2>
              <p>Three disciplines, one connected way of thinking. We match the craft and the technology to the problem — not the other way around.</p>
            </div>
          </div>
          <div className="ed-service-list">{services.map((service) => (
            <article className="ed-service" data-reveal key={service.number}>
              <span className="ed-service-num">{service.number} / 03</span>
              <div><h3>{service.title}</h3><strong>{service.subtitle}</strong></div>
              <div><p>{service.body}</p><div className="ed-service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              <span className="ed-service-arrow" aria-hidden="true">↗</span>
            </article>
          ))}</div>
        </div>
      </section>

      <section id="studio" className="ed-studio ed-section" aria-labelledby="studio-heading">
        <div className="ed-wrap ed-studio-grid">
          
          <div data-reveal><span className="ed-kicker">04 / THE STUDIO</span><div className="ed-studio-seal" aria-hidden="true"><span>AD.</span><i>MAKING IDEAS USEFUL</i></div></div>
          <div data-reveal><h2 id="studio-heading">Not more noise.<br /><em>More meaning.</em></h2>
            <p className="ed-studio-lead">ADMAKI connects creative communication with practical technology. Based in Ethiopia, we work where strong ideas and everyday business challenges meet.</p>
            <p>We care about the details people see — the identity, layout, interaction and story — and the systems they rely on when the screen closes.</p>
            <a href="#contact" className="ed-text-link" data-magnetic>Let's make something together <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="process" className="ed-section ed-process" aria-labelledby="process-heading">
        <div className="ed-wrap">
          <div className="ed-section-head" data-reveal>
            <span className="ed-kicker">05 / HOW WE WORK</span>
            <div><h2 id="process-heading">Good work is<br /><em>no accident.</em></h2><p>Clear thinking, steady execution and a willingness to improve.</p></div>
          </div>
          <div className="ed-process-grid">{process.map((step, index) => (
            <article key={step.n} data-reveal style={{ '--reveal-delay': index * 90 + 'ms' } as CSSProperties}><span>{step.n} / 04</span><div className="ed-process-marker" /><h3>{step.name}</h3><p>{step.desc}</p></article>
          ))}</div>
        </div>
      </section>

      <section id="contact" className="ed-contact" aria-labelledby="contact-heading">
        <div className="ed-wrap">
          <span className="ed-kicker">06 / WHAT'S NEXT</span>
          <h2 id="contact-heading" data-reveal>Have an idea?<br /><em>Let's make it matter.</em></h2>
          <div className="ed-contact-bottom" data-reveal>
            <p>Tell us what you're building — a website, a campaign or a system that makes the work easier.</p>
            <div className="ed-contact-actions"><a className="ed-btn ed-btn-white" data-magnetic href="https://github.com/yohannesmulugeta" target="_blank" rel="noopener noreferrer">Explore our GitHub <span aria-hidden="true">↗</span></a><span className="ed-contact-note">Email and WhatsApp inquiry links will be added when confirmed.</span></div>
          </div>
          <div className="ed-footer" data-reveal><a href="#home" className="ed-footer-wordmark">ADMAKI<span>®</span></a><div><span>CREATIVE THINKING. TECHNICAL EXECUTION.</span><a href="#home">BACK TO TOP ↑</a></div></div>
        </div>
      </section>
    </main>
  );
}
