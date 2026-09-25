import type { Metadata } from 'next';
import Newsletter from '@/components/Newsletter';
import ProviderLinks from '@/components/ProviderLinks';
import TravelpayoutsEmbed from '@/components/TravelpayoutsEmbed';
import { ESIM_WIDGET_SRC } from '@/lib/travelpayouts';

export const metadata: Metadata = {
  title: 'Travel eSIMs from $4',
  description: 'Stay connected anywhere with travel eSIMs from $4 — no roaming fees, no SIM swaps.',
  alternates: { canonical: '/esim/' },
};

export default function EsimPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white dark:from-teal-950/40 dark:via-black dark:to-black">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">Stay Connected Anywhere</h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">Travel eSIMs from $4 — no roaming fees, no SIM swaps, no surprises on your bill.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Choose Your Plan</h2>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-violet-400 to-indigo-600 text-5xl">🇪🇺</div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Europe</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">5GB / 30 days</p>
                <p className="mt-2 text-lg font-bold text-teal-600 dark:text-teal-400">$4.50</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-sky-400 to-blue-600 text-5xl">🇺🇸</div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">United States</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">3GB / 30 days</p>
                <p className="mt-2 text-lg font-bold text-teal-600 dark:text-teal-400">$6.00</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-600 text-5xl">🌏</div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Asia</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">5GB / 30 days</p>
                <p className="mt-2 text-lg font-bold text-teal-600 dark:text-teal-400">$5.00</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-amber-400 to-orange-600 text-5xl">🌍</div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Global</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">10GB / 30 days</p>
                <p className="mt-2 text-lg font-bold text-teal-600 dark:text-teal-400">$12.00</p>
              </div>
            </div>
          </div>
        </div>
        <div id="samori-esim-widget" className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-black/5">
          <TravelpayoutsEmbed src={ESIM_WIDGET_SRC} />
        </div>
        <ProviderLinks
          providers={[
            { name: 'Yesim', href: 'https://yesim.tpx.lu/2Df1Hrih' },
            { name: 'GigSky', href: 'https://gigsky.tpx.lu/znwNJYo3' },
            { name: 'Airalo', href: 'https://airalo.tpx.lu/P6A2GrV6' },
            { name: 'Drimsim', href: 'https://drimsim.tpx.lu/QymqQje4' },
            { name: 'NordVPN', href: 'https://nordvpn.tpx.lu/OZnbMTO9' },
            { name: 'Saily', href: 'https://saily.tpx.lu/jPGH22EF' },
          ]}
        />
      </section>
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">1</span>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">Choose your plan</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Pick the region and data allowance that fits your trip.</p>
            </div>
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">2</span>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">Install in seconds</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Scan a QR code — no physical SIM, no store visit, no swap.</p>
            </div>
            <div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">3</span>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-50">Land and connect</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Your eSIM activates automatically as soon as you touch down.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Why Travel With an eSIM</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">No roaming shock</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Fixed-price data plans mean no surprise charges waiting on your bill when you get home.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Keep your main number</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Your eSIM runs alongside your regular SIM, so you stay reachable on your usual number too.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Works on most modern phones</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">If your phone supports eSIM, setup takes minutes — no carrier unlock needed.</p>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
