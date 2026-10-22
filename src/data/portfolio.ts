/**
 * ADMAKI portfolio — edit this file to maintain project cards.
 *
 * Only use real, client-approved work. A repository or deployment URL does
 * not prove client acceptance or commercial launch. "Concept" entries are
 * labelled as such. Add screenshots only after reviewing image permissions.
 */
export type WorkCategory = 'Websites' | 'Business systems';
export type WorkStatus = 'Website' | 'Product' | 'Concept';
export type WorkTheme = 'coffee' | 'trade' | 'electric' | 'fitness' | 'food' | 'health' | 'hotel' | 'gallery' | 'furniture' | 'software';

export type WorkProject = {
  id: string;
  title: string;
  eyebrow: string;
  category: WorkCategory;
  status: WorkStatus;
  description: string;
  theme: WorkTheme;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  screenshot?: string; // use /images/projects/your-file.webp; optional
  featured?: boolean;
};

const git = 'https://github.com/yohannesmulugeta/';

export const workProjects: WorkProject[] = [
  {
    id: 'kkgt-coffee', title: 'KKGT Coffee', eyebrow: 'Coffee export / Corporate',
    category: 'Websites', status: 'Website', theme: 'coffee', featured: true,
    description: 'An editorial website for Ethiopian coffee origins, quality and buyer discovery.',
    liveUrl: 'https://kkgtcoffee.com/', repoUrl: git + 'KKGTCOFFEEwebsite',
  },
  {
    id: 'universal', title: 'Universal Electronics', eyebrow: 'Solar / Electronics',
    category: 'Websites', status: 'Website', theme: 'electric', featured: true,
    description: 'A product-focused destination for solar, electronics and sound solutions.',
    liveUrl: 'https://universalelectronicet.com/', repoUrl: git + 'universalelectronics',
  },
  {
    id: 'kkgt-trade', title: 'KKGT Import & Export', eyebrow: 'Import / Export',
    category: 'Websites', status: 'Website', theme: 'trade', featured: true,
    description: 'A structured commercial website connecting agriculture, commodities and trade.',
    liveUrl: 'https://kkgtimportexport.com/', repoUrl: git + 'KKGTIMPORTEXPORT',
  },
  {
    id: 'sibu', title: 'Sibu Trading PLC', eyebrow: 'Coffee / Export',
    category: 'Websites', status: 'Website', theme: 'coffee',
    description: 'An origin-led presentation of Ethiopian coffee and trading operations.',
    liveUrl: 'https://yohannesmulugeta.github.io/SIBU-TRADING-PLC/',
    repoUrl: git + 'SIBU-TRADING-PLC',
  },
  {
    id: 'gurshamenu', title: 'GurshaMenu', eyebrow: 'Restaurant technology',
    category: 'Websites', status: 'Product', theme: 'food', featured: true,
    description: 'A QR-menu product website built to make restaurant menus easier to update.',
    liveUrl: 'https://yohannesmulugeta.github.io/gurshamenu/',
    repoUrl: git + 'gurshamenu',
  },
  {
    id: 'getfit', title: 'Get Fit with JO', eyebrow: 'Fitness / Coaching',
    category: 'Websites', status: 'Website', theme: 'fitness',
    description: 'A mobile-first coaching experience focused on programs and consultation.',
    liveUrl: 'https://yohannesmulugeta.github.io/GET-FIT-WITH-JO/',
    repoUrl: git + 'GET-FIT-WITH-JO',
  },
  {
    id: 'orbit', title: 'Orbit Health Solutions', eyebrow: 'Healthcare / B2B',
    category: 'Websites', status: 'Website', theme: 'health',
    description: 'An editorial redesign for a health-technology solutions provider.',
    liveUrl: 'https://yohannesmulugeta.github.io/orbiths/',
    repoUrl: git + 'orbiths',
  },
  {
    id: 'lobelia', title: 'Hotel Lobelia', eyebrow: 'Hospitality / Concept',
    category: 'Websites', status: 'Concept', theme: 'hotel',
    description: 'A cinematic hotel-website concept exploring a richer arrival experience.',
    liveUrl: 'https://yohannesmulugeta.github.io/Hotel-Lobelia/',
    repoUrl: git + 'Hotel-Lobelia',
  },
  {
    id: 'koffera', title: 'Koffera Coffee', eyebrow: 'Coffee / Concept',
    category: 'Websites', status: 'Concept', theme: 'coffee',
    description: 'A modern coffee-export presentation with animated, responsive storytelling.',
    liveUrl: 'https://yohannesmulugeta.github.io/koffera-coffee/',
    repoUrl: git + 'koffera-coffee',
  },
  {
    id: 'ephrem', title: 'Ephrem Art', eyebrow: 'Artist portfolio / Concept',
    category: 'Websites', status: 'Concept', theme: 'gallery',
    description: 'A contemporary gallery-style artist portfolio exploring artwork and biography.',
    repoUrl: git + 'ephremart',
  },
  {
    id: 'bethager', title: 'Bethager Furniture', eyebrow: 'Furniture / Demo',
    category: 'Websites', status: 'Concept', theme: 'furniture',
    description: 'A furniture-showroom demonstration with an image-led shopping aesthetic.',
    repoUrl: git + 'bethager-furniture',
  },
  {
    id: 'hayked', title: 'Hayked Coffee Warehouse ERP', eyebrow: 'Warehouse / ERP',
    category: 'Business systems', status: 'Product', theme: 'software', featured: true,
    description: 'Warehouse receipts, client custody, lot traceability and stock workflows in one system.',
    caseStudyUrl: '/work/hayked-coffee-warehouse-erp',
    repoUrl: git + 'hayked-coffee-warehouse-erp',
    screenshot: '/images/projects/hayked-coffee-warehouse-erp.webp',
  },
  {
    id: 'beanledger', title: 'BeanLedger', eyebrow: 'Coffee export / ERP',
    category: 'Business systems', status: 'Product', theme: 'software', featured: true,
    description: 'Connecting coffee purchases, processing, stock, bags and export operations.',
    caseStudyUrl: '/work/beanledger',
    repoUrl: git + 'Bean-Ledger-',
    screenshot: '/images/projects/beanledger-coffee-export-erp.webp',
  },
];

