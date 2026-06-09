import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nahid.ppimscaa.com';

  const mainUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ];

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...mainUrls, ...projectUrls];
}
