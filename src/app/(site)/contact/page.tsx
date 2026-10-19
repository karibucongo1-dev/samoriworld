import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Samori World',
  description: 'How to contact Samori World, and who to contact about an existing booking.',
  alternates: { canonical: '/contact/' },
};

const CONTACT_EMAIL = 'info@samori.net';

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Contact us</h1>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900 dark:text-zinc-50">About a booking</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        We can&apos;t see, change or cancel bookings. For tickets, reservations, payments, changes or refunds, contact
        the company you booked with. Their name and support details are in your booking confirmation email.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Everything else</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        For corrections to a guide, partnership enquiries or privacy requests, email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
        See also: <Link href="/about/" className="underline">About Samori World</Link> ·{' '}
        <a href="/privacy/" className="underline">Privacy and cookies</a>
      </p>
    </section>
  );
}
