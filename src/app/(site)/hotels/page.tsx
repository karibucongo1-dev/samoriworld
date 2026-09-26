import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import KlookHotelSearch from '@/components/KlookHotelSearch';

export const metadata: Metadata = {
  title: 'Hotels — Compare Booking.com, Agoda & More',
  description: 'Compare hotel prices across Booking.com, Agoda, and more worldwide, best price guaranteed.',
  alternates: { canonical: '/hotels/' },
};

export default function HotelsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white dark:from-teal-950/40 dark:via-black dark:to-black">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">Find the Right Stay, Every Time</h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">We check Booking.com, Agoda, and more so you get the best rate — free cancellation on most stays.</p>
          <div className="mt-10 w-full">
            <KlookHotelSearch />
          </div>
        </div>
      </section>
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Book With Confidence</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Compare across providers</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">We check Booking.com, Agoda, and more side by side, so you don't have to tab-hop for the best rate.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Free cancellation on most stays</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Plans change — book flexible rates that let you cancel free right up until check-in.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Verified guest reviews</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">See what real travelers thought before you book, not just polished listing photos.</p>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
