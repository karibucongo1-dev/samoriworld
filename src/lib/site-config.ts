/**
 * This template is shared between samori.net and karibucongo.com. Each site is built
 * separately with its own NEXT_PUBLIC_SITE_URL so canonical tags, sitemaps, and any
 * other absolute URLs always self-reference the site actually being built — never
 * hardcode a domain in a page file.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.samori.net').replace(/\/$/, '');

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
