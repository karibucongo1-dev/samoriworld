import type { Metadata } from 'next';
import ProviderLinks from '@/components/ProviderLinks';
import JsonLd from '@/components/JsonLd';
import TravelpayoutsEmbed from '@/components/TravelpayoutsEmbed';
import { absoluteUrl } from '@/lib/site-config';
import { FLIGHTS_WIDGET_SRC } from '@/lib/travelpayouts';

export const metadata: Metadata = {
  title: { absolute: 'Samori World | Travel Guides, Flights, Hotels & eSIMs' },
  description: 'Destination guides plus flight, hotel, car rental, activity and eSIM search from our booking partners, all in one place.',
  alternates: { canonical: '/' },
  verification: { other: { 'msvalidate.01': 'E5792D0FB6EFD26152D8A101967A9775' } },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': absoluteUrl('/#organization'),
          name: 'Samori World',
          url: absoluteUrl('/'),
          email: 'info@samori.net',
        }}
      />
      {/* samori-hero.css and /images/samori-hero-a380.jpg are static files in public/. */}
      <link rel="stylesheet" href="/samori-hero.css" precedence="default" />
      <section className="samori-hero">
        <div className="samori-hero__stage">
          <div className="samori-hero__bg">
            <img alt="Airbus A380 flying above the clouds" className="samori-hero__img" src="/images/samori-hero-a380.jpg" width="934" height="887" fetchPriority="high" />
          </div>
          <div className="samori-hero__copy">
            <p className="samori-hero__eyebrow">Your world, your way</p>
            <h1 className="samori-hero__title">
              <span>Your next adventure</span> <span className="samori-hero__accent">starts here.</span>
            </h1>
            <p className="samori-hero__text">Discover flights, stays and experiences for your next escape.</p>
            <div className="samori-hero__buttons">
              <a className="samori-hero__btn samori-hero__btn--primary" href="/flights/">
                Explore flights<span aria-hidden="true">→</span>
              </a>
              <a className="samori-hero__btn samori-hero__btn--outline" href="/destinations/">
                Discover destinations<span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="absolute inset-x-6 bottom-0 translate-y-1/2 sm:inset-x-16">
            <TravelpayoutsEmbed src={FLIGHTS_WIDGET_SRC} className="mx-auto w-full max-w-3xl" />
          </div>
        </div>
        <div className="h-14 sm:h-16" aria-hidden="true"></div>
      </section>
      <ProviderLinks
        className="mt-4 flex flex-wrap items-center justify-center gap-2 py-4 bg-white dark:bg-zinc-950"
        providers={[
          { name: 'Aviasales', href: 'https://aviasales.tpx.lu/DrJFkATY' },
          { name: 'Kiwi.com', href: 'https://kiwi.tpx.lu/NKSDD3DR' },
        ]}
      />
      <section aria-label="Photo journey: flights, hotels, things to do, and staying connected" className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="group relative h-56 overflow-hidden rounded-2xl sm:h-72">
            <img alt="Airplane wing above the clouds at sunset" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" style={{ position: 'absolute', height: '100%', width: '100%', left: '0', top: '0', right: '0', bottom: '0', color: 'transparent' }} src="https://images.unsplash.com/photo-1527605158555-853f200063e9?q=80&amp;w=2400&amp;auto=format&amp;fit=crop" />
            <a href="https://unsplash.com/@wbayreuther" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 backdrop-blur-sm transition-colors hover:text-white">Photo: William Bayreuther / Unsplash</a>
          </div>
          <div className="group relative h-56 overflow-hidden rounded-2xl sm:h-72">
            <img alt="Airplane cabin interior" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" style={{ position: 'absolute', height: '100%', width: '100%', left: '0', top: '0', right: '0', bottom: '0', color: 'transparent' }} src="https://images.unsplash.com/photo-1588861452134-b67de4c19739?q=80&amp;w=2400&amp;auto=format&amp;fit=crop" />
            <a href="https://unsplash.com/@reisetopia" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 backdrop-blur-sm transition-colors hover:text-white">Photo: reisetopia / Unsplash</a>
          </div>
          <div className="group relative h-56 overflow-hidden rounded-2xl sm:h-72">
            <img alt="Marble hotel lobby with chandelier" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" style={{ position: 'absolute', height: '100%', width: '100%', left: '0', top: '0', right: '0', bottom: '0', color: 'transparent' }} src="https://images.unsplash.com/photo-1775866914943-ba1415a35afc?q=80&amp;w=2400&amp;auto=format&amp;fit=crop" />
            <a href="https://unsplash.com/@dynamic_hk" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 backdrop-blur-sm transition-colors hover:text-white">Photo: Dynamic Hong Kong / Unsplash</a>
          </div>
          <div className="group relative h-56 overflow-hidden rounded-2xl sm:h-72">
            <img alt="Mosque dome and minaret architecture" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" style={{ position: 'absolute', height: '100%', width: '100%', left: '0', top: '0', right: '0', bottom: '0', color: 'transparent' }} src="https://images.unsplash.com/photo-1581141444721-0e6f8fa8397e?q=80&amp;w=2400&amp;auto=format&amp;fit=crop" />
            <a href="https://unsplash.com/@gabutproduction" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 backdrop-blur-sm transition-colors hover:text-white">Photo: Gabut Production / Unsplash</a>
          </div>
          <div className="group relative h-56 overflow-hidden rounded-2xl sm:h-72">
            <img alt="Camel caravan crossing desert dunes at sunset" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-105" style={{ position: 'absolute', height: '100%', width: '100%', left: '0', top: '0', right: '0', bottom: '0', color: 'transparent' }} src="https://images.unsplash.com/photo-1760779887188-a49c256860d6?q=80&amp;w=2400&amp;auto=format&amp;fit=crop" />
            <a href="https://unsplash.com/@abhijithpn" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 backdrop-blur-sm transition-colors hover:text-white">Photo: Abhijith Pn / Unsplash</a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">This Week's Best Finds</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/doha/">
            <div className="h-40 overflow-hidden"><img src="/destinations/doha/images/Doha-Corniche.webp" alt="Doha skyline from the Corniche" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" /></div>
            <div className="p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Doha, here we come</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Souqs, skyline towers and desert safaris</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/things-to-do/">
            <div className="h-40 overflow-hidden"><img src="/destinations/rome/images/colosseum-rome.jpg" alt="The Colosseum in Rome" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" /></div>
            <div className="p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Rome in a day</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Skip-the-line Colosseum tickets and tours</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/esim/">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-violet-400 to-indigo-600 text-6xl">🌐</div>
            <div className="p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Stay connected anywhere</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Compare travel eSIM data plans</p>
            </div>
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Where To Next?</h2>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">From weekend city breaks to once-in-a-lifetime trips — we've got the guide, the flight, and the ride sorted.</p>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/dubai/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/dubai/images/dubai-international-airport-dxb.jpg" alt="Dubai skyline" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Dubai</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Record-breaking towers, desert dunes, and souks in between</p>
            </div>
          </a>
        </div>
      </section>
      <section className="bg-zinc-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Travel Smarter, Not Harder</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">We compare, so you don't have to</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">We check multiple providers for flights, cars, and activities — no more tab-hopping across ten booking sites.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Real guides, not just search boxes</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Every destination page comes with practical, no-fluff advice: where to stay, how to get around, and what's actually worth doing.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Book with confidence</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">From flight delay compensation to travel eSIMs, we help you plan for the trip — and for when things don't go to plan.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
