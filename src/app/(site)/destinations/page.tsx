import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destination Guides',
  description: 'Browse every Samori World destination guide — flights, stays, things to do, and more, all in one place.',
  alternates: { canonical: '/destinations/' },
};

export default function DestinationsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">Destination Guides</h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">Flights, neighborhoods, things to do, and everything else you need to plan a trip — one guide per destination.</p>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/abu-dhabi/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/abu-dhabi/images/sheikh-zayed-grand-mosque.jpg" alt="Sheikh Zayed Grand Mosque" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Abu Dhabi</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Marble mosques, a palace turned museum, and Yas Island's theme parks</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/dubai/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/dubai/images/dubai-international-airport-dxb.jpg" alt="Dubai skyline" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Dubai</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Record-breaking towers, desert dunes, and souks in between</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/kinshasa/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/kinshasa/images/kinshasa-financial-district.jpg" alt="Kinshasa skyline" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Kinshasa</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Rumba, river life, and the pulse of Central Africa's biggest city</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/kenya/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/kenya/images/giraffe-manor.jpg" alt="Giraffes at Giraffe Manor in Kenya" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Kenya</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Safari plains, Nairobi giraffes, and white-sand coast</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/london/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/london/images/Thames-river-view-from-the-Shard.jpg" alt="Thames river view from the Shard in London" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">London</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Royal history, world-class theatre, and a skyline rebuilt one century at a time</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/doha/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/doha/images/Doha-Corniche.webp" alt="Doha skyline from the Corniche" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Doha</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Souqs, skyline towers, and desert safaris in the same afternoon</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/singapore/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/singapore/images/marina-bay-sands-night.jpg" alt="Marina Bay Sands skyline at night in Singapore" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Singapore</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Supertrees, chili crab, and a skyline that looks unreal even in person</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/kuala-lumpur/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/kuala-lumpur/images/petronas-towers-skyline.webp" alt="The Petronas Twin Towers rising above the Kuala Lumpur skyline at dusk" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Kuala Lumpur</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">A rainforest-fringed skyline, a night market a street away from every hotel, and Malaysia's best food packed into one walkable city.</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/new-york/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/new-york/images/times-square.webp" alt="Times Square New York" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">New York</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Skyscrapers, world-class museums, and a Broadway marquee on every corner</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/seychelles/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/seychelles/images/anse-source-dargent.jpg" alt="Anse Source d'Argent beach, Seychelles" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Seychelles</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Granite boulders, jungle-backed beaches, and a rainforest older than the dinosaurs</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/mauritius/">
            <div className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img src="/destinations/mauritius/images/flic-en-flac-beach.jpg" alt="Mauritius" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Mauritius</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Lagoon-blue water, a mountain shaped like a fortress, and a patch of hillside that comes in seven colours</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/paris/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/paris/images/eiffel-tower-trocadero.jpg" alt="Eiffel Tower at dusk" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Paris</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">A two-hour lunch, a world-class museum, and a floodlit iron tower, all before dinner</p>
            </div>
          </a>
          <a className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900" href="/destinations/manchester/">
            <div className="h-32 overflow-hidden">
              <img src="/destinations/manchester/images/Manchester_Cathedral.jpg" alt="Manchester Cathedral and city skyline" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Manchester</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Football rivalries, free museums, and the sound that never left Madchester</p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
