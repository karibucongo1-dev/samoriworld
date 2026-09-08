import type { MetadataRoute } from 'next';
import { destinations } from '@/lib/destinations';
import { absoluteUrl } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/destinations/', '/blog/bali-budget-guide/'];

  const destinationRoutes = destinations.map((destination) => `/destinations/${destination.slug}/`);

  return [...staticRoutes, ...destinationRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));
}
