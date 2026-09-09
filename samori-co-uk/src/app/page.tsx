import type { Metadata } from 'next';
import Link from 'next/link';
import { reviews } from '@/lib/reviews';
import { absoluteUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Samori Systems — UK Tech Reviews & Buying Guides',
  description: 'Independent tech reviews and buying guides with UK pricing.',
  alternates: {
    canonical: absoluteUrl('/'),
  },
};

export default function HomePage() {
  return (
    <main>
      <h1>Samori Systems</h1>
      <p>Tech reviews and buying guides, priced and sourced for the UK.</p>
      <ul>
        {reviews.map((review) => (
          <li key={review.slug}>
            <Link href={`/${review.slug}/`}>{review.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
