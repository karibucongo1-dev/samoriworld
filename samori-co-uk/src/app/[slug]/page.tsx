import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { reviews, getReview } from '@/lib/reviews';
import { absoluteUrl } from '@/lib/site-config';
import AffiliateCTA from '@/components/AffiliateCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReview(slug);
  if (!review) return {};

  return {
    title: review.title,
    description: review.verdict,
    // Derived from the review's own slug — every product page gets a
    // self-referencing canonical by construction, fixing the bug where these
    // pages previously shipped with no <link rel="canonical"> at all.
    alternates: {
      canonical: absoluteUrl(`/${review.slug}/`),
    },
  };
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const review = getReview(slug);
  if (!review) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: review.title,
    brand: review.brand,
    category: review.category,
    ...(review.priceGBP != null
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'GBP',
            price: review.priceGBP,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };

  return (
    <main>
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

      {review.priceGBP != null && <p>UK RRP: £{review.priceGBP}</p>}

      <AffiliateCTA href={review.affiliateUrl}>Check price on Amazon UK</AffiliateCTA>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
