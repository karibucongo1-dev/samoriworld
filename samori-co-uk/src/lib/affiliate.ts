// Affiliate URLs that still contain template text must never be rendered as links.
const PLACEHOLDER_PATTERN = /REPLACE_WITH|example-affiliate-network\.com|example\.com|TBD/i;

export function hasLiveAffiliateLink(url: string | null | undefined): url is string {
  return typeof url === 'string' && url.length > 0 && !PLACEHOLDER_PATTERN.test(url);
}
