import type { Metadata } from 'next';
import WebsitesClient from './WebsitesClient';

export const metadata: Metadata = {
  alternates: { canonical: '/websites' },
  title: "Website Design & Development in Ethiopia",
  description: "Website design and development for Ethiopian businesses. Explore ADMAKI websites for coffee, electronics, agriculture and interiors.",
  openGraph: {
    url: '/websites',
    title: 'Websites & Digital Experiences | ADMAKI',
    description:
      'Distinctive websites and digital products with purposeful interaction, mobile-first design, and room to grow.',
  },
};

export default function WebsitesPage() {
  return <WebsitesClient />;
}
