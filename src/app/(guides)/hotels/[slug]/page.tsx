import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hotelGuides, getHotelGuide, type HotelArea } from '@/lib/hotel-guides';
import { absoluteUrl, SITE_ID, SITE_NAME } from '@/lib/site-config';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function keyFromSlug(slug: string): string {
  return slug.replace(/^where-to-stay-in-/, '');
}

// Only the guides tagged for the site currently being built get a route —
// this is what keeps e.g. Dubai off the karibucongo.com export.
export function generateStaticParams() {
  return hotelGuides
    .filter((guide) => guide.site === SITE_ID)
    .map((guide) => ({ slug: `where-to-stay-in-${guide.key}` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getHotelGuide(keyFromSlug(slug));
  if (!guide || guide.site !== SITE_ID) return {};

  return {
    title: `${guide.title} | ${SITE_NAME}`,
    description: guide.heroSubtitle,
    alternates: {
      canonical: absoluteUrl(`/hotels/where-to-stay-in-${guide.key}/`),
    },
  };
}

// Renders "*word*" as <em>word</em> — the drafts used this once (Dubai Marina)
// to italicize a single word inline.
function withEmphasis(text: string) {
  const parts = text.split(/\*(.+?)\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

function Area({ area }: { area: HotelArea }) {
  return (
    <>
      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{area.heading}</h2>
      {area.paragraphs.map((p, i) => (
        <p key={i} className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {withEmphasis(p)}
        </p>
      ))}
      {(area.goodFor || area.skipIf) && (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {area.goodFor && (
            <>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">Good for:</strong> {area.goodFor}
              <br />
            </>
          )}
          {area.skipIf && (
            <>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">Skip if:</strong> {area.skipIf}
            </>
          )}
        </p>
      )}
      {area.dayTrips && (
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {area.dayTrips.map((trip) => (
            <li key={trip.label}>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">{trip.label}</strong> — {trip.text}
            </li>
          ))}
        </ul>
      )}
      {area.activityBlurb && (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{area.activityBlurb}</p>
      )}
      {area.cta && (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          👉{' '}
          <a
            href={area.cta.href}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:border-teal-600 hover:bg-teal-50 dark:border-white/15 dark:text-teal-400 dark:hover:bg-teal-950/30"
          >
            {area.cta.label}
          </a>
        </p>
      )}
      <hr className="my-10 border-black/5 dark:border-white/10" />
    </>
  );
}

export default async function HotelGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getHotelGuide(keyFromSlug(slug));
  if (!guide || guide.site !== SITE_ID) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="relative flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 px-6 py-16 text-center text-white sm:py-24">
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">{guide.title}</h1>
            <p className="max-w-xl text-teal-50">{guide.heroSubtitle}</p>
          </div>
        </section>
        <article className="mx-auto max-w-3xl px-6 py-12">
          <hr className="my-10 border-black/5 dark:border-white/10" />

          {guide.areas.map((area) => (
            <Area key={area.heading} area={area} />
          ))}

          <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Quick Comparison</h2>
          <table className="mt-3 w-full border-collapse overflow-hidden rounded-2xl border border-black/5 text-sm dark:border-white/10">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                {guide.comparisonTable.headers.map((h) => (
                  <th
                    key={h}
                    className="border-b border-black/5 px-4 py-3 text-left font-semibold text-zinc-900 dark:border-white/10 dark:text-zinc-50"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.comparisonTable.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className="border-b border-black/5 px-4 py-3 text-zinc-600 dark:border-white/10 dark:text-zinc-400"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="my-10 border-black/5 dark:border-white/10" />

          <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">FAQ</h2>
          {guide.faqs.map((faq) => (
            <p key={faq.question} className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">{faq.question}</strong>
              <br />
              {faq.answer}
            </p>
          ))}

          <hr className="my-10 border-black/5 dark:border-white/10" />

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-700 px-8 py-10 text-center text-white">
            <div className="text-sm leading-relaxed text-teal-50">
              <p>
                {guide.closingPrefix} <a href={absoluteUrl('/hotels/')}>Booking.com and Agoda</a>
                {guide.closingSuffix}
              </p>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
