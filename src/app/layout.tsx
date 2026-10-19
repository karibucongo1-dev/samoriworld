import type { Metadata } from 'next';
import Script from 'next/script';
import ConsentLoader from '@/components/ConsentLoader';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: 'Travel guides and destination inspiration.',
  // Shared social preview defaults; pages without their own openGraph inherit these.
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_GB',
    images: [{ url: '/destinations/dubai/images/dubai-international-airport-dxb.jpg', alt: 'Dubai skyline' }],
  },
  twitter: { card: 'summary_large_image' },
};

// Optional scripts every Next.js page asks for; consent.js loads them only after "Accept".
const consentProviders = ['ga', 'metricool', 'travelpayouts'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-white dark:bg-black">
        {children}
        <ConsentLoader providers={consentProviders} />
        <Script src="/consent.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
