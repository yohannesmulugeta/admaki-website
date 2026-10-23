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
  screenshot?: string; // /images/covers/<id>.jpg compressed WebP captured from the actual website homepage
  featured?: boolean;
};

const git = 'https://github.com/yohannesmulugeta/';

export const workProjects: WorkProject[] = [
  {
    id: 'kkgt-coffee', title: 'KKGT Coffee', eyebrow: 'Coffee export / Corporate',
    category: 'Websites', status: 'Website', theme: 'coffee', featured: true,
    description: 'An editorial website for Ethiopian coffee origins, quality and buyer discovery.',
    liveUrl: 'https://kkgtcoffee.com/', repoUrl: git + 'KKGTCOFFEEwebsite',
    screenshot: '/images/covers/kkgt-coffee.webp',
  },
  {
    id: 'universal', title: 'Universal Electronics', eyebrow: 'Solar / Electronics',
    category: 'Websites', status: 'Website', theme: 'electric', featured: true,
    description: 'A product-focused destination for solar, electronics and sound solutions.',
    liveUrl: 'https://universalelectronicet.com/', repoUrl: git + 'universalelectronics',
    screenshot: '/images/covers/universal.webp',
  },
  {
    id: 'kkgt-trade', title: 'KKGT Import & Export', eyebrow: 'Import / Export',
    category: 'Websites', status: 'Website', theme: 'trade', featured: true,
    description: 'A structured commercial website connecting agriculture, commodities and trade.',
    liveUrl: 'https://kkgtimportexport.com/', repoUrl: git + 'KKGTIMPORTEXPORT',
    screenshot: '/images/covers/kkgt-trade.webp',
  },
  {
    id: 'sibu', title: 'Sibu Trading PLC', eyebrow: 'Coffee / Export',
    category: 'Websites', status: 'Website', theme: 'coffee',
    description: 'An origin-led presentation of Ethiopian coffee and trading operations.',
    liveUrl: 'https://yohannesmulugeta.github.io/SIBU-TRADING-PLC/',
    repoUrl: git + 'SIBU-TRADING-PLC',
    screenshot: '/images/covers/sibu.webp',
  },
  {
    id: 'gurshamenu', title: 'GurshaMenu', eyebrow: 'Restaurant technology',
    category: 'Websites', status: 'Product', theme: 'food', featured: true,
    description: 'A QR-menu product website built to make restaurant menus easier to update.',
    liveUrl: 'https://yohannesmulugeta.github.io/gurshamenu/',
    repoUrl: git + 'gurshamenu',
    screenshot: '/images/covers/gurshamenu.webp',
  },
  {
    id: 'getfit', title: 'Get Fit with JO', eyebrow: 'Fitness / Coaching',
    category: 'Websites', status: 'Website', theme: 'fitness',
    description: 'A mobile-first coaching experience focused on programs and consultation.',
    liveUrl: 'https://yohannesmulugeta.github.io/GET-FIT-WITH-JO/',
    repoUrl: git + 'GET-FIT-WITH-JO',
    screenshot: '/images/covers/getfit.webp',
  },
  {
    id: 'orbit', title: 'Orbit Health Solutions', eyebrow: 'Healthcare / B2B',
    category: 'Websites', status: 'Website', theme: 'health',
    description: 'An editorial redesign for a health-technology solutions provider.',
    liveUrl: 'https://yohannesmulugeta.github.io/orbiths/',
    repoUrl: git + 'orbiths',
    screenshot: '/images/covers/orbit.webp',
  },
  {
    id: 'lobelia', title: 'Hotel Lobelia', eyebrow: 'Hospitality / Concept',
    category: 'Websites', status: 'Concept', theme: 'hotel',
    description: 'A cinematic hotel-website concept exploring a richer arrival experience.',
    liveUrl: 'https://yohannesmulugeta.github.io/Hotel-Lobelia/',
    repoUrl: git + 'Hotel-Lobelia',
    screenshot: '/images/covers/lobelia.webp',
  },
  {
    id: 'koffera', title: 'Koffera Coffee', eyebrow: 'Coffee / Concept',
    category: 'Websites', status: 'Concept', theme: 'coffee',
    description: 'A modern coffee-export presentation with animated, responsive storytelling.',
    // Temporarily hide live link: homepage currently displays a website error.
    repoUrl: git + 'koffera-coffee',
  },
  {
    id: 'ephrem', title: 'Ephrem Art', eyebrow: 'Artist portfolio / Concept',
    category: 'Websites', status: 'Concept', theme: 'gallery',
    liveUrl: 'https://yohannesmulugeta.github.io/ephremart/',
    description: 'A contemporary gallery-style artist portfolio exploring artwork and biography.',
    repoUrl: git + 'ephremart',
    screenshot: '/images/covers/ephrem.webp',
  },
  {
    id: 'bethager', title: 'Bethager Furniture', eyebrow: 'Furniture / Demo',
    category: 'Websites', status: 'Concept', theme: 'furniture',
    liveUrl: 'https://yohannesmulugeta.github.io/bethager-furniture/',
    description: 'A furniture-showroom demonstration with an image-led shopping aesthetic.',
    repoUrl: git + 'bethager-furniture',
    screenshot: '/images/covers/bethager.webp',
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
 * Nine selected, published TikTok posts. Keep creator attribution for content
 * uploaded by collaborators (e.g. Kebrom Neguse). The optional poster path can
 * be filled with an approved still at any time; no TikTok embeds load upfront.
 */
export type SocialVideo = {
  id: string;
  url: string;
  creator: string;
  label: string;
  poster?: string;
};

export type SocialBrand = {
  id: string;
  name: string;
  shortName: string;
  sector: string;
  summary: string;
  accent: string;
  accentContrast: string;
  profileUrl: string;
  videos: [SocialVideo, SocialVideo, SocialVideo];
};

export const socialBrands: SocialBrand[] = [
  {
    id: 'universal-social',
    name: 'Universal Electronics',
    shortName: 'UNIVERSAL',
    sector: 'Solar · Electronics · Sound',
    summary: 'Creative campaigns, product education and brand storytelling for energy and electronics.',
    accent: '#2b4db4',
    accentContrast: '#e5ecff',
    profileUrl: 'https://www.tiktok.com/@universal_electronics',
    videos: [
      { id: '7697672470446345504', url: 'https://www.tiktok.com/@kebromneguseofficial/video/7697672470446345504', creator: '@kebromneguseofficial', label: 'Athlete collaboration' },
      { id: '7684533828672670994', url: 'https://www.tiktok.com/@universal_electronics/video/7684533828672670994', creator: '@universal_electronics', label: 'Campaign video 02' },
      { id: '7618627966997695751', url: 'https://www.tiktok.com/@universal_electronics/video/7618627966997695751', creator: '@universal_electronics', label: 'Campaign video 03' },
    ],
  },
  {
    id: 'kkgt-social',
    name: 'KKGT Import & Export',
    shortName: 'KKGT',
    sector: 'Agriculture · Coffee · Trade',
    summary: 'Brand-led stories and social campaigns bringing Ethiopian agriculture and trade to life.',
    accent: '#395642',
    accentContrast: '#ebefdb',
    profileUrl: 'https://www.tiktok.com/@kkgtimport_export',
    videos: [
      { id: '7687193464877960481', url: 'https://www.tiktok.com/@kkgtimport_export/video/7687193464877960481', creator: '@kkgtimport_export', label: 'Campaign video 01' },
      { id: '7682077657965612320', url: 'https://www.tiktok.com/@kkgtimport_export/video/7682077657965612320', creator: '@kkgtimport_export', label: 'Campaign video 02' },
      { id: '7677607760153922849', url: 'https://www.tiktok.com/@kkgtimport_export/video/7677607760153922849', creator: '@kkgtimport_export', label: 'Campaign video 03' },
    ],
  },
  {
    id: 'finder-social',
    name: 'Finder Tools Ethiopia',
    shortName: 'FINDER',
    sector: 'Power tools · Workshop equipment',
    summary: 'Short-form product demonstrations and practical creative campaigns for professional tools.',
    accent: '#ca5c27',
    accentContrast: '#fff0dc',
    profileUrl: 'https://www.tiktok.com/@findertoolsethiopia',
    videos: [
      { id: '7698043236140633352', url: 'https://www.tiktok.com/@findertoolsethiopia/video/7698043236140633352', creator: '@findertoolsethiopia', label: 'Campaign video 01' },
      { id: '7698782478424706311', url: 'https://www.tiktok.com/@findertoolsethiopia/video/7698782478424706311', creator: '@findertoolsethiopia', label: 'Campaign video 02' },
      { id: '7699520885266369800', url: 'https://www.tiktok.com/@findertoolsethiopia/video/7699520885266369800', creator: '@findertoolsethiopia', label: 'Campaign video 03' },
    ],
  },
];
