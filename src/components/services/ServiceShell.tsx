import Link from 'next/link';
import BrandLogo from '@/components/ui/BrandLogo';
import '../../app/services-hub.css';

export default function ServiceShell({ children }: { children: React.ReactNode }) {
  return <div className="svc-site">
    <a className="svc-skip" href="#main-content">Skip to content</a>
    <header className="svc-header"><div className="svc-wrap svc-nav">
      <Link className="svc-logo" href="/" aria-label="ADMAKI Digital home"><BrandLogo /></Link>
      <nav className="svc-desktop-nav" aria-label="Main navigation"><Link href="/work">Selected work</Link><Link href="/services">Services</Link><Link href="/services#demonstrations">Try a demo</Link></nav>
      <a className="svc-button svc-button-dark svc-header-cta" href="https://wa.me/251937928215">Start a project <span aria-hidden="true">↗</span></a>
      <details className="svc-mobile-nav"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation"><Link href="/">Home</Link><Link href="/work">Selected work</Link><Link href="/services">Services</Link><Link href="/services#demonstrations">Try a demo</Link><a href="https://wa.me/251937928215">Start a project ↗</a></nav></details>
    </div></header>
    {children}
    <footer className="svc-footer"><div className="svc-wrap"><div className="svc-footer-top"><Link href="/" className="svc-logo"><BrandLogo /></Link><p>Connected creativity.<br />Practical technology.</p><div><a href="mailto:hello@admakidigital.com">hello@admakidigital.com</a><a href="tel:+251937928215">+251 93 792 8215</a></div></div><div className="svc-footer-bottom"><span>ADMAKI Digital · Addis Ababa, Ethiopia</span><Link href="/guides/digital-tools-for-ethiopian-businesses">Business guides</Link><Link href="/am/guides/digital-tools-for-ethiopian-businesses" lang="am">በአማርኛ ያንብቡ ↗</Link><a href="#main-content">Back to top ↑</a></div></div></footer>
  </div>;
}
