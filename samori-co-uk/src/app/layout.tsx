import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Samori Systems',
  description: 'Tech reviews, specs, and buying guides — UK pricing and UK availability.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
