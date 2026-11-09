import Link from 'next/link';
import Image from 'next/image';
import { caseStudies } from '@/data/caseStudies';
import { withBasePath } from '@/lib/siteConfig';
export default function FeaturedCaseStudies() {
 return <section id="featured-case-studies" style={{background:'#efeee8',color:'#1a1b19',padding:'clamp(70px,9vw,145px) 0'}}>
 <div className="ed-wrap">
 <div style={{borderTop:'1px solid #bbb',paddingTop:24,marginBottom:44}}>
 <span className="ed-kicker">SELECTED CASE STUDIES / 2026</span>
 <h2 style={{fontSize:'clamp(42px,7vw,96px)',lineHeight:'.97',letterSpacing:'-.07em',fontWeight:650,margin:'24px 0'}}>The work. <em>The thinking behind it.</em></h2>
 <p style={{maxWidth:720,fontSize:'clamp(16px,2vw,21px)',lineHeight:1.5}}>Five closer looks at creative campaigns, websites and business systems — from the challenge to the work delivered.</p>
 </div>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))',gap:28}}>
 {caseStudies.map((item,index)=><Link key={item.slug} href={`/case-studies/${item.slug}`} style={{display:'block',textDecoration:'none',color:'inherit',borderTop:'1px solid #b5b4ae',paddingTop:14}}>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:11,letterSpacing:'.12em',marginBottom:15}}><span>{String(index+1).padStart(2,'0')} / {item.sector.toUpperCase()}</span><span>↗</span></div>
 <div style={{position:'relative',width:'100%',aspectRatio:'1.55',overflow:'hidden',background:'#d4d2cc'}}><Image src={withBasePath(item.cover)} alt={item.name+' website or product screenshot'} fill sizes="(max-width:700px) 100vw, 40vw" style={{objectFit:'cover',objectPosition:'top'}} unoptimized /></div>
 <h3 style={{fontSize:'clamp(25px,3vw,36px)',letterSpacing:'-.055em',margin:'18px 0 8px',fontWeight:650}}>{item.name}</h3>
 <p style={{fontSize:14,lineHeight:1.5,color:'#50514d'}}>{item.summary}</p>
 <p style={{fontSize:12,marginTop:14,fontWeight:700}}>READ CASE STUDY ↗</p>
 </Link>)}
 </div></div></section>;
}