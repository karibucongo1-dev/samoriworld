import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import ProviderLinks from '@/components/ProviderLinks';
import TravelpayoutsEmbed from '@/components/TravelpayoutsEmbed';
import { CAR_RENTAL_WIDGET_SRC } from '@/lib/travelpayouts';

export const metadata: Metadata = {
  title: 'Car Rental — Compare 6+ Providers',
  description: 'Compare car rental prices across 6+ providers worldwide, best price guaranteed.',
  alternates: { canonical: '/car-rental/' },
};

export default function CarRentalPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white dark:from-teal-950/40 dark:via-black dark:to-black">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">Compare Car Rentals in 190+ Countries</h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">We check 6+ providers so you get the best price, every time — no hidden fees, ever.</p>
          <div className="mt-10 w-full">
            <div id="samori-car-rental-widget" className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-black/5">
              <TravelpayoutsEmbed src={CAR_RENTAL_WIDGET_SRC} />
            </div>
            <ProviderLinks
              providers={[
                { name: 'Localrent.com', href: 'https://localrent.tpx.lu/1OOSsIqj' },
                { name: 'GetRentacar.com', href: 'https://getrentacar.tpx.lu/7Nvdec8T' },
                { name: 'EconomyBookings.com', href: 'https://economybookings.tpx.lu/HUgQ67fl' },
                { name: 'BikesBooking.com', href: 'https://bikesbooking.tpx.lu/NFuAoUCG' },
                { name: 'QEEQ', href: 'https://qeeq.tpx.lu/TQd5gdhe' },
                { name: 'AutoEurope', href: 'https://autoeurope.tpx.lu/XCUYn5B6' },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="text-3xl">🔍</span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">6+ providers compared</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">One search checks every major rental provider at once.</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="text-3xl">💸</span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">Best price guarantee</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Find it cheaper elsewhere and we'll match it.</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="text-3xl">🛡️</span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">Free cancellation</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Plans change — most bookings cancel free up to pickup.</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="text-3xl">🕐</span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">24/7 roadside support</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Help is a phone call away, wherever the road takes you.</p>
          </div>
        </div>
      </section>
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Rent With Confidence</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">No hidden fees</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">The price you see at search is the price you pay at the counter — taxes and basic cover included.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Pick up (almost) anywhere</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Airport counters, city offices, and everywhere in between — pick up where it's convenient for you.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Every car size covered</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">From city runabouts to family SUVs, compare what actually fits your trip before you book.</p>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
