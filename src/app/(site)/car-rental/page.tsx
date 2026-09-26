import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import ProviderLinks from '@/components/ProviderLinks';
import TravelpayoutsEmbed from '@/components/TravelpayoutsEmbed';
import { CAR_RENTAL_WIDGET_SRC } from '@/lib/travelpayouts';

export const metadata: Metadata = {
  title: 'Car Rental — Find a Rental Car',
  description: 'Search local rental companies with Localrent, or compare with our other partners. Clear prices and low deposits.',
  alternates: { canonical: '/car-rental/' },
};

export default function CarRentalPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white dark:from-teal-950/40 dark:via-black dark:to-black">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">Find a Rental Car for Your Trip</h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">Search local rental companies with Localrent, or compare with our other partners below. Clear prices and low deposits.</p>
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
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">Local rental companies</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Localrent lists cars from trusted local firms, often with low deposits.</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="text-3xl">💸</span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">More partners to compare</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Check our other partners above for more cars and prices.</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="text-3xl">🛡️</span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">Flexible bookings</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Many rentals allow free or low-cost cancellation. Check the terms before you book.</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <span className="text-3xl">🕐</span>
            <span className="mt-2 block font-semibold text-zinc-900 dark:text-zinc-50">Help when you need it</span>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Localrent offers 24/7 English-speaking support for its bookings.</p>
          </div>
        </div>
      </section>
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Rent With Confidence</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Clear prices</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Localrent shows the deposit and what insurance is included before you book. Read the rental terms too.</p>
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
