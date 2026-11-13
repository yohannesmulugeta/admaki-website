import Link from 'next/link';
import { businessGuideTopics } from '@/data/businessGuide';
import JsonLd from './JsonLd';
import '../../app/services.css';
const path = '/guides/digital-tools-for-ethiopian-businesses';
export default function BusinessGuide({ am = false }: { am?: boolean }) {
 const title = am ? 'ለኢትዮጵያ ንግዶች ጠቃሚ ዲጂታል መሣሪያዎች' : 'Digital tools for Ethiopian businesses: practical questions before you start';
 return <main className="service-page" lang={am ? 'am' : 'en'}>
  <JsonLd data={{ '@context':'https://schema.org', '@type':'Article', headline:title, inLanguage:am?'am':'en', url:`https://admakidigital.com${am?'/am':''}${path}`, author:{'@id':'https://admakidigital.com/#organization'} }} />
  <nav aria-label={am?'መምሪያ':'Guide navigation'}><Link href="/">ADMAKI Digital</Link><Link href="/services">{am?'አገልግሎቶች':'Services'}</Link><Link href={am?path:`/am${path}`} hrefLang={am?'en':'am'} lang={am?'en':'am'}>{am?'Read in English':'በአማርኛ ያንብቡ'}</Link></nav>
  <header><p className="service-kicker">ADMAKI DIGITAL · ETHIOPIA</p><h1>{title}</h1><p className="service-intro">{am?'ለንግድዎ ተስማሚ ዲጂታል አገልግሎት ለመምረጥ የሚረዱ ግልጽ መልሶች። ናሙናዎችን ይመልከቱ፣ ዝግጅት ያድርጉ፣ ከመጀመርዎም በፊት የሥራውን ወሰን ይወስኑ።':'Clear answers about NFC cards, QR menus, websites, social media content and custom software. Explore real examples and agree the scope and support before you start.'}</p></header>
  {businessGuideTopics.map(t=><section key={t.slug}><h2>{am?t.am:t.en}</h2><p>{am?t.amBody:t.enBody}</p><h3>{am?'ምን ላዘጋጅ?':'What should I prepare?'}</h3><p>{am?t.amPrepare:t.enPrepare}</p><p><a href={t.demo}>{am?t.demoAm:t.demoEn} ↗</a></p><Link href={`/services/${t.slug}`}>{am?'የአገልግሎቱን ዝርዝር በእንግሊዝኛ ይመልከቱ':'Explore this ADMAKI service'} ↗</Link></section>)}
  <footer><h2>{am?'ስለ ንግድዎ እንወያይ':'Discuss your business needs'}</h2><p>{am?'ምን ማሻሻል እንደሚፈልጉ ያጋሩን። የሥራውን ወሰን፣ ዋጋ፣ የጊዜ ሰሌዳና የድጋፍ ሁኔታዎች አብረን እንወስናለን።':'Tell us what you want to improve. Scope, quotation, timing and support arrangements are agreed for your project.'}</p><a href="https://wa.me/251937928215">{am?'በWhatsApp ያግኙን':'Contact ADMAKI on WhatsApp'} ↗</a><a href="mailto:sales@admakidigital.com">sales@admakidigital.com</a></footer>
 </main>;
}
