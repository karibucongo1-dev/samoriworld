export interface Review {
  slug: string;
  title: string;
  brand: string;
  category: string;
  /** UK RRP in GBP. Null where the real current price needs to be confirmed before publishing. */
  priceGBP: number | null;
  /** 2-sentence direct verdict for AI search engines, shown at the top of the page. */
  verdict: string;
  specs: Record<string, string>;
  affiliateUrl: string;
  /**
   * False means the specs/price below are placeholders inserted to keep the schema
   * consistent — verify against the real product page before this goes live.
   */
  verified: boolean;
}

// Add a product by appending an entry here — the [slug] page and sitemap are both
// derived from this list, and canonical is derived from the slug, so a new page
// can't ship without a canonical tag the way the un-canonicalized samori.co.uk
// review pages did.
export const reviews: Review[] = [
  {
    slug: 'tangem',
    title: 'Tangem Wallet Review',
    brand: 'Tangem',
    category: 'Crypto hardware wallet',
    priceGBP: 45,
    verdict:
      'The Tangem Wallet is a card-based, NFC-only hardware wallet with no battery or screen, trading a few advanced features for genuine pocketability. It suits UK buyers who want offline crypto storage without learning a new device interface.',
    specs: {
      Form: 'Set of 2–3 NFC cards',
      Connectivity: 'NFC (tap to phone)',
      Battery: 'None required',
      'Supported assets': '6,000+ coins and tokens',
      Screen: 'None',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: true,
  },
  {
    slug: 'keurig',
    title: 'Keurig K-Mini Review',
    brand: 'Keurig',
    category: 'Pod coffee maker',
    priceGBP: 80,
    verdict:
      'The Keurig K-Mini is a single-serve pod coffee maker built for small kitchens, brewing one cup at a time with almost no counter footprint. It’s a good fit for UK buyers who value space over brew customization.',
    specs: {
      Capacity: '1 cup / 355ml reservoir',
      'Cup sizes': '6, 8, 10 oz',
      Dimensions: '~11.6 x 24.4 x 30.9 cm',
      'Pod type': 'K-Cup pods',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: true,
  },
  {
    slug: 'ninja-ultracrush',
    title: 'Ninja UltraCrush Blender Review',
    brand: 'Ninja',
    category: 'Personal blender',
    priceGBP: 90,
    verdict:
      'The Ninja UltraCrush is a compact personal blender built around Ninja’s crushing blade design, aimed at smoothies and shakes rather than large-batch blending. It’s best for UK buyers blending single servings daily.',
    specs: {
      Jar: 'Personal cup with to-go lid',
      Blade: 'Ninja crushing blade',
      Settings: 'Single-speed pulse',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: false,
  },
  {
    slug: 'echo-dot',
    title: 'Amazon Echo Dot Review',
    brand: 'Amazon',
    category: 'Smart speaker',
    priceGBP: 45,
    verdict:
      'The Echo Dot remains the cheapest way into the Alexa ecosystem, with noticeably better bass than earlier generations for its size. It’s the right pick for UK buyers who want voice control and smart-home hub duties in one small speaker.',
    specs: {
      Assistant: 'Alexa',
      Connectivity: 'Wi‑Fi, Bluetooth',
      'Smart home hub': 'Yes (Zigbee on some variants)',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: true,
  },
  {
    slug: 'airpods-pro-3',
    title: 'Apple AirPods Pro 3 Review',
    brand: 'Apple',
    category: 'Wireless earbuds',
    priceGBP: 229,
    verdict:
      'AirPods Pro 3 push active noise cancellation and fit further ahead of the competition, with a heart-rate sensor aimed at workout tracking. They’re a strong pick for UK buyers already inside the Apple ecosystem.',
    specs: {
      'Noise cancellation': 'Active (improved over Pro 2)',
      Charging: 'USB-C, wireless case',
      'Extra sensors': 'Heart-rate sensor',
      'Water resistance': 'IP57',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: true,
  },
  {
    slug: 'logitech-g305',
    title: 'Logitech G305 Lightspeed Review',
    brand: 'Logitech',
    category: 'Wireless gaming mouse',
    priceGBP: 40,
    verdict:
      'The G305 pairs Logitech’s Lightspeed wireless with a genuinely lightweight shell and single-AA battery life measured in months, not days. It’s an easy recommendation for UK buyers who want wireless gaming performance without a premium price.',
    specs: {
      Sensor: 'HERO, up to 12,000 DPI',
      Weight: '~99g (with battery)',
      Battery: '1x AA, ~250 hours',
      Connectivity: 'Lightspeed 2.4GHz wireless',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: true,
  },
  {
    slug: 'neo2',
    title: 'Neo2 Review',
    brand: 'TBD',
    category: 'TBD',
    priceGBP: null,
    verdict:
      'Placeholder verdict — replace with real product details before publishing. This entry exists to demonstrate the review-page schema.',
    specs: {
      Note: 'Specs not yet confirmed — replace before publishing',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: false,
  },
  {
    slug: 'lito1',
    title: 'Lito1 Review',
    brand: 'TBD',
    category: 'TBD',
    priceGBP: null,
    verdict:
      'Placeholder verdict — replace with real product details before publishing. This entry exists to demonstrate the review-page schema.',
    specs: {
      Note: 'Specs not yet confirmed — replace before publishing',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: false,
  },
  {
    slug: 'mini2',
    title: 'Mini2 Review',
    brand: 'TBD',
    category: 'TBD',
    priceGBP: null,
    verdict:
      'Placeholder verdict — replace with real product details before publishing. This entry exists to demonstrate the review-page schema.',
    specs: {
      Note: 'Specs not yet confirmed — replace before publishing',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: false,
  },
  {
    slug: 'umitec',
    title: 'Umitec Review',
    brand: 'TBD',
    category: 'TBD',
    priceGBP: null,
    verdict:
      'Placeholder verdict — replace with real product details before publishing. This entry exists to demonstrate the review-page schema.',
    specs: {
      Note: 'Specs not yet confirmed — replace before publishing',
    },
    affiliateUrl: 'https://www.amazon.co.uk/dp/REPLACE_WITH_ASIN',
    verified: false,
  },
];

export function getReview(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}
