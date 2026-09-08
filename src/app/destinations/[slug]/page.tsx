import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { destinations, getDestination } from '@/lib/destinations';
import { absoluteUrl } from '@/lib/site-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  return {
    title: destination.title,
    description: destination.teaser,
    // Derived from the destination's own slug — this is what makes a page
    // self-referencing by construction instead of relying on a hand-typed
    // per-page canonical that can drift or get copy-pasted from another page.
    alternates: {
      canonical: absoluteUrl(`/destinations/${destination.slug}/`),
    },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  return (
    <main>
      <img src={destination.image} alt={destination.title} width={960} height={540} />
      <h1>{destination.title}</h1>
      <p>{destination.teaser}</p>
      <dl>
        <dt>Fly into</dt>
        <dd>{destination.flyInto}</dd>
        <dt>Currency</dt>
        <dd>{destination.currency}</dd>
        <dt>Best time to go</dt>
        <dd>{destination.bestTimeToGo}</dd>
        <dt>Suggested stay</dt>
        <dd>{destination.suggestedStay}</dd>
      </dl>
    </main>
  );
}
