export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.samori.co.uk').replace(/\/$/, '');

export const SITE_NAME = 'Samori Systems';

export const CONTACT_EMAIL = 'info@samori.net';

export const LAST_POLICY_UPDATE = '21 November 2026';

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

// Permanent trust pages: indexable, in the sitemap and linked from the footer and llms.txt.
export const TRUST_PAGES = [
  { path: '/about/', label: 'About and editorial policy' },
  { path: '/affiliate-disclosure/', label: 'Affiliate disclosure' },
  { path: '/privacy/', label: 'Privacy' },
  { path: '/contact/', label: 'Contact' },
] as const;
