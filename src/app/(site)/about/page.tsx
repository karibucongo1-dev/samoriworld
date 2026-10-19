import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Samori World',
  description:
    'Who runs Samori World, how the site makes money from affiliate links, and who to contact about a booking.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">About Samori World</h1>
      <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400">
        Samori World is a travel guide and comparison site. We write destination and neighbourhood guides, and we link
        to booking partners for flights, hotels, car rental, activities and travel eSIMs.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900 dark:text-zinc-50">How the site makes money</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Many links and search boxes on this site are affiliate links. If you book through them, the partner may pay us a
        commission. It does not change the price you pay. We mark these links as sponsored, and partners do not review
        or approve what we write.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Who you book with</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Samori World does not sell travel. When you book, your contract is with the airline, hotel, rental company or
        other provider shown at checkout, and they handle payment, changes, refunds and customer service. Prices and
        availability come from those providers and can change at any time.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900 dark:text-zinc-50">How we write our guides</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Guides are researched from official tourism, operator and transport sources. Unless a guide says otherwise, it
        is not based on a personal visit or hands-on testing. Opening hours, ticket prices and entry rules change, so
        check the official source linked in each guide before you travel. If you spot something out of date, please{' '}
        <Link href="/contact/" className="underline">
          tell us
        </Link>
        .
      </p>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900 dark:text-zinc-50">The Samori family of sites</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Samori World is the travel site in the Samori family. Our main media site is{' '}
        <a href="https://samori.io/" className="underline" target="_blank" rel="noopener">
          samori.io
        </a>
        .
      </p>

      <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
        See also: <Link href="/contact/" className="underline">Contact</Link> ·{' '}
        <a href="/privacy/" className="underline">Privacy and cookies</a> ·{' '}
        <Link href="/destinations/" className="underline">All destination guides</Link>
      </p>
    </section>
  );
}
