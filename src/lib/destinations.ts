export interface Destination {
  slug: string;
  title: string;
  /** One-sentence card teaser shown on the /destinations/ index grid. */
  teaser: string;
  /** Local asset path, e.g. /images/destinations/<slug>.jpg — same image used on the card and the destination page hero. */
  image: string;
  region: string;
  flyInto: string;
  currency: string;
  bestTimeToGo: string;
  suggestedStay: string;
}

// Add a new destination by appending an entry here — the /destinations/ index grid,
// the /destinations/[slug]/ page, and the sitemap are all derived from this list.
// There is no separate place to "register" a page; if it's not in this array, it
// will not appear anywhere except its own already-built URL.
export const destinations: Destination[] = [
  {
    slug: 'kinshasa',
    title: 'Kinshasa',
    teaser: 'Riverside markets, live rumba, and the pulse of Congo’s biggest city.',
    image: '/images/destinations/kinshasa.jpg',
    region: 'Africa',
    flyInto: 'FIH',
    currency: 'CDF',
    bestTimeToGo: 'June – September',
    suggestedStay: '3–5 days',
  },
  {
    slug: 'dubai',
    title: 'Dubai',
    teaser: 'Record-breaking towers, desert dunes, and souks minutes apart.',
    image: '/images/destinations/dubai.jpg',
    region: 'Middle East',
    flyInto: 'DXB',
    currency: 'AED',
    bestTimeToGo: 'November – March',
    suggestedStay: '3–4 days',
  },
  {
    slug: 'abu-dhabi',
    title: 'Abu Dhabi',
    teaser: 'Marble mosques, a palace turned museum, and Yas Island’s theme parks.',
    image: '/images/destinations/abu-dhabi.jpg',
    region: 'Middle East',
    flyInto: 'AUH',
    currency: 'AED',
    bestTimeToGo: 'November – March',
    suggestedStay: '2–3 days',
  },
  {
    slug: 'kenya',
    title: 'Kenya',
    teaser: 'Big-five safaris, Rift Valley views, and white-sand Indian Ocean coast.',
    image: '/images/destinations/kenya.jpg',
    region: 'Africa',
    flyInto: 'NBO',
    currency: 'KES',
    bestTimeToGo: 'July – October',
    suggestedStay: '5–7 days',
  },
  {
    slug: 'london',
    title: 'London',
    teaser: 'Royal history, world-class museums, and a different neighborhood on every corner.',
    image: '/images/destinations/london.jpg',
    region: 'Europe',
    flyInto: 'LHR',
    currency: 'GBP',
    bestTimeToGo: 'May – September',
    suggestedStay: '4–5 days',
  },
  {
    slug: 'doha',
    title: 'Doha',
    teaser: 'Futuristic skyline, a restored old souk, and desert safaris just outside the city.',
    image: '/images/destinations/doha.jpg',
    region: 'Middle East',
    flyInto: 'DOH',
    currency: 'QAR',
    bestTimeToGo: 'November – March',
    suggestedStay: '2–3 days',
  },
  {
    slug: 'singapore',
    title: 'Singapore',
    teaser: 'Hawker-stall food, futuristic gardens, and one of the world’s cleanest skylines.',
    image: '/images/destinations/singapore.jpg',
    region: 'Asia',
    flyInto: 'SIN',
    currency: 'SGD',
    bestTimeToGo: 'February – April',
    suggestedStay: '3–4 days',
  },
  {
    slug: 'kuala-lumpur',
    title: 'Kuala Lumpur',
    teaser: 'Twin Towers views, street-food alleys, and jungle just outside the city limits.',
    image: '/images/destinations/kuala-lumpur.jpg',
    region: 'Asia',
    flyInto: 'KUL',
    currency: 'MYR',
    bestTimeToGo: 'December – February',
    suggestedStay: '3–4 days',
  },
  {
    slug: 'new-york',
    title: 'New York',
    teaser: 'Iconic skyline, Broadway lights, and a borough’s worth of things to do in each neighborhood.',
    image: '/images/destinations/new-york.jpg',
    region: 'North America',
    flyInto: 'JFK',
    currency: 'USD',
    bestTimeToGo: 'April – June',
    suggestedStay: '4–6 days',
  },
  {
    slug: 'seychelles',
    title: 'Seychelles',
    teaser: 'Granite boulders, powder-white beaches, and some of the clearest water on earth.',
    image: '/images/destinations/seychelles.jpg',
    region: 'Africa',
    flyInto: 'SEZ',
    currency: 'SCR',
    bestTimeToGo: 'April – May',
    suggestedStay: '5–7 days',
  },
  {
    slug: 'paris',
    title: 'Paris',
    teaser: 'Iconic landmarks, world-class art, and a café on every corner.',
    image: '/images/destinations/paris.jpg',
    region: 'Europe',
    flyInto: 'CDG',
    currency: 'EUR',
    bestTimeToGo: 'April – June',
    suggestedStay: '4–5 days',
  },
  {
    slug: 'mauritius',
    title: 'Mauritius',
    teaser: 'Lagoon-blue water, volcanic peaks, and Creole, Indian, and French flavors on one island.',
    image: '/images/destinations/mauritius.jpg',
    region: 'Africa',
    flyInto: 'MRU',
    currency: 'MUR',
    bestTimeToGo: 'May – December',
    suggestedStay: '5–7 days',
  },
  {
    slug: 'manchester',
    title: 'Manchester',
    teaser: 'Red-brick history, a legendary football rivalry, and the sound that never left Madchester.',
    image: '/images/destinations/manchester.jpg',
    region: 'Europe',
    flyInto: 'MAN',
    currency: 'GBP',
    bestTimeToGo: 'May – September',
    suggestedStay: '3–4 days',
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
