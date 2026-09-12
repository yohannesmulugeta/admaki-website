import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ADMAKI — Creative Technology Studio',
    short_name: 'ADMAKI',
    description:
      'Digital studio portfolio for social media management, website design & development, custom software / ERP systems, and Telegram bots & automation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
