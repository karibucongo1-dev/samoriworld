import type { Metadata } from 'next';
import Link from 'next/link';
import { publishedReviews } from '@/lib/reviews';
import { SITE_NAME, absoluteUrl } from '@/lib/site-config';

const TITLE = 'Samori Systems — UK Tech Reviews';
const DESCRIPTION = 'Independent tech reviews with UK pricing and UK availability.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      url: absoluteUrl('/'),
      inLanguage: 'en-GB',
      publisher: { '@id': absoluteUrl('/#organization') },
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <h1>Samori Systems</h1>
      <p>Tech reviews, priced and sourced for the UK.</p>
      <h2>Reviews</h2>
      <ul>
        {publishedReviews.map((review) => (
          <li key={review.slug}>
            <Link href={`/${review.slug}/`}>{review.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        Read how we write our reviews in the <Link href="/about/">editorial policy</Link>.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
