import type { Metadata } from 'next';
import Script from 'next/script';
import { SITE_NAME } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: 'Travel guides and destination inspiration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-white dark:bg-black">
        {children}
        <Script src="/consent.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
