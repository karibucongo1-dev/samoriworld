'use client';

import { useState } from 'react';

/* Hotel search that opens Klook's hotel results, tracked through Travelpayouts
   (Klook programme 137). Klook needs its own numeric city id, so destinations
   are a fixed list. Look up new ids on klook.com/hotels: the search result URL
   shows city_id. Kinshasa and the Seychelles have no Klook city search. */
const DESTINATIONS = [
  { id: 106, title: 'London', override: 'London, United Kingdom' },
  { id: 78, title: 'Dubai', override: 'Dubai, United Arab Emirates' },
  { id: 131, title: 'Abu Dhabi', override: 'Abu Dhabi, United Arab Emirates' },
  { id: 162, title: 'Doha', override: 'Doha, Qatar' },
  { id: 7191, title: 'Nairobi', override: 'Nairobi, Kenya' },
  { id: 20245, title: 'Mombasa', override: 'Mombasa, Kenya' },
  { id: 40117052, title: 'Zanzibar', override: 'Zanzibar, Tanzania' },
  { id: 14, title: 'Mauritius', override: 'Mauritius' },
  { id: 107, title: 'Paris', override: 'Paris, France' },
  { id: 93, title: 'New York', override: 'New York, United States' },
  { id: 6, title: 'Singapore', override: 'Singapore' },
  { id: 49, title: 'Kuala Lumpur', override: 'Kuala Lumpur, Malaysia' },
  { id: 703018, title: 'Bali (Ubud)', override: 'Ubud, Bali, Indonesia' },
];

const TRACKED = 'https://tp.media/r?campaign_id=137&marker=746332&p=4110&trs=551169&u=';

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function addDays(day: string, n: number) {
  const d = new Date(day + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
}

const box = 'flex flex-1 flex-col gap-1 rounded-xl px-3 py-2 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800';
const label = 'text-xs font-medium text-zinc-500 dark:text-zinc-400';
const input = 'bg-transparent text-sm font-medium text-zinc-900 outline-none dark:text-zinc-100 [color-scheme:light] dark:[color-scheme:dark]';
const divider = <div className="hidden h-8 w-px bg-zinc-200 dark:bg-zinc-700 sm:block" />;

export default function KlookHotelSearch() {
  const [city, setCity] = useState(String(DESTINATIONS[0].id));
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2');
  const [error, setError] = useState('');

  function search(e: React.FormEvent) {
    e.preventDefault();
    const today = iso(new Date());
    const dest = DESTINATIONS.find((d) => String(d.id) === city) ?? DESTINATIONS[0];
    const ci = checkIn || addDays(today, 14);
    const co = checkOut || addDays(ci, 3);
    if (ci < today) return setError('Check-in cannot be in the past.');
    if (co <= ci) return setError('Check-out must be after check-in.');
    setError('');
    const params = new URLSearchParams({
      city_id: String(dest.id), stype: 'city', svalue: String(dest.id),
      title: dest.title, override: dest.override,
      check_in: ci, check_out: co, adult_num: adults, child_num: '0', room_num: '1', age: '',
    });
    const target = 'https://www.klook.com/en-GB/hotels/searchresult/?' + params.toString();
    window.open(TRACKED + encodeURIComponent(target), '_blank', 'noopener');
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form
        onSubmit={search}
        className="flex w-full flex-col gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-xl shadow-teal-900/5 dark:border-white/10 dark:bg-zinc-900 sm:flex-row sm:items-center sm:gap-2 sm:p-2"
      >
        <label className={box}>
          <span className={label}>Destination</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className={input}>
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </label>
        {divider}
        <label className={box}>
          <span className={label}>Check-in</span>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={input} />
        </label>
        {divider}
        <label className={box}>
          <span className={label}>Check-out</span>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={input} />
        </label>
        {divider}
        <label className={box}>
          <span className={label}>Adults</span>
          <select value={adults} onChange={(e) => setAdults(e.target.value)} className={input}>
            {['1', '2', '3', '4', '5', '6'].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="mt-1 shrink-0 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 sm:mt-0"
        >
          Search Hotels
        </button>
      </form>
      {error && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Opens hotel results on Klook in a new tab. We may earn a commission if you book, at no extra cost to you.
      </p>
    </div>
  );
}
