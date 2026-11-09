import Link from 'next/link';
import IdeaEngine from '@/components/sections/IdeaEngine';
import MotionSignals from '@/components/motion/MotionSignals';
import StudioCursor from '@/components/motion/StudioCursor';
import type { CSSProperties } from 'react';
import SocialShowcase from '@/components/sections/SocialShowcase';
import EditorialWork from '@/components/sections/EditorialWork';
import FeaturedCaseStudies from '@/components/sections/FeaturedCaseStudies';
import './editorial.css';
import './cursor-covers.css';
import './social-showcase.css';
import './products.css';

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
      <StudioCursor />
      <a href="#social" className="ed-skip">Skip to campaigns</a>
      <header className="ed-nav">
        <div className="ed-wrap ed-nav-inner">
          <a href="#home" className="ed-logo" aria-label="ADMAKI, home">ADMAKI<span>®</span></a>
          <nav className="ed-nav-links" aria-label="Main navigation">
            <Link href="/work">Work</Link><a href="#featured-case-studies">Case studies</a><a href="#products">Products</a><a href="#social">Campaigns</a><a href="#services">Services</a><a href="#studio">Studio</a>
          </nav>
          <a className="ed-nav-cta" data-magnetic href="#contact">Start a project <span aria-hidden="true">↗</span></a>
          <details className="ed-mobile-menu">
            <summary aria-label="Open navigation">MENU <span aria-hidden="true">☰</span></summary>
            <nav aria-label="Mobile navigation"><Link href="/work">Work</Link><a href="#products">Products</a><a href="#social">Campaigns</a><a href="#services">Services</a><a href="#studio">Studio</a><a href="#contact">Start a project</a></nav>
          </details>
        </div>
      </header>

      <IdeaEngine />

      <div className="ed-marquee" aria-label="ADMAKI disciplines">
        <div className="ed-wrap ed-marquee-inner"><span>STRATEGY</span><i>✳</i><span>DESIGN</span><i>✳</i><span>DEVELOPMENT</span><i>✳</i><span>STORYTELLING</span><i>✳</i><span>BUSINESS SYSTEMS</span></div>
      </div>

      <SocialShowcase />

      <FeaturedCaseStudies />
      <EditorialWork />

      <section id="products" className="ad-products ed-section" aria-labelledby="products-heading">
        <div className="ed-wrap">
          <div className="ad-products-head">
            <span className="ed-kicker">DIGITAL PRODUCTS / ADMAKI</span>
            <div><h2 id="products-heading">Simple for your customers.<br /><em>Powerful for your business.</em></h2>
              <p className="ad-products-lead">Practical digital tools for Ethiopian businesses, built to make everyday service easier. Explore a live restaurant menu or ask about an NFC business card.</p></div>
          </div>
          <div className="ad-products-grid">
            <article className="ad-product-card">
              <div className="ad-product-number"><span>01 / RESTAURANTS</span><span className="ad-product-icon" aria-hidden="true">▦</span></div>
              <div className="ad-product-body"><h3>Digital restaurant menus</h3><p>Give customers a mobile-friendly QR menu they can open without installing an app. See a real working menu and ask about creating one for your restaurant.</p></div>
              <div className="ad-product-actions">
                <a className="ad-product-action" href="https://menu.admakidigital.com/" target="_blank" rel="noopener noreferrer">Explore menu service <span aria-hidden="true">↗</span></a>
                <a className="ad-product-action secondary" href="https://app.admakidigital.com/#/r/abol-coffee" target="_blank" rel="noopener noreferrer">Try live menu <span aria-hidden="true">↗</span></a>
                <a className="ad-product-action secondary" href="https://wa.me/251937928215?text=Hello%20AdMaki%2C%20I%20would%20like%20a%20digital%20restaurant%20menu." target="_blank" rel="noopener noreferrer">Request a menu <span aria-hidden="true">↗</span></a>
              </div>
              <p className="ad-product-foot">Live demo: Abol Coffee · Restaurant menu platform</p>
            </article>
            <article className="ad-product-card card-dark">
              <div className="ad-product-number"><span>02 / BUSINESS IDENTITY</span><span className="ad-product-icon" aria-hidden="true">◈</span></div>
              <div className="ad-product-body"><h3>NFC digital business cards</h3><p>Share your contact details with a tap or QR code. Our planned customer dashboard will let card owners update their photos, phone numbers, and links without rewriting their NFC cards.</p></div>
              <div className="ad-product-actions">
                <a className="ad-product-action" href="https://nfc.admakidigital.com/" target="_blank" rel="noopener noreferrer">Explore NFC cards <span aria-hidden="true">↗</span></a>
                <a className="ad-product-action secondary" href="https://wa.me/251937928215?text=Hello%20AdMaki%2C%20I%20am%20interested%20in%20NFC%20digital%20business%20cards." target="_blank" rel="noopener noreferrer">Ask about NFC cards <span aria-hidden="true">↗</span></a>
                <a className="ad-product-action secondary" href="mailto:yohannesmulugegta084@gmail.com?subject=AdMaki%20Digital%20Business%20Card%20Inquiry">Email us <span aria-hidden="true">↗</span></a>
              </div>
              <p className="ad-product-foot">Customer editing portal is planned, not yet launched.</p>
            </article>
          </div>
        </div>
      </section>

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
            <a href="#contact" className="ed-text-link" data-magnetic>Let&apos;s make something together <span aria-hidden="true">↗</span></a>
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
          <span className="ed-kicker">06 / WHAT&apos;S NEXT</span>
          <h2 id="contact-heading" data-reveal>Have an idea?<br /><em>Let&apos;s make it matter.</em></h2>
          <div className="ed-contact-bottom" data-reveal>
            <p>Tell us what you&apos;re building — a website, a campaign or a system that makes the work easier.</p>
            <div className="ed-contact-actions"><div className="ad-contact-buttons">
              <a className="ed-btn ed-btn-white" data-magnetic href="https://wa.me/251937928215?text=Hello%20AdMaki%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span aria-hidden="true">↗</span></a>
              <a className="ed-btn ed-btn-white" data-magnetic href="mailto:hello@admakidigital.com?subject=Project%20Inquiry%20%E2%80%94%20AdMaki%20Digital">Send an email <span aria-hidden="true">↗</span></a>
              <a className="ed-btn ed-btn-white" href="tel:+251937928215">Call us <span aria-hidden="true">↗</span></a>
            </div>
              <p className="ad-contact-details">Phone / WhatsApp: <a href="tel:+251937928215">+251 93 792 8215</a></p>
              <dl className="ad-business-emails" aria-label="Business email contacts">
                <div><dt>General enquiries</dt><dd><a href="mailto:hello@admakidigital.com">hello@admakidigital.com</a></dd></div>
                <div><dt>Sales &amp; orders</dt><dd><a href="mailto:sales@admakidigital.com">sales@admakidigital.com</a></dd></div>
                <div><dt>Customer support</dt><dd><a href="mailto:support@admakidigital.com">support@admakidigital.com</a></dd></div>
                <div><dt>Contact Joni</dt><dd><a href="mailto:joni@admakidigital.com">joni@admakidigital.com</a></dd></div>
              </dl>
            </div>
          </div>
          <div className="ed-footer" data-reveal><a href="#home" className="ed-footer-wordmark">ADMAKI<span>®</span></a><div><span>CREATIVE THINKING. TECHNICAL EXECUTION.</span><a href="#home">BACK TO TOP ↑</a></div></div>
        </div>
      </section>
    </main>
  );
}
