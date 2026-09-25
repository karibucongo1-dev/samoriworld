import type { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import ConsentLoader from '@/components/ConsentLoader';
import SiteFooter from '@/components/SiteFooter';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Samori World — Explore More. Pay Less.',
    template: '%s | Samori World',
  },
  description:
    'Flights, cars, activities and everything in between — all in one place, all at the best price we can find.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico' },
};

const consentProviders = ['metricool', 'travelpayouts'];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell flex min-h-full flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ConsentLoader providers={consentProviders} />
    </div>
  );
}
