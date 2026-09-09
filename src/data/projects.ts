export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  services: string[];
  technologies?: string[];
  image?: string;
  video?: string;
  href?: string;
};

export const projectsData: Project[] = [
  {
    id: 'project-01',
    number: '01',
    title: 'Social Media Campaign',
    category: 'SOCIAL MEDIA',
    description:
      'Omnichannel social growth architecture, high-retention video content system, and creative campaign execution designed to scale audience acquisition and brand equity.',
    services: ['Content Strategy', 'Video Direction', 'Campaign Design', 'Audience Growth'],
    technologies: ['Figma', 'DaVinci Resolve', 'Meta Graph API', 'Analytics Engine'],
    image: '/images/projects/project-01.svg',
    href: '#',
  },
  {
    id: 'project-02',
    number: '02',
    title: 'Interactive Website',
    category: 'WEBSITE',
    description:
      'High-performance editorial digital experience with custom interactive graphics, sub-second route transitions, and responsive typography built for commercial impact.',
    services: ['Creative Direction', 'Frontend Engineering', 'Interactive Motion', 'Technical SEO'],
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Turbopack'],
    image: '/images/projects/project-02.svg',
    href: '#',
  },
  {
    id: 'project-03',
    number: '03',
    title: 'Business Management System',
    category: 'CUSTOM SOFTWARE',
    description:
      'Mission-critical internal enterprise software integrating live telemetry, inventory management, multi-role RBAC security, and automated reporting pipelines.',
    services: ['System Architecture', 'Database Design', 'Backend Engineering', 'Internal Tooling'],
    technologies: ['PostgreSQL', 'Redis', 'Node.js', 'REST / GraphQL'],
    image: '/images/projects/project-03.svg',
    href: '#',
  },
  {
    id: 'project-04',
    number: '04',
    title: 'Telegram Automation',
    category: 'AUTOMATION',
    description:
      'Autonomous 24/7 Telegram bot ecosystem orchestrating asynchronous message queues, customer onboarding funnels, and real-time CRM payment reconciliation.',
    services: ['Bot Architecture', 'Webhook Pipelines', 'API Orchestration', 'Workflow Automation'],
    technologies: ['Telegram Bot API', 'Python / FastAPI', 'Webhooks', 'Queue Workers'],
    image: '/images/projects/project-04.svg',
    href: '#',
  },
];
