interface AffiliateCTAProps {
  href: string;
  children: React.ReactNode;
}

// Centralizing target/rel here means a one-off page can't forget the
// nofollow sponsored attribute Google Search Console requires on affiliate links.
export default function AffiliateCTA({ href, children }: AffiliateCTAProps) {
  return (
    <a href={href} target="_blank" rel="nofollow sponsored">
      {children}
    </a>
  );
}
