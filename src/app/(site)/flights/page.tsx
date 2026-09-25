import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import ProviderLinks from '@/components/ProviderLinks';
import TravelpayoutsEmbed from '@/components/TravelpayoutsEmbed';
import { FLIGHTS_WIDGET_SRC } from '@/lib/travelpayouts';

export const metadata: Metadata = {
  title: 'Cheap Flights Worldwide',
  description: 'Compare hundreds of airlines in seconds and lock in the lowest fare with Samori World.',
  alternates: { canonical: '/flights/' },
};

export default function FlightsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white dark:from-teal-950/40 dark:via-black dark:to-black">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">Find Cheap Flights Worldwide</h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">Compare hundreds of airlines in seconds and lock in the lowest fare — no tab-hopping required.</p>
          <div className="mt-10 w-full">
            <TravelpayoutsEmbed src={FLIGHTS_WIDGET_SRC} className="mx-auto w-full max-w-3xl" />
            <ProviderLinks
              providers={[
                { name: 'Kiwi.com', href: 'https://kiwi.tpx.lu/NKSDD3DR' },
                { name: 'Aviasales', href: 'https://aviasales.tpx.lu/DrJFkATY' },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Popular Routes</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-600 text-5xl">🏝️</div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">New York → Bali</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">from $412</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-amber-400 to-orange-600 text-5xl">🏛️</div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">London → Rome</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">from $58</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-fuchsia-400 to-purple-600 text-5xl">🏯</div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Los Angeles → Tokyo</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">from $389</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-orange-400 to-red-600 text-5xl">🕌</div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Paris → Marrakech</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">from $74</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Flight delayed or cancelled?</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">You could be owed compensation — check in two minutes.</p>
          <ProviderLinks
            providers={[
              { name: 'AirHelp', href: 'https://airhelp.tpx.lu/jEv1oLye' },
              { name: 'CompensAir', href: 'https://compensair.tpx.lu/dAbXrWIt' },
            ]}
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Traveling by ferry or cruise?</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Compare sea routes and crossings alongside your flight search.</p>
          <ProviderLinks
            providers={[
              { name: 'Searadar', href: 'https://searadar.tpx.lu/63boYchk' },
            ]}
          />
        </div>
      </section>
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Fly Smarter</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Hundreds of airlines, one search</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">We scan budget carriers and major airlines side by side, so you don't miss the cheaper option buried on another site.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Flexible date search</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">See how price shifts a day either way before you commit — sometimes a Tuesday flight saves you real money.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Delay & cancellation cover</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Add flight delay compensation at checkout, so a missed connection doesn't turn into a missed refund.</p>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
