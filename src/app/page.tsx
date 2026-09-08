import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Samori.net — Travel Guides & Destination Inspiration',
  description: 'Budget travel guides, destination inspiration, and trip planning resources.',
  alternates: {
    canonical: 'https://www.samori.net/',
  },
};

export default function HomePage() {
  return (
    <main>
      <h1>Samori.net</h1>
      <p>Travel guides and destination inspiration.</p>
    </main>
  );
}
