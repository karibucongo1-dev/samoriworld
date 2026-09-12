import type { MetadataRoute } from 'next';
import { destinations } from '@/lib/destinations';
import { hotelGuides } from '@/lib/hotel-guides';
import { absoluteUrl, SITE_ID } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/destinations/', '/blog/bali-budget-guide/'];

  const destinationRoutes = destinations.map((destination) => `/destinations/${destination.slug}/`);

  const hotelGuideRoutes = hotelGuides
    .filter((guide) => guide.site === SITE_ID)
    .map((guide) => `/hotels/where-to-stay-in-${guide.key}/`);

  return [...staticRoutes, ...destinationRoutes, ...hotelGuideRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));
}
