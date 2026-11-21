import type { MetadataRoute } from 'next';
import { publishedReviews } from '@/lib/reviews';
import { TRUST_PAGES, absoluteUrl } from '@/lib/site-config';

export const dynamic = 'force-static';

// Only canonical, indexable, verified pages belong here. Placeholder or unverified
// reviews and the guides still awaiting verified figures are deliberately left out.
// lastModified is omitted on purpose: a build-time date would claim every page
// changed on every deploy. Add a real per-page date once edit history is tracked.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    ...publishedReviews.map((review) => `/${review.slug}/`),
    ...TRUST_PAGES.map((page) => page.path),
  ];

  return routes.map((path) => ({ url: absoluteUrl(path) }));
}
