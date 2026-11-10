import { MetadataRoute } from 'next';
import { basePath } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ADMAKI Digital',
    short_name: 'ADMAKI',
    description:
      'Digital studio portfolio for social media management, website design & development, custom software / ERP systems, and Telegram bots & automation.',
    start_url: `${basePath}/`,
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#2563EB',
    icons: [
      {
        src: `${basePath}/favicon.ico`,
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
