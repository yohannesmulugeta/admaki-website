export type CaseStudy = {
  slug: string; name: string; sector: string; discipline: string; role: string;
  summary: string; challenge: string; approach: string; delivered: string[];
  outcome: string; cover: string; links: { label: string; href: string }[];
  note?: string;
};
export const caseStudies: CaseStudy[] = [
  { slug:'universal-electronics', name:'Universal Electronics', sector:'Solar, electronics & professional audio', discipline:'Creative campaigns / web / digital marketing', role:'Multi-disciplinary project contribution and campaign leadership',
    summary:'Building a stronger digital presence for a specialized solar, electronics and audio business.',
    challenge:'Make technical product information accessible and interesting to a wider audience without losing commercial relevance.',
    approach:'Combine product education, short-form storytelling and coordinated digital presentation to connect technical products with everyday customer needs.',
    delivered:['Digital content strategy and short-form campaign work','Product education and creative video campaigns','Website and product-focused digital presentation'],
    outcome:'The Universal Electronics account grew from approximately 1,000 to 100,000 followers during the engagement, as reported by the project lead. Reporting dates and supporting analytics are not included here.',
    cover:'/images/covers/universal.webp',
    links:[{label:'Visit website',href:'https://universalelectronicet.com/'},{label:'View campaign collection',href:'/social'}],
    note:'Audience-growth figures are client/project-lead reported and are not independently audited.' },
  { slug:'kkgt', name:'KKGT Import & Export', sector:'Agriculture, agrochemicals & coffee trade', discipline:'Digital marketing / web / storytelling', role:'Project lead',
    summary:'Communicating a specialized agricultural and coffee-export business across campaigns and corporate websites.',
    challenge:'Present different areas of a specialist trading business clearly to both domestic and international audiences.',
    approach:'Develop sector-specific content and separate digital destinations that make offerings easier to discover and understand.',
    delivered:['Agrochemical educational and brand campaigns','Coffee origins and export-facing website','Corporate import-export website and digital content direction'],
    outcome:'Delivered a coordinated portfolio of campaign content and digital destinations. No campaign performance figures are claimed here.',
    cover:'/images/covers/kkgt-coffee.webp',
    links:[{label:'Coffee website',href:'https://kkgtcoffee.com/'},{label:'Import & Export website',href:'https://kkgtimportexport.com/'}] },
  { slug:'hayked-warehouse-erp', name:'Hayked Coffee Warehouse ERP', sector:'Coffee warehousing & processing', discipline:'Business software / workflow design', role:'Project lead',
    summary:'A workflow-oriented system for third-party coffee custody, goods receipt and lot-level traceability.',
    challenge:'Warehouse teams must distinguish stock owners, processing stages, movements and dispatch permissions in one coherent operational record.',
    approach:'Design the warehouse process around controlled goods receipts, traceable lots, processing records and warehouse-specific documents.',
    delivered:['Goods receipt and lot-tracking flows','Client custody and stock movement history','Processing workflows and printable warehouse records'],
    outcome:'Warehouse workflow and application functionality are documented; no independently measured time or cost savings are claimed.',
    cover:'/images/projects/hayked-coffee-warehouse-erp.webp',
    links:[{label:'Technical ERP case study',href:'/work/hayked-coffee-warehouse-erp'}],
    note:'Operational capabilities are showcased as implemented work, not independently verified deployment outcomes.' },
  { slug:'sibu-trading', name:'Sibu Trading PLC', sector:'Specialty coffee & export', discipline:'Website / brand storytelling', role:'Project lead',
    summary:'A digital presentation of Ethiopian coffee, trading operations and a multi-generation family story.',
    challenge:'Translate a heritage-led company narrative into a contemporary website that remains useful to business visitors.',
    approach:'Use a premium editorial layout and visual storytelling alongside practical corporate and coffee-export information.',
    delivered:['Corporate website structure and presentation','Family heritage visual narrative','Responsive digital experience'],
    outcome:'Published website and completed digital presentation; business conversion metrics are not claimed.',
    cover:'/images/covers/sibu.webp',
    links:[{label:'Visit website',href:'https://sibutradingplc.com/'}] },
  { slug:'maison-debrah', name:'Maison Debrah Ethiopia', sector:'Luxury furniture & interiors', discipline:'Website / luxury digital experience', role:'Project lead',
    summary:'An elegant, image-forward digital home for a luxury interiors business.',
    challenge:'Represent premium furniture and interior products with the visual quality expected by a design-conscious audience.',
    approach:'Prioritize editorial composition, polished imagery and an intuitive browsing experience.',
    delivered:['Luxury visual direction','Responsive website and product presentation','Published branded web experience'],
    outcome:'Website delivered and launched, as confirmed by the project lead. No sales or traffic figures are claimed.',
    cover:'/images/covers/maison-debrah.webp',
    links:[{label:'Visit website',href:'https://maisondebrah-et.com/'}] }
];
export const getCaseStudy = (slug:string)=>caseStudies.find(item=>item.slug===slug);
