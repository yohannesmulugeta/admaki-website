import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/data/caseStudies';
import { withBasePath } from '@/lib/siteConfig';
import Footer from '@/components/layout/Footer';
import './case-study.css';

type Props = { params: Promise<{slug:string}> };
export function generateStaticParams(){ return caseStudies.map(x=>({slug:x.slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params; const item=getCaseStudy(slug);
 return item ? { title:`${item.name} — Case Study`, description:item.summary, alternates:{canonical:`/case-studies/${slug}`} } : {};
}
export default async function CaseStudyPage({params}:Props){
 const {slug}=await params;const item=getCaseStudy(slug);if(!item)notFound();
 return <div className="ad-case">
  <header className="ad-case-nav"><Link href="/">ADMAKI®</Link><Link href="/#featured-case-studies">← All case studies</Link></header>
  <main>
   <section className="ad-case-hero"><p className="ad-case-kicker">CASE STUDY / {item.sector}</p><h1>{item.name}</h1><p className="ad-case-lead">{item.summary}</p>
    <div className="ad-case-meta"><span><small>ROLE</small>{item.role}</span><span><small>CAPABILITY</small>{item.discipline}</span></div>
   </section>
   <section className="ad-case-cover"><Image src={withBasePath(item.cover)} alt={item.name+' project screenshot'} width={1440} height={900} unoptimized priority /></section>
   <section className="ad-case-content"><article><span>01 / THE CHALLENGE</span><h2>Understanding the problem.</h2><p>{item.challenge}</p></article><article><span>02 / THE APPROACH</span><h2>Making the right solution.</h2><p>{item.approach}</p></article>
    <article><span>03 / DELIVERED WORK</span><h2>What we built.</h2><ul>{item.delivered.map(x=><li key={x}>{x}</li>)}</ul></article>
    <article><span>04 / OUTCOME</span><h2>What we can show.</h2><p>{item.outcome}</p>{item.note&&<p className="ad-case-note">{item.note}</p>}</article>
   </section>
   <section className="ad-case-actions"><p>Explore the work</p><div>{item.links.map(l=>l.href.startsWith('/')?<Link key={l.href} href={l.href}>{l.label} ↗</Link>:<a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}</div></section>
   <section className="ad-case-next"><h2>More selected work.</h2><div>{caseStudies.filter(x=>x.slug!==slug).slice(0,3).map(x=><Link key={x.slug} href={`/case-studies/${x.slug}`}>{x.name} <span>↗</span></Link>)}</div></section>
  </main><Footer />
 </div>;
}
