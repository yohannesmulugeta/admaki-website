import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { absoluteAssetUrl, basePath, siteUrl } from '@/lib/siteConfig';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#f7f6f1',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: {
    default: 'ADMAKI — Creative Technology Studio',
    template: '%s | ADMAKI',
  },
  description:
    'ADMAKI creates websites, social media campaigns, QR restaurant menus, NFC business cards and custom ERP software for businesses in Ethiopia.',
  keywords: [
    'ADMAKI',
    'Creative Technology Studio',
    'Website Design',
    'Web Development',
    'Custom Software',
    'ERP Systems',
    'Telegram Bots',
    'Workflow Automation',
    'Social Media Strategy',
    'QR Restaurant Menus Ethiopia',
    'NFC Digital Business Cards Ethiopia',
    'Digital Menu Addis Ababa',
  ],
  authors: [{ name: 'ADMAKI' }],
  creator: 'ADMAKI',
  publisher: 'ADMAKI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ADMAKI',
    title: 'ADMAKI — Creative Technology Studio',
    description:
      'Websites, creative campaigns, QR restaurant menus, NFC business cards and business software, built in Ethiopia.',
    images: [
      {
        url: absoluteAssetUrl('/images/projects/project-02.svg'),
        width: 1200,
        height: 630,
        alt: 'ADMAKI Creative Technology Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADMAKI — Creative Technology Studio',
    description:
      'Ideas that move. Systems that work. Explore ADMAKI websites, creative campaigns and practical business software.',
    images: [absoluteAssetUrl('/images/projects/project-02.svg')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: `${basePath}/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
