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
};

export const projectsData: Project[] = [
  {
    id: 'project-01',
    slug: 'social-media-campaign',
    number: '01',
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
    id: 'project-02',
    slug: 'interactive-website',
    number: '02',
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
    id: 'project-03',
    slug: 'business-management-system',
    number: '03',
    title: 'Business Management System',
    category: 'CUSTOM SOFTWARE',
    tagline: 'Mission-Critical Internal ERP & Telemetry',
    year: '2026',
    clientType: 'Enterprise Logistics & Operations',
    description:
      'Mission-critical internal enterprise software integrating live telemetry, inventory management, multi-role RBAC security, and automated reporting pipelines.',
    overview:
      'A bespoke enterprise management platform engineered to replace disorganized spreadsheets and slow legacy software. The system centralizes real-time inventory tracking, staff dispatch, and financial auditing into a unified, high-security operational interface.',
    challenge: {
      title: 'Data Inconsistency & Operational Blind Spots',
      description:
        'Growing operational complexity led to synchronization delays between warehouse floors, administrative offices, and accounting departments.',
      points: [
        'Slow database queries causing sluggish dashboard load times during peak hours',
        'Lack of role-based permissions leading to accidental data overrides',
        'Inability to audit historic state transitions across multi-step order pipelines',
      ],
    },
    solution: {
      title: 'Event-Driven Real-Time Data Fabric',
      description:
        'We architected a high-concurrency system combining PostgreSQL for ACID-compliant persistence, Redis caching for instant telemetry queries, and WebSocket streams for live floor updates.',
      points: [
        'Fine-grained Role-Based Access Control (RBAC) across administrative tiers',
        'Real-time WebSocket event bus broadcasting state changes with sub-15ms latency',
        'Automated immutable audit logging recording every ledger and inventory event',
      ],
    },
    architecture: {
      title: 'System Topology',
      description:
        'Client Dashboard ↔ API Gateway (Node.js/FastAPI) ↔ Redis Pub/Sub ↔ PostgreSQL Cluster ↔ Asynchronous Worker Workers.',
      highlights: [
        'Sub-15ms median query response time with intelligent Redis layer',
        'ACID transactions ensuring zero inventory double-allocation',
        'Modular microservice layout ready for containerized scaling',
      ],
    },
    technicalHighlights: [
      'PostgreSQL with connection pooling and automated replication',
      'Redis distributed caching and WebSocket pub/sub streams',
      'JWT and session-based authentication with cryptographic signing',
      'Comprehensive REST and GraphQL data querying interfaces',
    ],
    metricsOrOutcomes: [
      { label: 'Query Latency', value: '< 15ms', detail: 'Median database query response' },
      { label: 'Data Accuracy', value: '100%', detail: 'Zero inventory allocation discrepancies' },
      { label: 'Uptime SLA', value: '99.99%', detail: 'High-availability cluster reliability' },
    ],
    services: ['System Architecture', 'Database Design', 'Backend Engineering', 'Internal Tooling'],
    technologies: ['PostgreSQL', 'Redis', 'Node.js', 'REST / GraphQL'],
    image: '/images/projects/project-03.svg',
    href: '/work/business-management-system',
  },
  {
    id: 'project-04',
    slug: 'telegram-automation',
    number: '04',
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
