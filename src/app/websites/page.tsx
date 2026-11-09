import type { Metadata } from 'next';
import WebsitesClient from './WebsitesClient';

export const metadata: Metadata = {
  title: 'Websites & Digital Experiences',
  description:
    'Explore ADMAKI websites for Ethiopian coffee origins, electronics, agriculture, luxury furniture, and technology platforms.',
  openGraph: {
    title: 'Websites & Digital Experiences | ADMAKI',
    description:
      'Distinctive websites and digital products with purposeful interaction, mobile-first design, and room to grow.',
  },
};

export default function WebsitesPage() {
  return <WebsitesClient />;
}
