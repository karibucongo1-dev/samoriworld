/**
 * This template is shared between samori.net and karibucongo.com. Each site is built
 * separately with its own NEXT_PUBLIC_SITE_URL so canonical tags, sitemaps, and any
 * other absolute URLs always self-reference the site actually being built — never
 * hardcode a domain in a page file.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.samori.net').replace(/\/$/, '');

export type SiteId = 'samori-net' | 'karibucongo';

export const SITE_ID: SiteId = SITE_URL.includes('karibucongo') ? 'karibucongo' : 'samori-net';

export const SITE_NAME = SITE_ID === 'karibucongo' ? 'Karibu Congo' : 'Samori World';

export const SITE_TAGLINE =
  SITE_ID === 'karibucongo' ? 'Karibu Congo — your journey, your way.' : 'Samori World — your world, your way.';

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
