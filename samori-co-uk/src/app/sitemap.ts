import type { MetadataRoute } from 'next';
import { reviews } from '@/lib/reviews';
import { absoluteUrl } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/guides/best-portable-power-banks-uk/', '/guides/best-vpn-uk/'];
  const reviewRoutes = reviews.map((review) => `/${review.slug}/`);

  return [...staticRoutes, ...reviewRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));
}
