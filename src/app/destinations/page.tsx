import type { Metadata } from 'next';
import Link from 'next/link';
import { destinations } from '@/lib/destinations';
import { absoluteUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Every destination guide, from Abu Dhabi to Seychelles.',
  alternates: {
    canonical: absoluteUrl('/destinations/'),
  },
};

export default function DestinationsIndexPage() {
  return (
    <main>
      <h1>Destinations</h1>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.slug}>
            <Link href={`/destinations/${destination.slug}/`}>
              <img src={destination.image} alt={destination.title} width={320} height={200} />
              <h2>{destination.title}</h2>
              <p>{destination.teaser}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