/**
 * Social media portfolio. Add real, approved TikTok / Instagram / Facebook
 * and campaign links here after you have published the work. Empty strings
 * intentionally render non-clickable "Link to be added" placeholders.
 */
export type SocialBrand = {
  id: string;
  name: string;
  sector: string;
  summary: string;
  deliverables: string[];
  accent: string;
  channels: { label: string; url: string }[];
};

export const socialBrands: SocialBrand[] = [
  {
    id: 'universal-social', name: 'Universal Electronics', sector: 'Solar · Electronics · Sound',
    summary: 'Product education, video campaigns and creative communication for energy and electronics.',
    deliverables: ['Creative direction', 'Product videos', 'Campaign content'],
    accent: '#2758f3',
    channels: [{ label: 'TikTok', url: '' }, { label: 'Instagram', url: '' }, { label: 'Facebook', url: '' }],
  },
  {
    id: 'kkgt-social', name: 'KKGT', sector: 'Agriculture · Coffee · Trade',
    summary: 'Digital storytelling, product awareness and educational content for Ethiopian agriculture and trade.',
    deliverables: ['Content planning', 'Social videos', 'Educational posts'],
    accent: '#6e7e4c',
    channels: [{ label: 'TikTok', url: '' }, { label: 'Facebook', url: '' }, { label: 'Campaign work', url: '' }],
  },
  {
    id: 'finder-social', name: 'Finder Tools Ethiopia', sector: 'Power tools · Workshop equipment',
    summary: 'Practical tool demonstrations and short-form campaign concepts made for professional audiences.',
    deliverables: ['Content concepts', 'Video scripts', 'Product demonstrations'],
    accent: '#ec6a2c',
    channels: [{ label: 'TikTok', url: '' }, { label: 'Instagram', url: '' }, { label: 'Campaign work', url: '' }],
  },
];
