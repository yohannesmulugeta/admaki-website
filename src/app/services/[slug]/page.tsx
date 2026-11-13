import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicePages } from '@/data/services';
import JsonLd from '@/components/seo/JsonLd';
import ServiceShell from '@/components/services/ServiceShell';
import ServiceArtwork, { servicePresentation } from '@/components/services/ServiceArtwork';
export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = servicePages.find(s => s.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.intro, alternates: { canonical: `/services/${slug}` }, openGraph: { title: service.name, description: service.intro, url: `/services/${slug}` } };
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = servicePages.find(s => s.slug === slug);
  if (!service) notFound();
  const url = `https://admakidigital.com/services/${slug}`;
  const presentation = servicePresentation.find(s => s.slug === slug)!;
  return <ServiceShell><main id="main-content">
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: service.name, description: service.intro, url, provider: { '@id': 'https://admakidigital.com/#organization' }, areaServed: { '@type': 'Country', name: 'Ethiopia' } }} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: service.questions.map(([q,a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
    <section className="svc-detail-hero svc-wrap"><div><nav className="svc-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services">Services</Link></nav><p className="svc-eyebrow">{presentation.label} / ETHIOPIA</p><h1>{service.name}</h1><p>{service.intro}</p><div className="svc-actions"><a className="svc-button svc-button-blue" href={`https://wa.me/251937928215?text=${encodeURIComponent(`Hello ADMAKI, I would like to discuss ${service.short}.`)}`}>Discuss your project ↗</a><Link className="svc-button svc-button-outline" href="/services#demonstrations">Try the products ↗</Link></div></div><ServiceArtwork kind={presentation.kind} /></section>
    <section className="svc-detail-section svc-wrap"><h2>What we can<br />help with.</h2><ul className="svc-capabilities">{service.features.map((f,i) => <li key={f}><span>0{i+1}</span>{f}</li>)}</ul></section>
    <section className="svc-detail-section svc-wrap"><h2>See the work.<br />Explore the thinking.</h2><div className="svc-project-note"><p>{service.example}</p><a className="svc-text-link" href={service.link}>{service.linkText} ↗</a></div></section>
    <section className="svc-detail-section svc-wrap"><h2>Questions before<br />you start.</h2><div className="svc-faq">{service.questions.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="svc-detail-section svc-wrap"><h2>Clear scope.<br />Practical delivery.</h2><div className="svc-detail-end"><p>We begin with your goals, agree the scope and responsibilities, then design, build and review the work. Hosting, third-party services, maintenance and delivery arrangements are confirmed in your proposal.</p><p>Call or WhatsApp <a href="tel:+251937928215">+251 93 792 8215</a> · <a href="mailto:sales@admakidigital.com">sales@admakidigital.com</a></p><Link className="svc-text-link" href="/guides/choosing-a-digital-partner-in-ethiopia">How to choose a digital partner ↗</Link></div></section>
    <section className="svc-detail-section svc-wrap"><h2>Connected services.</h2><div className="svc-related-links">{servicePages.filter(s => s.slug !== slug).map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.short} ↗</Link>)}</div></section>
  </main></ServiceShell>;
}
