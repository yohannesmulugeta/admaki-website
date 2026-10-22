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
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}
