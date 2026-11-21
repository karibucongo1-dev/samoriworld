import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publishedReviews, getReview } from '@/lib/reviews';
import { SITE_NAME, absoluteUrl } from '@/lib/site-config';
import AffiliateCTA from '@/components/AffiliateCTA';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Unverified or placeholder reviews are not generated, so they cannot be reached or indexed.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedReviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReview(slug);
  if (!review) return {};

  const url = absoluteUrl(`/${review.slug}/`);

  return {
    title: review.title,
    description: review.verdict,
    // Derived from the review's own slug — every product page gets a
    // self-referencing canonical by construction.
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: review.title,
      description: review.verdict,
    },
    twitter: {
      card: 'summary',
      title: review.title,
      description: review.verdict,
    },
  };
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const review = getReview(slug);
  if (!review) notFound();

  const url = absoluteUrl(`/${review.slug}/`);

  // No Offer or availability is published: the RRP shown below is not a live price
  // and stock has not been checked, so marking it up would overstate the evidence.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: review.title,
        description: review.verdict,
        inLanguage: 'en-GB',
        isPartOf: { '@id': absoluteUrl('/#website') },
        about: { '@id': `${url}#product` },
      },
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name: review.title.replace(/ Review$/, ''),
        brand: { '@type': 'Brand', name: review.brand },
        category: review.category,
      },
    ],
  };

  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: review.title, path: `/${review.slug}/` },
        ]}
      />

      <h1>{review.title}</h1>

      {/* Static, pre-rendered content before any affiliate CTA, per .claude/tech-writer.md */}
      <p>{review.verdict}</p>

      <table>
        <caption>Specs</caption>
        <tbody>
          {Object.entries(review.specs).map(([key, value]) => (
            <tr key={key}>
              <th scope="row">{key}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {review.priceGBP != null && (
        <p>
          UK RRP: £{review.priceGBP}. This is a guide price, not a live offer; check the
          retailer for the current price.
        </p>
      )}

      <AffiliateCTA href={review.affiliateUrl}>Check price on Amazon UK</AffiliateCTA>

      <p>
        {SITE_NAME} may earn a commission if you buy through links on this page. Read the{' '}
        <Link href="/affiliate-disclosure/">affiliate disclosure</Link> and our{' '}
        <Link href="/about/">editorial policy</Link>.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
