import type { Metadata } from 'next';
import TravelpayoutsWidget from '@/components/TravelpayoutsWidget';

export const metadata: Metadata = {
  title: 'Budget Travel Guide to Bali on $40 a Day',
  description:
    'How to see Bali on roughly $40 a day: where to sleep, eat, and get around without blowing the budget.',
  alternates: {
    canonical: 'https://www.samori.net/blog/bali-budget-guide/',
  },
};

const dailyCosts = [
  { category: 'Hotels', estimate: '$12–18/night', notes: 'Budget guesthouse or hostel private room' },
  { category: 'Food', estimate: '$10–15/day', notes: 'Warungs and local markets, one nicer meal' },
  { category: 'Transport', estimate: '$6–10/day', notes: 'Scooter rental + fuel, or Grab rides' },
];

const faqs = [
  {
    question: 'Is $40 a day realistic for Bali?',
    answer:
      'Yes — staying in budget guesthouses, eating at local warungs, and renting a scooter keeps most travelers comfortably within $40/day outside of peak season.',
  },
  {
    question: 'What is the cheapest way to get around Bali?',
    answer: 'Renting a scooter (around $5–7/day including fuel) is cheaper than taxis or Grab for most itineraries.',
  },
  {
    question: 'When is the cheapest time to visit Bali?',
    answer: 'The shoulder seasons (April–June and September–October) offer lower accommodation prices with still-good weather.',
  },
  {
    question: 'Do I need to book accommodation in advance?',
    answer: 'Not strictly, but booking 1–2 nights ahead avoids arriving late with no room, especially in Canggu and Ubud.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'TouristAttraction',
      name: 'Bali',
      description: 'Island destination in Indonesia known for beaches, rice terraces, and budget-friendly travel.',
      touristType: ['Budget travelers', 'Backpackers'],
    },
  ],
};

export default function BaliBudgetGuidePage() {
  return (
    <main>
      <h1>Budget Travel Guide to Bali on $40 a Day</h1>

      <p>
        You can comfortably travel Bali on about $40 a day by staying in budget guesthouses,
        eating at local warungs, and renting a scooter instead of taking taxis. This guide breaks
        down exactly where that budget goes and how to stretch it further.
      </p>

      <table>
        <caption>Estimated daily costs</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Estimate</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {dailyCosts.map((row) => (
            <tr key={row.category}>
              <td>{row.category}</td>
              <td>{row.estimate}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section aria-labelledby="flights-heading">
        <h2 id="flights-heading">Find flights to Bali</h2>
        <TravelpayoutsWidget
          id="bali-flights"
          src="https://tp.media/content?currency=usd&trs=YOUR_MARKER&shmarker=YOUR_MARKER&type=compact&powered_by=false&destination=DPS"
          height={300}
          fallback={
            <table>
              <caption>Typical round-trip flight ranges to Denpasar (DPS)</caption>
              <thead>
                <tr>
                  <th>Route type</th>
                  <th>Typical price range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Regional (Southeast Asia)</td>
                  <td>$60–150</td>
                </tr>
                <tr>
                  <td>Long-haul (US/Europe)</td>
                  <td>$500–900</td>
                </tr>
              </tbody>
            </table>
          }
        />
      </section>

      <section aria-labelledby="hotels-heading">
        <h2 id="hotels-heading">Where to stay</h2>
        <TravelpayoutsWidget
          id="bali-hotel-map"
          src="https://tp.media/content?currency=usd&trs=YOUR_MARKER&shmarker=YOUR_MARKER&type=hotel_map&lat=-8.409518&lng=115.188916"
          height={400}
          fallback={
            <p>
              Budget guesthouses cluster around Canggu, Ubud, and Kuta, typically running
              $12–18/night for a private room.
            </p>
          }
        />
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading">FAQ</h2>
        <dl>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt>{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
