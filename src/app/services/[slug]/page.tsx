import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicePages } from '@/data/services';
import JsonLd from '@/components/seo/JsonLd';
import '../../services.css';
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
  return <main className="service-page">
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: service.name, description: service.intro, url, provider: { '@id': 'https://admakidigital.com/#organization' }, areaServed: { '@type': 'Country', name: 'Ethiopia' } }} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: service.questions.map(([q,a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }} />
    <nav aria-label="Service navigation"><Link href="/">ADMAKI Digital</Link><Link href="/services">All services</Link><Link href="/work">Selected work</Link></nav>
    <header><p className="service-kicker">ADDIS ABABA · ETHIOPIA</p><h1>{service.name}</h1><p className="service-intro">{service.intro}</p><a className="service-cta" href={`https://wa.me/251937928215?text=${encodeURIComponent(`Hello ADMAKI, I would like to discuss ${service.short}.`)}`}>Discuss your project ↗</a></header>
    <section><h2>What we can help with</h2><ul>{service.features.map(f => <li key={f}>{f}</li>)}</ul></section>
    <section><h2>See the work</h2><p>{service.example}</p><a href={service.link}>{service.linkText} ↗</a></section>
    <section><h2>Questions before you start</h2>{service.questions.map(([q,a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</section>
    <section><h2>Clear scope. Practical delivery.</h2><p>We begin with your goals, agree the scope and responsibilities, then design, build and review the work. Hosting, third-party services, maintenance and delivery arrangements are confirmed in your proposal.</p><p>Call or WhatsApp <a href="tel:+251937928215">+251 93 792 8215</a> · <a href="mailto:sales@admakidigital.com">sales@admakidigital.com</a></p></section>
    <footer><h2>Related services</h2>{servicePages.filter(s => s.slug !== slug).map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.short} ↗</Link>)}<Link href="/guides/choosing-a-digital-partner-in-ethiopia">How to choose a digital partner</Link></footer>
  </main>;
}
