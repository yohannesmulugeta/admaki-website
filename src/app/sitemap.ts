import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
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
    ...projectRoutes,
  ];
}
