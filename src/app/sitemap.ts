import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { servicePages } from '@/data/services';
import { siteUrl } from '@/lib/siteConfig';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projectsData.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/social`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/websites`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/erp`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    ...['/guides/digital-tools-for-ethiopian-businesses', '/am/guides/digital-tools-for-ethiopian-businesses', '/services', '/guides/choosing-a-digital-partner-in-ethiopia', ...servicePages.map(s => `/services/${s.slug}`)].map(path => ({ url: `${siteUrl}${path}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...projectRoutes,
  ];
}
