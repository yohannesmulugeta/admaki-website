/**
 * ADMAKI portfolio — edit this file to maintain project cards.
 *
 * Only use real, client-approved work. A repository or deployment URL does
 * not prove client acceptance or commercial launch. "Concept" entries are
 * labelled as such. Add screenshots only after reviewing image permissions.
 */
export type WorkCategory = 'Websites' | 'Business systems';
export type WorkStatus = 'Website' | 'Product' | 'Concept' | 'Preview';
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
  caseStudyUrl?: string;
  screenshot?: string; // /images/covers/<id>.webp — actual homepage screenshot, not stock art
  featured?: boolean;
};

export const workProjects: WorkProject[] = [
  {
    id: 'kkgt-coffee', title: 'KKGT Coffee', eyebrow: 'Coffee export / Corporate',
    category: 'Websites', status: 'Website', theme: 'coffee', featured: true,
    description: 'An editorial website for Ethiopian coffee origins, quality and buyer discovery.',
    liveUrl: 'https://kkgtcoffee.com/', 
    screenshot: '/images/covers/kkgt-coffee.webp',
  },
  {
    id: 'universal', title: 'Universal Electronics', eyebrow: 'Solar / Electronics',
    category: 'Websites', status: 'Website', theme: 'electric', featured: true,
    description: 'A product-focused destination for solar, electronics and sound solutions.',
    liveUrl: 'https://universalelectronicet.com/', 
    screenshot: '/images/covers/universal.webp',
  },
  {
    id: 'kkgt-trade', title: 'KKGT Import & Export', eyebrow: 'Import / Export',
    category: 'Websites', status: 'Website', theme: 'trade', featured: true,
    description: 'A structured commercial website connecting agriculture, commodities and trade.',
    liveUrl: 'https://kkgtimportexport.com/', 
    screenshot: '/images/covers/kkgt-trade.webp',
  },
  {
    id: 'sibu', title: 'Sibu Trading PLC', eyebrow: 'Coffee / Export',
    category: 'Websites', status: 'Website', theme: 'coffee',
    description: 'An origin-led presentation of Ethiopian coffee and trading operations.',
    liveUrl: 'https://sibutradingplc.com/',
    
    screenshot: '/images/covers/sibu.webp',
  },
  {
    id: 'enkupanet', title: 'Enkupanet Agro Trading', eyebrow: 'Agriculture / Global trade',
    category: 'Websites', status: 'Website', theme: 'trade', featured: true,
    description: 'A bilingual corporate and product website for Ethiopian agricultural export products.',
    liveUrl: 'https://enkupanetagrotrading.com/',
    
    screenshot: '/images/covers/enkupanet.webp',
  },
  {
    id: 'hayked-trading', title: 'Hayked General Trading', eyebrow: 'Coffee / Corporate preview',
    category: 'Websites', status: 'Preview', theme: 'coffee',
    description: 'A coffee export and processing website preview, with origin and warehouse services.',
    // The custom domain currently returns an HTTP error. Show the working
    // GitHub Pages preview until deployment is repaired and verified.
    liveUrl: 'https://yohannesmulugeta.github.io/hayked-trading/',
    
    screenshot: '/images/covers/hayked-trading.webp',
  },
  {
    id: 'gurshamenu', title: 'ADMAKI Menu', eyebrow: 'Restaurant technology',
    category: 'Websites', status: 'Product', theme: 'food', featured: true,
    description: 'A QR-menu product website built to make restaurant menus easier to update.',
    liveUrl: 'https://menu.admakidigital.com/',
    
    screenshot: '/brand/menu-preview.png',
  },
  {
    id: 'getfit', title: 'Get Fit with JO', eyebrow: 'Fitness / Coaching',
    category: 'Websites', status: 'Website', theme: 'fitness',
    description: 'A mobile-first coaching experience focused on programs and consultation.',
    liveUrl: 'https://yohannesmulugeta.github.io/GET-FIT-WITH-JO/',
    
    screenshot: '/images/covers/getfit.webp',
  },
  {
    id: 'orbit', title: 'Orbit Health Solutions', eyebrow: 'Healthcare / B2B',
    category: 'Websites', status: 'Website', theme: 'health',
    description: 'An editorial redesign for a health-technology solutions provider.',
    liveUrl: 'https://yohannesmulugeta.github.io/orbiths/',
    
    screenshot: '/images/covers/orbit.webp',
  },
  {
    id: 'lobelia', title: 'Hotel Lobelia', eyebrow: 'Hospitality / Concept',
    category: 'Websites', status: 'Concept', theme: 'hotel',
    description: 'A cinematic hotel-website concept exploring a richer arrival experience.',
    liveUrl: 'https://yohannesmulugeta.github.io/Hotel-Lobelia/',
    
    screenshot: '/images/covers/lobelia.webp',
  },
  {
    id: 'maison-debrah', title: 'Maison Debrah Ethiopia', eyebrow: 'Luxury interiors / Client preview',
    category: 'Websites', status: 'Preview', theme: 'furniture',
    description: 'A luxury furniture and interiors storefront preview. Client launch approval remains pending.',
    // Domain is accessible, but the website is explicitly marked as an
    // unapproved client draft in the source repository.
    liveUrl: 'https://maisondebrah-et.com/',
    
    screenshot: '/images/covers/maison-debrah.webp',
  },
  {
    id: 'koffera', title: 'Koffera Coffee', eyebrow: 'Coffee / Concept',
    category: 'Websites', status: 'Concept', theme: 'coffee',
    description: 'A modern coffee-export presentation with animated, responsive storytelling.',
    // Temporarily hide live link: homepage currently displays a website error.
    
  },
  {
    id: 'ephrem', title: 'Ephrem Art', eyebrow: 'Artist portfolio / Concept',
    category: 'Websites', status: 'Concept', theme: 'gallery',
    liveUrl: 'https://yohannesmulugeta.github.io/ephremart/',
    description: 'A contemporary gallery-style artist portfolio exploring artwork and biography.',
    
    screenshot: '/images/covers/ephrem.webp',
  },
  {
    id: 'bethager', title: 'Bethager Furniture', eyebrow: 'Furniture / Demo',
    category: 'Websites', status: 'Concept', theme: 'furniture',
    liveUrl: 'https://yohannesmulugeta.github.io/bethager-furniture/',
    description: 'A furniture-showroom demonstration with an image-led shopping aesthetic.',
    
    screenshot: '/images/covers/bethager.webp',
  },
  {
    id: 'hayked', title: 'Hayked Coffee Warehouse ERP', eyebrow: 'Warehouse / ERP',
    category: 'Business systems', status: 'Product', theme: 'software', featured: true,
    description: 'Warehouse receipts, client custody, lot traceability and stock workflows in one system.',
    caseStudyUrl: '/work/hayked-coffee-warehouse-erp',
    
    screenshot: '/images/projects/hayked-coffee-warehouse-erp.webp',
  },
  {
    id: 'beanledger', title: 'BeanLedger', eyebrow: 'Coffee export / ERP',
    category: 'Business systems', status: 'Product', theme: 'software', featured: true,
    description: 'Connecting coffee purchases, processing, stock, bags and export operations.',
    caseStudyUrl: '/work/beanledger',
    
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
  videoSrc?: string;
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
      {
        id: 'universal-01',
        url: 'https://www.tiktok.com/@kebromneguseofficial/video/7697672470446345504',
        creator: '@kebromneguseofficial',
        label: 'Athlete collaboration',
        videoSrc: '/videos/campaigns/universal/universal-01.mp4',
        poster: '/images/campaigns/universal/universal-01.jpg',
      },
      {
        id: 'universal-02',
        url: 'https://www.tiktok.com/@universal_electronics/video/7684533828672670994',
        creator: '@universal_electronics',
        label: 'Campaign video 02',
        videoSrc: '/videos/campaigns/universal/universal-02.mp4',
        poster: '/images/campaigns/universal/universal-02.jpg',
      },
      {
        id: 'universal-03',
        url: 'https://www.tiktok.com/@universal_electronics/video/7618627966997695751',
        creator: '@universal_electronics',
        label: 'Campaign video 03',
        videoSrc: '/videos/campaigns/universal/universal-03.mp4',
        poster: '/images/campaigns/universal/universal-03.jpg',
      },
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
      {
        id: 'finder-01',
        url: 'https://www.tiktok.com/@findertoolsethiopia/video/7698043236140633352',
        creator: '@findertoolsethiopia',
        label: 'Campaign video 01',
        videoSrc: '/videos/campaigns/finder/finder-01.mp4',
        poster: '/images/campaigns/finder/finder-01.jpg',
      },
      {
        id: 'finder-02',
        url: 'https://www.tiktok.com/@findertoolsethiopia/video/7698782478424706311',
        creator: '@findertoolsethiopia',
        label: 'Campaign video 02',
        videoSrc: '/videos/campaigns/finder/finder-02.mp4',
        poster: '/images/campaigns/finder/finder-02.jpg',
      },
      {
        id: 'finder-03',
        url: 'https://www.tiktok.com/@findertoolsethiopia/video/7699520885266369800',
        creator: '@findertoolsethiopia',
        label: 'Campaign video 03',
        videoSrc: '/videos/campaigns/finder/finder-03.mp4',
        poster: '/images/campaigns/finder/finder-03.jpg',
      },
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
];
