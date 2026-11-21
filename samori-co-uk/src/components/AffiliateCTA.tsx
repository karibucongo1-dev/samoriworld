import { hasLiveAffiliateLink } from '@/lib/affiliate';

interface AffiliateCTAProps {
  href: string;
  children: React.ReactNode;
}

// Centralizing target/rel here means a one-off page can't forget the
// nofollow sponsored attribute Google Search Console requires on affiliate links.
// It also refuses to render a link whose URL still holds template text, so a
// placeholder affiliate URL can never reach the built site.
export default function AffiliateCTA({ href, children }: AffiliateCTAProps) {
  if (!hasLiveAffiliateLink(href)) return null;

  return (
    <a href={href} target="_blank" rel="nofollow sponsored">
      {children}
    </a>
  );
}
