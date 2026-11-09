import type { Metadata } from 'next';
import SocialGalleryClient from './SocialGalleryClient';

export const metadata: Metadata = {
  alternates: { canonical: '/social' },
  title: 'Social & Creative Campaigns',
  description:
    'Explore all ADMAKI video campaigns, creator collaborations, and product storytelling for Universal Electronics, Finder Tools, and KKGT.',
  openGraph: {
    url: '/social',
    title: 'Social & Creative Campaigns | ADMAKI',
    description:
      'High-retention storytelling, product education and creative video production made for TikTok and social audiences.',
  },
};

export default function SocialPage() {
  return <SocialGalleryClient />;
}
