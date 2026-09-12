import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://admaki.com';

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ADMAKI — Creative Technology Studio',
    template: '%s | ADMAKI',
  },
  description:
    'Creative communication, modern web development, custom software & ERP systems, and Telegram automation engineered for businesses.',
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
      'I turn ideas into digital experiences. Social media, websites, custom software, and Telegram automation.',
    images: [
      {
        url: '/images/projects/project-02.svg',
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
      'I turn ideas into digital experiences. Social media, websites, custom software, and Telegram automation.',
    images: ['/images/projects/project-02.svg'],
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
    icon: '/favicon.ico',
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
