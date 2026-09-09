import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site-config';
import AffiliateCTA from '@/components/AffiliateCTA';

export const metadata: Metadata = {
  title: 'Best Portable Power Banks for UK Travelers (2026 Review)',
  description:
    'Four portable power banks compared on capacity, output, weight, and UK RRP, for travelers who need to keep a phone and a laptop topped up on the move.',
  alternates: {
    canonical: absoluteUrl('/guides/best-portable-power-banks-uk/'),
  },
};

// Illustrative figures for a typical model in each brand's mid-range lineup —
// confirm the exact SKU's spec sheet before publishing this guide live.
const models = [
  { brand: 'Anker', model: '(mid-range 20K class)', capacityMah: 20000, outputW: 22.5, weightG: 356, priceGBP: 40 },
  { brand: 'Belkin', model: '(mid-range 20K class)', capacityMah: 20000, outputW: 20, weightG: 372, priceGBP: 45 },
  { brand: 'Baseus', model: '(mid-range 20K class)', capacityMah: 20000, outputW: 65, weightG: 490, priceGBP: 50 },
  { brand: 'RAVPower', model: '(mid-range 20K class)', capacityMah: 20000, outputW: 18, weightG: 400, priceGBP: 35 },
];

const faqs = [
  {
    question: 'What capacity power bank do I need for a weekend trip?',
    answer: 'A 10,000–20,000mAh bank covers 2–4 full phone charges, enough for most weekend trips without a top-up.',
  },
  {
    question: 'Can I take a power bank in hand luggage?',
    answer: 'Yes, but UK and EU flights cap them at 100Wh (roughly 27,000mAh at 3.7V) in carry-on, and they are not allowed in checked luggage.',
  },
  {
    question: 'Does higher wattage output charge my phone faster?',
    answer: 'Only up to your phone’s own charging limit — beyond that, extra wattage mainly benefits laptops or fast-charging tablets.',
  },
  {
    question: 'Do power banks lose capacity over time?',
    answer: 'Yes — lithium-ion cells typically lose noticeable capacity after 300–500 charge cycles, so a 2-year-old bank will charge less than its rated capacity.',
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
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    ...models.map((m) => ({
      '@type': 'Product',
      name: `${m.brand} portable power bank`,
      brand: m.brand,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        price: m.priceGBP,
        availability: 'https://schema.org/InStock',
      },
    })),
  ],
};

export default function PowerBanksGuidePage() {
  return (
    <main>
      <h1>Best Portable Power Banks for UK Travelers (2026 Review)</h1>

      <p>
        For most UK travelers, a 20,000mAh bank from Anker or RAVPower hits the best balance of
        capacity and airline carry-on limits. If you're charging a laptop as well as a phone,
        Baseus's higher-wattage output is worth the extra weight.
      </p>

      <table>
        <caption>Comparison: capacity, output, weight, and UK RRP</caption>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Capacity (mAh)</th>
            <th>Output (W)</th>
            <th>Weight (g)</th>
            <th>UK RRP (£)</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m.brand}>
              <td>{m.brand}</td>
              <td>{m.capacityMah.toLocaleString()}</td>
              <td>{m.outputW}</td>
              <td>{m.weightG}</td>
              <td>£{m.priceGBP}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section aria-labelledby="ctas-heading">
        <h2 id="ctas-heading">Where to buy</h2>
        <ul>
          {models.map((m) => (
            <li key={m.brand}>
              <AffiliateCTA href="https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN">
                {m.brand} on Amazon UK
              </AffiliateCTA>
            </li>
          ))}
        </ul>
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
