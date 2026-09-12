export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  year: string;
  clientType: string;
  description: string;
  overview: string;
  challenge: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    points: string[];
  };
  architecture: {
    title: string;
    description: string;
    highlights: string[];
  };
  technicalHighlights: string[];
  metricsOrOutcomes: {
    label: string;
    value: string;
    detail: string;
  }[];
  services: string[];
  technologies: string[];
  image: string;
  video?: string;
  href: string;
  liveUrl?: string;
};

export const projectsData: Project[] = [
  {
    id: 'project-01',
    slug: 'hayked-coffee-warehouse-erp',
    number: '01',
    title: 'Hayked Coffee Warehouse ERP',
    category: 'CUSTOM SOFTWARE',
    tagline: 'Warehouse Operations, Traceability & Client Custody',
    year: '2026',
    clientType: 'Coffee Warehouse Operations',
    description:
      'End-to-end warehouse management for Ethiopian coffee, covering goods receipt, lots, processing, stock, client custody, movements, reporting and operational traceability.',
    overview:
      'Hayked Coffee Warehouse ERP was designed around real third-party coffee warehouse operations. The system replaces fragmented records with one operational flow from goods receipt through lot custody, processing, movement history, stock reporting and controlled release.',
    challenge: {
      title: 'Warehouse Accuracy Across Multiple Owners and Lots',
      description:
        'Coffee warehouse operations require accurate custody records, clear lot identity and controlled stock movement while different clients, processing states and receipts are handled at the same time.',
      points: [
        'Goods receipts and lot identities must remain traceable from arrival onward',
        'Client-owned stock must stay separated and visible throughout warehouse operations',
        'Processing and stock movements need controls that prevent invalid or negative inventory states',
      ],
    },
    solution: {
      title: 'One Controlled Warehouse Workflow',
      description:
        'The ERP connects receipt, lot management, processing, inventory, movement history and reporting in one workflow built around practical warehouse controls.',
      points: [
        'Database-generated GRN and lot references with printable operational records',
        'Client-to-lot custody and processing workflows with stock-limit validation',
        'Movement history, stock views and lot detail pages for day-to-day traceability',
      ],
    },
    architecture: {
      title: 'Warehouse Operations Flow',
      description:
        'Goods Receipt → Lot Ledger → Processing / Movements → Client Stock → Reports & Traceability',
      highlights: [
        'Receipt-to-lot traceability for warehouse coffee',
        'Controlled processing source eligibility and stock validation',
        'Printable GRN, lot-tag and operational reporting workflows',
      ],
    },
    technicalHighlights: [
      'Role-aware warehouse workflows',
      'Lot-level stock and movement history',
      'Controlled processing and completion rules',
      'Responsive operational tables and printable documents',
    ],
    metricsOrOutcomes: [],
    services: ['ERP Design', 'Warehouse Workflow', 'Inventory & Traceability', 'Reporting'],
    technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    image: '/images/projects/hayked-coffee-warehouse-erp.webp',
    href: '/work/hayked-coffee-warehouse-erp',
    liveUrl: 'https://hayked-coffee-warehouse-erp.vercel.app/',
  },
  {
    id: 'project-02',
    slug: 'beanledger',
    number: '02',
    title: 'BeanLedger',
    category: 'CUSTOM SOFTWARE',
    tagline: 'Coffee Export ERP from Purchase to Shipment',
    year: '2026',
    clientType: 'Coffee Export & Operations',
    description:
      'A unified coffee ERP connecting supplier purchases, warehouse receipts, processing, bag inventory, export contracts, reports and document workflows.',
    overview:
      'BeanLedger brings the core coffee export operation into one system. Purchasing, warehouse activity, processing, bag tracking, export contracts, reporting and operational letters are connected so teams can follow the same source of truth from incoming coffee to shipment preparation.',
    challenge: {
      title: 'Disconnected Coffee Operations and Documents',
      description:
        'Purchase records, warehouse balances, processing activity, bags, export contracts and operational documents can quickly drift apart when they are managed in separate spreadsheets or manual files.',
      points: [
        'Purchases and warehouse receipts need a consistent lot and stock trail',
        'Processing outputs and bag movements must reconcile with available coffee',
        'Export contracts, reports and issued documents need to stay linked to operations',
      ],
    },
    solution: {
      title: 'A Connected Coffee Operations Ledger',
      description:
        'BeanLedger combines the operational modules into one traceable flow with controlled stock rules, reporting and document generation.',
      points: [
        'Supplier purchases, warehouse receipts and processing logs connected to stock',
        'Bag ledger and export contract workflows designed around operational balances',
        'Reporting and letter/document workflows integrated into the same system',
      ],
    },
    architecture: {
      title: 'Coffee Export Operations Flow',
      description:
        'Purchases → Warehouse → Processing → Bag Ledger → Export Contracts → Reports / Letters',
      highlights: [
        'Traceable stock flow across purchase, warehouse and processing modules',
        'Operational bag and export contract management',
        'Reporting, audit-oriented workflows and document output in one product',
      ],
    },
    technicalHighlights: [
      'Coffee-specific inventory and processing workflows',
      'Role-based operational modules',
      'Export, bag and stock reporting',
      'Integrated letter and document workflows',
    ],
    metricsOrOutcomes: [],
    services: ['ERP Product Design', 'Operations Workflow', 'Inventory & Export', 'Document Automation'],
    technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    image: '/images/projects/beanledger-coffee-export-erp.webp',
    href: '/work/beanledger',
    liveUrl: 'https://bean-ledger-five.vercel.app/login',
  },
  {
    id: 'project-03',
    slug: 'social-media-campaign',
    number: '03',
    title: 'Social Media Campaign',
    category: 'SOCIAL MEDIA',
    tagline: 'High-Retention Editorial Growth Engine',
    year: '2026',
    clientType: 'Digital Brand & Media Studio',
    description:
      'Omnichannel social growth architecture, high-retention video content system, and creative campaign execution designed to scale audience acquisition and brand equity.',
    overview:
      'A structured digital campaign framework developed to replace fragmented posting habits with an engineered publishing pipeline. By combining algorithmic pacing, cinematic 9:16 video formatting, and automated performance tracking, the system drives measurable organic engagement.',
    challenge: {
      title: 'Audience Fragmentation & Saturation',
      description:
        'Standard social media marketing produces fleeting impressions without lasting audience retention. The objective was to build an authentic content infrastructure that captures attention within the first 1.5 seconds.',
      points: [
        'Short consumer attention spans requiring high-velocity visual hooks',
        'Inconsistent visual identity across multi-platform publishing channels',
        'Manual distribution workflows causing production bottlenecks and scheduling lag',
      ],
    },
    solution: {
      title: 'Systematized Creative Pipeline',
      description:
        'We designed a modular content architecture with standardized motion design templates, programmatic captioning, and structured narrative cadences.',
      points: [
        'Kinetic 9:16 vertical video templates engineered for maximum completion rate',
        'Unified typographic and color grading guidelines across all touchpoints',
        'Automated multi-platform distribution and analytics aggregation via Meta Graph API',
      ],
    },
    architecture: {
      title: 'Content Pipeline Flow',
      description:
        'Raw Creative Concept → Scripting & Editorial Layout → Batch Video Rendering → Meta Graph API Dispatch → Real-time Sentiment & Engagement Telemetry.',
      highlights: [
        'High-retention editorial cuts with dynamic sub-second typography',
        'Automated video transcoding optimized for mobile GPU decoders',
        'Centralized content calendar synchronizing cross-platform releases',
      ],
    },
    technicalHighlights: [
      'Engineered for 9:16 mobile viewport retention',
      'Batch-rendered timeline assets with synchronized typography',
      'Meta Graph API webhook integrations for instant engagement alerts',
      'Real-time analytics dashboard aggregating multi-channel reach',
    ],
    metricsOrOutcomes: [
      { label: 'Video Completion', value: '+78%', detail: 'Average watch time improvement' },
      { label: 'Publishing Velocity', value: '4x', detail: 'Faster content turnaround cycle' },
      { label: 'Asset Reusability', value: '100%', detail: 'Modular design system coverage' },
    ],
    services: ['Content Strategy', 'Video Direction', 'Campaign Design', 'Audience Growth'],
    technologies: ['Figma', 'DaVinci Resolve', 'Meta Graph API', 'Analytics Engine'],
    image: '/images/projects/project-01.svg',
    href: '/work/social-media-campaign',
  },
  {
    id: 'project-04',
    slug: 'interactive-website',
    number: '04',
    title: 'Interactive Website',
    category: 'WEBSITE',
    tagline: 'Cinematic High-Performance Web Platform',
    year: '2026',
    clientType: 'Commercial Agency / Creative Firm',
    description:
      'High-performance editorial digital experience with custom interactive graphics, sub-second route transitions, and responsive typography built for commercial impact.',
    overview:
      'A custom web experience created to bridge the gap between heavy, laggy agency showpieces and lean, lightning-fast commercial websites. Powered by Next.js App Router and Turbopack, the application achieves 120 FPS visual transitions while keeping bundle size minimal.',
    challenge: {
      title: 'Balancing Rich Motion with Raw Performance',
      description:
        'Most creative portfolio websites suffer from terrible Lighthouse scores, massive bundle sizes, and stuttering scroll handlers that drain device batteries and frustrate users.',
      points: [
        'Heavy third-party animation libraries causing significant main-thread blocking',
        'Flickering and layout shifts during scroll scrubbing and route changes',
        'Poor mobile responsiveness and high memory usage on mid-tier hardware',
      ],
    },
    solution: {
      title: 'Zero-Dependency Native Animation Architecture',
      description:
        'We implemented direct requestAnimationFrame render loops with lerp interpolation, hardware-accelerated CSS transforms, and pure ref-driven updates to eliminate virtual DOM re-render overhead.',
      points: [
        'Native rAF-driven scroll engine maintaining steady 60/120 FPS on all devices',
        'Responsive typography utilizing modern CSS clamp() for fluid readability',
        'Preloaded video and image asset buffers ensuring zero visual pop-in',
      ],
    },
    architecture: {
      title: 'Next.js App Router Architecture',
      description:
        'Turbopack Build Pipeline → Edge CDN Delivery → Server Component Hydration → Client Component GPU Composite Layers.',
      highlights: [
        'Zero external animation dependencies for ultra-lightweight delivery',
        'Sub-50ms route transition latency with Turbopack code splitting',
        'Prefers-reduced-motion accessibility compliance built into core hooks',
      ],
    },
    technicalHighlights: [
      'Next.js 16 App Router with Turbopack compilation',
      'TypeScript strict typing throughout component hierarchy',
      'Tailwind CSS v4 with custom variable-based dark theme',
      '100% Lighthouse performance rating on desktop and mobile',
    ],
    metricsOrOutcomes: [
      { label: 'Lighthouse Score', value: '100', detail: 'Performance, Accessibility & SEO' },
      { label: 'Frame Rate', value: '120 FPS', detail: 'Smooth hardware-accelerated motion' },
      { label: 'Bundle Impact', value: '0 kB', detail: 'Zero external animation library overhead' },
    ],
    services: ['Creative Direction', 'Frontend Engineering', 'Interactive Motion', 'Technical SEO'],
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Turbopack'],
    image: '/images/projects/project-02.svg',
    href: '/work/interactive-website',
  },
  {
    id: 'project-05',
    slug: 'telegram-automation',
    number: '05',
    title: 'Telegram Automation',
    category: 'AUTOMATION',
    tagline: 'Autonomous 24/7 Bot & Webhook Gateway',
    year: '2026',
    clientType: 'Commercial Services & Support',
    description:
      'Autonomous 24/7 Telegram bot ecosystem orchestrating asynchronous message queues, customer onboarding funnels, and real-time CRM payment reconciliation.',
    overview:
      'An industrial-strength Telegram automation bot that turns the messaging app into a self-service operational terminal. Capable of handling high-volume concurrent user requests, the bot coordinates verification, payments, customer support, and system health alerts without human intervention.',
    challenge: {
      title: 'Support Bottlenecks & Delayed Response Times',
      description:
        'Customer onboarding and repetitive administrative requests consumed hundreds of manual hours every week, creating customer churn and costly human errors.',
      points: [
        'Slow customer response times during off-hours and weekend traffic spikes',
        'Manual payment verification and access provisioning prone to delays',
        'Complex API rate limits imposed by external third-party communication channels',
      ],
    },
    solution: {
      title: 'High-Throughput Asynchronous Bot Architecture',
      description:
        'We engineered an asynchronous Python/FastAPI bot engine that processes webhooks instantly, delegates heavy computations to background task workers, and interfaces with payment and CRM gateways.',
      points: [
        'Sub-second automated onboarding and query resolution available 24/7/365',
        'Cryptographic webhook validation securing all payment notifications',
        'Intelligent rate-limiting queue worker preventing Telegram API throttling',
      ],
    },
    architecture: {
      title: 'Bot Engine Pipeline',
      description:
        'Telegram Webhook → FastAPI Ingestion Gateway → Asynchronous Celery/Redis Queue → Business Logic & CRM → Instant Bot Dispatch.',
      highlights: [
        'Non-blocking event-driven loop capable of handling 5,000+ requests/minute',
        'Integrated AI workflow hooks for automated contextual answering',
        'Telemetry heartbeat daemon sending automated uptime pings to admins',
      ],
    },
    technicalHighlights: [
      'Official Telegram Bot API with high-frequency webhook support',
      'Python 3 / FastAPI async backend with low memory footprint',
      'Redis message queue ensuring zero dropped incoming updates',
      'Automated error capturing and instant administrator alerting',
    ],
    metricsOrOutcomes: [
      { label: 'Response Time', value: '< 200ms', detail: 'Average automated command resolution' },
      { label: 'Availability', value: '24/7/365', detail: 'Zero downtime autonomous execution' },
      { label: 'Workload Reduction', value: '-85%', detail: 'Reduction in manual support tickets' },
    ],
    services: ['Bot Architecture', 'Webhook Pipelines', 'API Orchestration', 'Workflow Automation'],
    technologies: ['Telegram Bot API', 'Python / FastAPI', 'Webhooks', 'Queue Workers'],
    image: '/images/projects/project-04.svg',
    href: '/work/telegram-automation',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}
