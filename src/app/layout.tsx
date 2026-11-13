import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { absoluteAssetUrl, basePath, siteUrl } from '@/lib/siteConfig';
import './globals.css';
import JsonLd from '@/components/seo/JsonLd';
import { business } from '@/lib/business';
import './portfolio-pages.css';
import './brand.css';

const manrope = localFont({
  src: '../../public/fonts/manrope-variable.woff2',
  variable: '--font-admaki',
  weight: '200 800',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAFAF8',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: {
    default: 'Websites, Content & Custom Software in Ethiopia | ADMAKI Digital',
    template: '%s | ADMAKI Digital',
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
  authors: [{ name: 'ADMAKI Digital' }],
  creator: 'ADMAKI Digital',
  publisher: 'ADMAKI Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ADMAKI Digital',
    title: 'Websites, Content & Custom Software in Ethiopia | ADMAKI Digital',
    description:
      'Websites, creative campaigns, QR restaurant menus, NFC business cards and business software, built in Ethiopia.',
    images: [
      {
        url: absoluteAssetUrl('/brand/social-preview.png'),
        width: 1200,
        height: 630,
        alt: 'ADMAKI Digital - Connected creativity. Practical technology.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Websites, Content & Custom Software in Ethiopia | ADMAKI Digital',
    description:
      'Ideas that move. Systems that work. Explore ADMAKI websites, creative campaigns and practical business software.',
    images: [absoluteAssetUrl('/brand/social-preview.png')],
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
    icon: [{ url: `${basePath}/favicon.svg`, type: 'image/svg+xml' }, { url: `${basePath}/favicon.ico` }],
    apple: `${basePath}/brand/apple-touch-icon.png`,
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
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white"><JsonLd data={business} />{children}</body>
    </html>
  );
}
