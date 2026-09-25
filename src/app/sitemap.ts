import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { hotelGuides } from '@/lib/hotel-guides';
import { absoluteUrl, SITE_ID } from '@/lib/site-config';

export const dynamic = 'force-static';

const nextRoutes = ['/', '/flights/', '/hotels/', '/car-rental/', '/esim/', '/destinations/', '/blog/bali-budget-guide/'];

function handMadeRoutes(): string[] {
  const root = path.join(process.cwd(), 'public');
  const routes: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'index.html' && !/name="robots"\s+content="noindex/.test(fs.readFileSync(full, 'utf8'))) {
        routes.push('/' + path.relative(root, dir).split(path.sep).join('/') + '/');
      }
    }
  };
  walk(root);
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const hotelGuideRoutes = hotelGuides
    .filter((guide) => guide.site === SITE_ID)
    .map((guide) => `/hotels/where-to-stay-in-${guide.key}/`);

  const routes = [...new Set([...nextRoutes, ...hotelGuideRoutes, ...handMadeRoutes()])].sort();
  return routes.map((route) => ({ url: absoluteUrl(route) }));
}
