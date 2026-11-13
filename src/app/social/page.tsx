import type { Metadata } from 'next';
import SocialGalleryClient from './SocialGalleryClient';

export const metadata: Metadata = {
  alternates: { canonical: '/social' },
  title: "Social Media Management & Content Creation in Ethiopia",
  description: "Social media content and creative campaigns in Ethiopia. Explore ADMAKI work for Universal Electronics, KKGT and Finder Tools.",
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
