import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Samori.net',
  description: 'Travel guides and destination inspiration from Samori.net.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
