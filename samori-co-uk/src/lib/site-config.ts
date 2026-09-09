export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.samori.co.uk').replace(/\/$/, '');

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
