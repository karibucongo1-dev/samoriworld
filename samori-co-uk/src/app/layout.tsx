import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';

const DEFAULT_DESCRIPTION = 'Tech reviews, specs, and buying guides — UK pricing and UK availability.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
