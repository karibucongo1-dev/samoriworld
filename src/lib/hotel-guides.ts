import type { SiteId } from './site-config';

export interface HotelArea {
  heading: string;
  paragraphs: string[];
  goodFor?: string;
  skipIf?: string;
  activityBlurb?: string;
  cta?: { label: string; href: string };
  dayTrips?: { label: string; text: string }[];
}

export interface HotelGuide {
  key: string;
  site: SiteId;
  title: string;
  heroSubtitle: string;
  areas: HotelArea[];
  comparisonTable: { headers: string[]; rows: string[][] };
  faqs: { question: string; answer: string }[];
  closingPrefix: string;
  closingSuffix: string;
}

const KKDAY = 'https://kkday.tpx.lu/ZLXJZHmI';
const KLOOK = 'https://klook.tpx.lu/IuA9MdDP';

export const hotelGuides: HotelGuide[] = [
  {
    key: 'dubai',
    site: 'samori-net',
    title: 'Where to Stay in Dubai',
    heroSubtitle:
      "Dubai is spread out, and picking the wrong base can mean an hour of taxi rides every day. Here's how to choose the right area for your trip — plus the stays and experiences worth booking alongside it.",
    areas: [
      {
        heading: 'Downtown Dubai — Best for First-Timers',
        paragraphs: [
          'Home to the Burj Khalifa and Dubai Mall, Downtown is the most convenient base if this is your first visit. Everything from fountain shows to world-class shopping is walkable.',
        ],
        goodFor: 'first-time visitors, couples, anyone who wants to be near the icons',
        skipIf: 'you want a beach on your doorstep or a quieter, local feel',
        activityBlurb:
          'While you\'re based here, the Burj Khalifa "At the Top" observation deck and a Dubai Fountain dinner cruise are the two experiences most worth booking in advance:',
        cta: { label: 'Browse Downtown Dubai tours & attractions on KKday', href: KKDAY },
      },
      {
        heading: 'Dubai Marina & JBR — Best for Beach + Nightlife',
        paragraphs: [
          "A high-rise waterfront strip with direct beach access, a lively promenade (The Walk), and the Marina's boat and yacht scene. This is where most first-time visitors *think* they want to stay after seeing it on Instagram — and for good reason.",
        ],
        goodFor: 'beach lovers, groups, nightlife, families wanting resort-style stays',
        skipIf: 'you want to be close to Old Dubai or the souks',
        activityBlurb:
          'Marina-based travelers usually pair their stay with a desert safari or a dhow cruise dinner — both easy to book same-week:',
        cta: { label: 'See Dubai Marina activities & desert safaris on Klook', href: KLOOK },
      },
      {
        heading: 'Deira & Bur Dubai — Best for Culture and Budget',
        paragraphs: [
          'The older, more traditional side of the city — gold souks, spice markets, the Dubai Creek abra (water taxi) crossing, and noticeably lower hotel prices than Downtown or the Marina.',
        ],
        goodFor: 'budget travelers, culture-focused trips, repeat visitors',
        skipIf: 'it\'s your first time and you want the "postcard" Dubai skyline nearby',
        activityBlurb: 'A creek abra ride and a half-day Old Dubai walking tour are the standout add-ons here:',
        cta: { label: 'Find Old Dubai & creek tours on KKday', href: KKDAY },
      },
      {
        heading: 'Palm Jumeirah — Best for a Splurge',
        paragraphs: [
          'The man-made island is almost entirely resort hotels, so this is less a "neighborhood" and more a destination in itself. Expect higher prices and a more resort-holiday pace than a city-trip pace.',
        ],
        goodFor: 'honeymoons, special occasions, resort-only trips',
        skipIf: "you're planning to sightsee across the city daily — taxis to/from Palm add up",
        activityBlurb: 'Pair a Palm stay with an Atlantis Aquaventure day pass or a sunset yacht tour:',
        cta: { label: 'Check Palm Jumeirah experiences on Klook', href: KLOOK },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['Downtown', 'First-timers', 'Iconic, central', '$$$'],
        ['Marina/JBR', 'Beach + nightlife', 'Lively, resort-casual', '$$ - $$$'],
        ['Deira/Bur Dubai', 'Culture, budget', 'Traditional, local', '$'],
        ['Palm Jumeirah', 'Splurge trips', 'Resort island', '$$$$'],
      ],
    },
    faqs: [
      {
        question: 'How many nights do I need in Dubai?',
        answer:
          '3–4 nights covers the highlights comfortably; 5+ if you want to add a desert overnight stay or a day trip to Abu Dhabi.',
      },
      {
        question: 'Should I split my stay across two areas?',
        answer:
          'It works well: e.g., 2 nights Downtown + 2 nights Marina, so you get both the city core and the beach without long transfers.',
      },
      {
        question: 'Is Dubai walkable?',
        answer:
          'Within a neighborhood, yes. Between neighborhoods, no — the city is built around highways, so plan on metro, taxi, or ride-share for anything cross-town.',
      },
    ],
    closingPrefix: 'Ready to book? Compare live rates for these areas on',
    closingSuffix: ', or lock in tours and activities above through our KKday and Klook partners.',
  },
  {
    key: 'kenya',
    site: 'samori-net',
    title: 'Where to Stay in Kenya',
    heroSubtitle:
      "Kenya isn't a one-base trip — most itineraries split time between Nairobi, a safari region, and often the coast. Here's how to structure it.",
    areas: [
      {
        heading: 'Nairobi — Best for Your First & Last Night',
        paragraphs: [
          "Nairobi is less a destination in itself and more a practical hub: international flights land here, and it's the jumping-off point for safaris. Most travelers spend 1 night on arrival and 1 on departure, not much more.",
        ],
        goodFor: 'flight connections, a buffer night, pre-safari shopping/logistics',
        skipIf: "you're trying to maximize safari time — don't linger here",
        activityBlurb:
          'While in Nairobi, the Giraffe Centre and Nairobi National Park (yes, a national park inside city limits) are worth the half-day:',
        cta: { label: 'Browse Nairobi day tours on KKday', href: KKDAY },
      },
      {
        heading: 'Maasai Mara & Safari Lodges — The Main Event',
        paragraphs: [
          'This is where most of the trip budget and time should go. Lodges range from mid-range tented camps to ultra-luxury private conservancies. Booking accommodation here is really booking the safari experience itself — game drives are usually included or bundled.',
        ],
        goodFor: 'the core wildlife experience — Big Five, the wildebeest migration (July–October)',
        skipIf: "you're on a tight timeline; even 2 nights here beats 1 night each in three places",
        activityBlurb:
          'Multi-day Maasai Mara safari packages (transport + lodging + game drives bundled) are best booked as a package rather than piecing together lodging and activities separately:',
        cta: { label: 'See Maasai Mara safari packages on Klook', href: KLOOK },
      },
      {
        heading: 'Diani Beach & the Coast — Best for Unwinding After Safari',
        paragraphs: [
          'After days of early-morning game drives, most travelers add 3–4 nights on the coast — Diani Beach or Mombasa — to decompress. White sand, warm water, a completely different pace.',
        ],
        goodFor: 'post-safari relaxation, honeymoons, beach time',
        skipIf: 'your trip is short and safari is the priority — coast is the first thing to cut',
        activityBlurb: 'Dhow sailing trips and snorkeling excursions are the top add-ons along this coast:',
        cta: { label: 'Find coastal activities on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Typical Stay'],
      rows: [
        ['Nairobi', 'Transit, logistics', 'Urban, functional', '1–2 nights'],
        ['Maasai Mara', 'Wildlife safari', 'Remote, immersive', '3–4 nights'],
        ['Diani/Mombasa Coast', 'Relaxation', 'Beach resort', '3–4 nights'],
      ],
    },
    faqs: [
      {
        question: 'How long should a Kenya trip be?',
        answer: '7–10 days lets you comfortably do Nairobi + Mara + coast without feeling rushed.',
      },
      {
        question: "When's the best time to visit?",
        answer: 'July–October for the wildebeest migration; January–February for calving season and fewer crowds.',
      },
      {
        question: 'Do I need to book lodges separately from safaris?',
        answer:
          'Usually no — most Mara accommodation is sold as part of a safari package including transport and game drives, which is simpler than booking each piece independently.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel and lodge rates on',
    closingSuffix: ', or lock in safaris and coastal activities above through our KKday and Klook partners.',
  },
  {
    key: 'london',
    site: 'samori-net',
    title: 'Where to Stay in London',
    heroSubtitle:
      'London is huge, and the "right" area depends heavily on what kind of trip you\'re after — history and icons, riverside culture, or a more local, less touristy feel.',
    areas: [
      {
        heading: 'Westminster & Central London — Best for First-Timers',
        paragraphs: [
          'Big Ben, Westminster Abbey, Buckingham Palace, and the West End theatre district are all within walking distance or a short Tube ride. This is the highest-priced area, but it minimizes travel time between sights.',
        ],
        goodFor: 'first-time visitors, short trips, theatre-goers',
        skipIf: 'you want a quieter, more residential feel or lower prices',
        activityBlurb:
          'A West End show and a Thames sightseeing cruise are the two bookings most worth locking in ahead of time:',
        cta: { label: 'Browse Central London tours & shows on KKday', href: KKDAY },
      },
      {
        heading: 'South Bank — Best for Culture and Views',
        paragraphs: [
          'Home to the London Eye, Tate Modern, Borough Market, and some of the best skyline views across the Thames toward Westminster. Slightly less central than Westminster, but with a livelier, more walkable riverside feel.',
        ],
        goodFor: 'museum-goers, foodies, couples wanting river views',
        skipIf: 'you want to be right next to the palace/parliament sights',
        activityBlurb:
          'The London Eye and a Tower Bridge + Tower of London combo ticket are the standout bookings from this base:',
        cta: { label: 'See South Bank attractions on Klook', href: KLOOK },
      },
      {
        heading: 'Shoreditch & East London — Best for a Local Feel',
        paragraphs: [
          "Street art, independent coffee shops, Brick Lane's curry houses, and a younger, more residential vibe. Further from the postcard sights, but well-connected by Tube and Overground, and noticeably better value.",
        ],
        goodFor: 'repeat visitors, budget-conscious trips, anyone wanting a "lived-in" London',
        skipIf: "it's your first visit and you want to minimize travel time to major sights",
        activityBlurb: 'A Brick Lane food tour and East End street art walking tour are the best-fit activities here:',
        cta: { label: 'Find East London tours on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['Westminster/Central', 'First-timers', 'Iconic, central', '$$$$'],
        ['South Bank', 'Culture, views', 'Riverside, lively', '$$$'],
        ['Shoreditch/East London', 'Local feel, value', 'Trendy, residential', '$$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in London?',
        answer: '4–5 days covers the major sights without rushing; 3 days works for a tighter city-break.',
      },
      {
        question: 'Is the Tube easy to use from any of these areas?',
        answer:
          'Yes — all three are well-served by Tube or Overground, so no area is truly "inconvenient," just further from central sights.',
      },
      {
        question: 'Best time of year to visit?',
        answer: 'Late spring (May–June) or early autumn (September) for good weather with fewer crowds than peak summer.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates across these areas on',
    closingSuffix: ', or lock in the tours above through our KKday and Klook partners.',
  },
  {
    key: 'doha',
    site: 'samori-net',
    title: 'Where to Stay in Doha',
    heroSubtitle:
      'Doha is compact compared to other Gulf cities, but the areas still feel distinct — modern skyline, old-world souq, or man-made island resort.',
    areas: [
      {
        heading: 'West Bay & The Corniche — Best for First-Timers',
        paragraphs: [
          "Doha's skyline district — glass towers, five-star hotels, and the Corniche waterfront promenade with views back toward the city. Central, walkable along the water, and close to West Bay's business and dining scene.",
        ],
        goodFor: 'first-time visitors, business travelers, skyline views',
        skipIf: 'you want a more traditional, local atmosphere',
        activityBlurb:
          'A Corniche sunset walk pairs naturally with a dhow cruise dinner — one of the most-booked Doha experiences:',
        cta: { label: 'Browse West Bay & Corniche experiences on KKday', href: KKDAY },
      },
      {
        heading: 'Souq Waqif & Old Doha — Best for Culture',
        paragraphs: [
          "The restored traditional market area — narrow lanes, spice stalls, falcons for sale, shisha cafes, and some of the city's best local restaurants. Hotels here lean boutique and heritage-style rather than glass-tower modern.",
        ],
        goodFor: 'culture-focused trips, food lovers, a more traditional Doha experience',
        skipIf: 'you want beachfront or the skyline-view rooms',
        activityBlurb: 'A guided Souq Waqif food tour and a desert safari transfer are the top add-ons from this base:',
        cta: { label: 'Find Old Doha & desert safari tours on Klook', href: KLOOK },
      },
      {
        heading: 'The Pearl — Best for a Resort Feel',
        paragraphs: [
          'A man-made island of marinas, upscale shopping, and beachfront residential-style hotels. More relaxed and resort-like than West Bay, with a Mediterranean-village feel.',
        ],
        goodFor: 'couples, families, resort-style trips, yacht/marina views',
        skipIf: "you're short on time — it's further from Souq Waqif and the museums",
        activityBlurb: 'Marina yacht tours and beach club day passes are the best-fit bookings here:',
        cta: { label: 'See The Pearl activities on Klook', href: KLOOK },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['West Bay/Corniche', 'First-timers, business', 'Modern, skyline', '$$$'],
        ['Souq Waqif/Old Doha', 'Culture, food', 'Traditional, local', '$$'],
        ['The Pearl', 'Resort trips', 'Marina, upscale', '$$$$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in Doha?',
        answer: '2–3 days covers the city comfortably; it also works well as a stopover en route elsewhere in the Gulf.',
      },
      {
        question: 'Is a desert safari worth doing from Doha?',
        answer:
          "Yes — it's one of the most popular half-day/overnight add-ons and easy to combine with any of the three areas above.",
      },
      {
        question: 'Best time of year to visit?',
        answer: 'November–March, when daytime temperatures are far more manageable than the summer months.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates across these areas on',
    closingSuffix: ', or lock in the experiences above through our KKday and Klook partners.',
  },
  {
    key: 'kinshasa',
    site: 'karibucongo',
    title: 'Where to Stay in Kinshasa',
    heroSubtitle:
      "Kinshasa is enormous and spread along the Congo River, so where you base yourself shapes the whole trip — from how easy it is to get around to how much of the city's famous nightlife and river life you're close to.",
    areas: [
      {
        heading: 'Gombe — Best for First-Timers',
        paragraphs: [
          "Kinshasa's business and diplomatic district, sitting right on the Congo River. This is where most embassies, international hotels, and upscale restaurants are concentrated, and it's the most straightforward base for a first visit — walkable riverfront, better security infrastructure, and easy access to the rest of the city by car.",
        ],
        goodFor: 'first-time visitors, business travelers, riverside dining',
        skipIf: "you want to be in the middle of the city's street life and markets",
        activityBlurb: 'A Congo River cruise or a sunset dinner at a riverside restaurant are the classic Gombe-based experiences:',
        cta: { label: 'Browse Kinshasa river experiences on KKday', href: KKDAY },
      },
      {
        heading: 'La Cité (Downtown) — Best for Culture and Local Life',
        paragraphs: [
          "The historic heart of the city — markets, street vendors, and the daily rhythm of Kinshasa life. Accommodation here tends to be simpler and more budget-friendly than Gombe, and it puts you closer to Matonge and Bandal, the neighborhoods most associated with Congolese rumba and nightlife.",
        ],
        goodFor: 'culture-focused trips, nightlife, budget travelers',
        skipIf: "it's your first time in the city and you want the more orderly, embassy-district pace of Gombe",
        activityBlurb: 'An evening out for live rumba music in Matonge or Bandal is the standout addition from this base:',
        cta: { label: 'Find Kinshasa nightlife & culture tours on Klook', href: KLOOK },
      },
      {
        heading: 'Day Trips Worth a Night Away',
        paragraphs: [
          "Kinshasa also works well as a base for trips outside the city — most travelers don't stay overnight at these spots, but they're worth planning around:",
        ],
        dayTrips: [
          {
            label: 'Zongo Falls',
            text: 'a roughly 4-hour drive from the city, a 65-metre waterfall on the Inkisi River, best done as a full day out',
          },
          {
            label: 'Lola ya Bonobo Sanctuary',
            text: "about 30 minutes from the city centre, the world's only bonobo sanctuary",
          },
          {
            label: 'Brazzaville',
            text: 'a 20-minute ferry across the Congo River to the neighboring capital, doable as a day trip with the right paperwork sorted in advance',
          },
        ],
        cta: { label: 'See Congo River & day-trip tours on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['Gombe', 'First-timers, business', 'Diplomatic, riverside', '$$$'],
        ['La Cité/Downtown', 'Culture, nightlife', 'Local, lively', '$ - $$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in Kinshasa?',
        answer: '2–3 days covers the city; add an extra day if you want to include Zongo Falls or the bonobo sanctuary.',
      },
      {
        question: 'Is Kinshasa easy to get around?',
        answer:
          'Traffic is heavy and distances are large, so most visitors rely on hotel transfers or arranged drivers rather than walking between neighborhoods.',
      },
      {
        question: "What's the best time of year to visit?",
        answer: 'The dry season (June–September) is generally the most comfortable for getting around and for day trips outside the city.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates in Gombe and around the city on',
    closingSuffix: ', or lock in the river cruises and cultural tours above through our KKday and Klook partners.',
  },
  {
    key: 'abu-dhabi',
    site: 'karibucongo',
    title: 'Where to Stay in Abu Dhabi',
    heroSubtitle:
      'Abu Dhabi is more spread out and more deliberately planned than Dubai — most of the "must-see" spots sit on their own islands, so your base really depends on which side of the city you want to be closest to.',
    areas: [
      {
        heading: 'Corniche & Downtown — Best for First-Timers',
        paragraphs: [
          "The Corniche is Abu Dhabi's waterfront promenade, lined with parks, beaches, and a growing skyline. Staying here puts you close to the Qasr Al Watan palace-turned-museum and within easy reach of the rest of the city.",
        ],
        goodFor: 'first-time visitors, walkable beach access, central location',
        skipIf: "you're prioritizing Yas Island's theme parks — it's a taxi ride away from here",
        activityBlurb:
          'The Sheikh Zayed Grand Mosque tour and a Corniche sunset walk are the two most-booked additions from this base:',
        cta: { label: 'Browse Abu Dhabi city tours on KKday', href: KKDAY },
      },
      {
        heading: 'Saadiyat Island — Best for Culture and Beaches',
        paragraphs: [
          "Home to the Louvre Abu Dhabi and some of the city's best beaches, Saadiyat has a quieter, more resort-like pace than downtown. Hotels here lean upscale, with a cultural-district feel that's distinct from the rest of the city.",
        ],
        goodFor: 'museum-goers, beach relaxation, couples',
        skipIf: 'you want to be closer to the mosque and downtown sights without a drive',
        activityBlurb: 'The Louvre Abu Dhabi and a Saadiyat beach club day pass are the standout bookings here:',
        cta: { label: 'See Saadiyat Island experiences on Klook', href: KLOOK },
      },
      {
        heading: 'Yas Island — Best for Theme Parks and Families',
        paragraphs: [
          "Yas Island is essentially Abu Dhabi's entertainment hub — Ferrari World, Yas Waterworld, Warner Bros. World, and the Yas Marina Circuit (home of the Abu Dhabi Grand Prix) are all here, alongside a large outlet mall.",
        ],
        goodFor: 'families, theme park trips, motorsport fans',
        skipIf: "you want to be near the cultural/historic sights — it's a distinct, self-contained area",
        activityBlurb: 'A Ferrari World + Yas Waterworld combo ticket is by far the most popular booking for this base:',
        cta: { label: 'Find Yas Island theme park tickets on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['Corniche/Downtown', 'First-timers', 'Central, waterfront', '$$$'],
        ['Saadiyat Island', 'Culture, beaches', 'Upscale, resort-like', '$$$$'],
        ['Yas Island', 'Theme parks, families', 'Entertainment hub', '$$$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in Abu Dhabi?',
        answer: "2–3 days covers the main sights; add a day if you're doing Yas Island's theme parks properly.",
      },
      {
        question: 'Is Abu Dhabi easy to combine with a Dubai trip?',
        answer:
          "Very — they're about 90 minutes apart by car, and many visitors do both in a single trip, splitting nights between the two.",
      },
      {
        question: 'Best time of year to visit?',
        answer: 'November–March, when temperatures are far more manageable than the summer months.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates across these areas on',
    closingSuffix: ', or lock in the experiences above through our KKday and Klook partners.',
  },
  {
    key: 'singapore',
    site: 'karibucongo',
    title: 'Where to Stay in Singapore',
    heroSubtitle:
      'Singapore is compact and its transit system is excellent, so almost anywhere works logistically — the real question is which vibe you want as your base.',
    areas: [
      {
        heading: 'Marina Bay — Best for First-Timers',
        paragraphs: [
          'Home to Marina Bay Sands, the Gardens by the Bay Supertrees, and the skyline views Singapore is known for. This is the most central, iconic base, though also the most expensive.',
        ],
        goodFor: 'first-time visitors, skyline views, being near the headline sights',
        skipIf: 'you want a more local, less polished feel',
        activityBlurb:
          "Gardens by the Bay's Supertree light show and a Marina Bay Sands SkyPark visit are the two bookings most worth locking in:",
        cta: { label: 'Browse Marina Bay attractions on KKday', href: KKDAY },
      },
      {
        heading: 'Orchard Road — Best for Shopping and Convenience',
        paragraphs: [
          "Singapore's main shopping boulevard, lined with malls and mid-to-upscale hotels. Centrally located with excellent MRT connections to everywhere else in the city.",
        ],
        goodFor: 'shoppers, convenience-focused trips, families',
        skipIf: 'you want waterfront views or a quieter, boutique feel',
        activityBlurb:
          'A day trip to Universal Studios Singapore or the S.E.A. Aquarium on Sentosa pairs well with an Orchard Road base — both are a short MRT ride away:',
        cta: { label: 'Find Sentosa Island day passes on Klook', href: KLOOK },
      },
      {
        heading: 'Chinatown & Tanjong Pagar — Best for a Local, Budget-Friendly Feel',
        paragraphs: [
          "Historic shophouses, hawker centres, and a livelier, more affordable stretch of the city. Well-connected by MRT and walking distance to some of Singapore's best cheap eats.",
        ],
        goodFor: 'budget travelers, food lovers, a more local atmosphere',
        skipIf: "you want to be right next to Marina Bay's headline sights",
        activityBlurb:
          'A hawker food tour through Chinatown Complex or Maxwell Food Centre is the standout experience from this base:',
        cta: { label: 'See Chinatown food tours on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['Marina Bay', 'First-timers', 'Iconic, skyline', '$$$$'],
        ['Orchard Road', 'Shopping, convenience', 'Central, polished', '$$$'],
        ['Chinatown/Tanjong Pagar', 'Local feel, food', 'Historic, budget-friendly', '$$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in Singapore?',
        answer: '3–4 days covers the city comfortably, including a half-day on Sentosa Island.',
      },
      {
        question: 'Is the MRT easy to use from any of these areas?',
        answer: 'Yes — all three are well-served, so no base is truly inconvenient in a city this compact.',
      },
      {
        question: 'Best time of year to visit?',
        answer: 'Singapore is warm and humid year-round; February–April tends to have slightly less rainfall than other months.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates across these areas on',
    closingSuffix: ', or lock in the experiences above through our KKday and Klook partners.',
  },
  {
    key: 'kuala-lumpur',
    site: 'karibucongo',
    title: 'Where to Stay in Kuala Lumpur',
    heroSubtitle:
      "KL packs a rainforest-fringed skyline, some of Malaysia's best food, and a night market a street away from every hotel — the choice of area mostly comes down to how central and polished you want your base to be.",
    areas: [
      {
        heading: 'KLCC (Petronas Towers Area) — Best for First-Timers',
        paragraphs: [
          "The most iconic base — the Petronas Twin Towers, KLCC Park, and Suria KLCC mall are all here. Hotels skew upscale, and the area feels the most polished and international of KL's districts.",
        ],
        goodFor: 'first-time visitors, skyline views, shopping',
        skipIf: 'you want a more local, street-food-heavy atmosphere',
        activityBlurb: 'A Petronas Towers observation deck ticket and a KL skyline night tour are the top bookings from this base:',
        cta: { label: 'Browse KLCC tours & attractions on KKday', href: KKDAY },
      },
      {
        heading: 'Bukit Bintang — Best for Food and Nightlife',
        paragraphs: [
          "KL's main entertainment and street-food district — Jalan Alor's night market is a short walk from most hotels here, alongside malls, bars, and a lively backpacker and boutique-hotel scene.",
        ],
        goodFor: 'food lovers, nightlife, budget-to-mid-range travelers',
        skipIf: 'you want the quieter, skyline-view pace of KLCC',
        activityBlurb: 'A Jalan Alor street food walking tour is the single most-booked experience from this base:',
        cta: { label: 'Find Bukit Bintang food tours on Klook', href: KLOOK },
      },
      {
        heading: 'Chinatown (Petaling Street) — Best for History and Budget',
        paragraphs: [
          "KL's oldest commercial district, with heritage shophouses, temples, and the covered Petaling Street market. Accommodation here is noticeably cheaper than KLCC or Bukit Bintang.",
        ],
        goodFor: 'budget travelers, culture and history, day-tripping to the Batu Caves',
        skipIf: "you want to be near KL's modern skyline and malls",
        activityBlurb: 'Batu Caves and a Chinatown heritage walking tour pair naturally with a stay here:',
        cta: { label: 'See Chinatown & Batu Caves tours on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['KLCC', 'First-timers', 'Iconic, polished', '$$$'],
        ['Bukit Bintang', 'Food, nightlife', 'Lively, central', '$$ - $$$'],
        ['Chinatown/Petaling Street', 'History, budget', 'Heritage, local', '$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in Kuala Lumpur?',
        answer: "3 days covers the city well; add a day if you're combining it with a Batu Caves or Genting Highlands day trip.",
      },
      {
        question: 'Is KL walkable between these areas?',
        answer:
          "Within each district, yes — between them, the LRT/MRT is faster than walking given KL's spread-out layout.",
      },
      {
        question: 'Best time of year to visit?',
        answer: 'December–February tends to have the least rainfall, though KL is warm and humid throughout the year.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates across these areas on',
    closingSuffix: ', or lock in the tours above through our KKday and Klook partners.',
  },
  {
    key: 'seychelles',
    site: 'karibucongo',
    title: 'Where to Stay in Seychelles',
    heroSubtitle:
      'Seychelles is really a choice between islands, not just neighborhoods. The three main ones — Mahé, Praslin, and La Digue — each have a distinct pace, and most longer trips combine at least two.',
    areas: [
      {
        heading: 'Mahé — Best for First-Timers and Convenience',
        paragraphs: [
          'The largest island and home to the international airport, so almost every trip starts and ends here. Victoria (the capital) and Beau Vallon Beach are the main draws, along with a wider range of hotel budgets than the smaller islands.',
        ],
        goodFor: 'first-time visitors, arrival/departure nights, budget flexibility',
        skipIf: "you're chasing the most postcard-famous beaches — those are mostly on Praslin and La Digue",
        activityBlurb:
          'A Morne Seychellois National Park hike and a Victoria market walking tour are the best-fit activities from a Mahé base:',
        cta: { label: 'Browse Mahé tours & activities on KKday', href: KKDAY },
      },
      {
        heading: 'Praslin — Best for Beaches and Nature',
        paragraphs: [
          "Home to Anse Lazio (regularly ranked among the world's best beaches) and the Vallée de Mai, a UNESCO-listed forest where the giant coco de mer palm grows wild. Quieter and less developed than Mahé, with a more resort-and-nature focus.",
        ],
        goodFor: 'beach-focused trips, honeymoons, nature lovers',
        skipIf: 'you want nightlife or a wider range of restaurants — Praslin is intentionally low-key',
        activityBlurb:
          'A Vallée de Mai guided walk and a boat trip to Curieuse Island (home to giant tortoises) are the standout bookings here:',
        cta: { label: 'Find Praslin nature tours on Klook', href: KLOOK },
      },
      {
        heading: 'La Digue — Best for a Slower, Car-Free Pace',
        paragraphs: [
          "The smallest and most laid-back of the three, with ox-carts and bicycles as the main way of getting around instead of cars. Anse Source d'Argent — the boulder-lined beach seen in countless Seychelles postcards — is here.",
        ],
        goodFor: 'unplugging, cycling between beaches, a slower final leg of a trip',
        skipIf: 'you want variety in dining or nightlife — La Digue is deliberately quiet',
        activityBlurb:
          "Bicycle rental to explore Anse Source d'Argent and the island's other beaches is the essential La Digue experience:",
        cta: { label: 'See La Digue island tours on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Island', 'Best For', 'Vibe', 'Getting There'],
      rows: [
        ['Mahé', 'First-timers, convenience', 'Capital city, varied', 'International airport'],
        ['Praslin', 'Beaches, nature', 'Quiet, resort-focused', '15-min flight or ferry from Mahé'],
        ['La Digue', 'Slow travel, cycling', 'Car-free, laid-back', 'Ferry from Praslin'],
      ],
    },
    faqs: [
      {
        question: 'How many islands should I visit?',
        answer: 'Most trips combine 2–3: a few nights on Mahé, then Praslin and/or La Digue for the beach-focused part of the trip.',
      },
      {
        question: 'How do you get between the islands?',
        answer: 'Domestic flights connect Mahé and Praslin quickly; a ferry connects Praslin and La Digue.',
      },
      {
        question: 'Best time of year to visit?',
        answer: 'April–May and October–November avoid both the busiest crowds and the windiest months.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel and resort rates across the islands on',
    closingSuffix: ', or lock in the island tours above through our KKday and Klook partners.',
  },
  {
    key: 'mauritius',
    site: 'karibucongo',
    title: 'Where to Stay in Mauritius',
    heroSubtitle:
      "Mauritius is one island, but its coasts feel genuinely different from each other — calm lagoon water in the west, watersports and reef breaks in the north, and a wilder, less developed feel in the south.",
    areas: [
      {
        heading: 'Grand Baie & the North Coast — Best for First-Timers',
        paragraphs: [
          "Mauritius's liveliest coastal area, with the widest range of restaurants, bars, and beach clubs on the island, plus calm, swimmable lagoon water. Most resorts and the biggest concentration of watersports operators are here.",
        ],
        goodFor: 'first-time visitors, nightlife, watersports, families',
        skipIf: 'you want a quieter, more secluded resort experience',
        activityBlurb:
          'Catamaran trips to Île aux Cerfs and dolphin-watching excursions off the northwest coast are the most popular bookings from this base:',
        cta: { label: 'Browse Grand Baie tours & watersports on KKday', href: KKDAY },
      },
      {
        heading: 'Flic en Flac & the West Coast — Best for Sunsets and Diving',
        paragraphs: [
          "Known for calm water, some of the island's best diving and snorkeling, and west-facing beaches that make for excellent sunsets. Quieter and more resort-focused than Grand Baie.",
        ],
        goodFor: 'divers and snorkelers, couples, sunset views',
        skipIf: 'you want the liveliest restaurant and nightlife scene on the island',
        activityBlurb:
          "Diving trips and a Casela Nature Park visit (home to Mauritius's zip-lining and safari-style animal encounters) pair well with a west-coast base:",
        cta: { label: 'Find diving & Casela Park tickets on Klook', href: KLOOK },
      },
      {
        heading: 'Le Morne & the South Coast — Best for a Wilder, Quieter Feel',
        paragraphs: [
          'Anchored by Le Morne Brabant, a dramatic UNESCO-listed mountain jutting into the sea, this coast is less developed and known for strong winds that make it a top kitesurfing destination.',
        ],
        goodFor: 'kitesurfers, hikers, travelers wanting fewer crowds',
        skipIf: 'you want calm swimming water — the south coast is windier and wilder than the north or west',
        activityBlurb: 'Hiking Le Morne Brabant and kitesurfing lessons are the standout activities from this base:',
        cta: { label: 'See Le Morne activities on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Water Conditions'],
      rows: [
        ['Grand Baie/North', 'First-timers, nightlife', 'Lively, resort-heavy', 'Calm lagoon'],
        ['Flic en Flac/West', 'Diving, sunsets', 'Quieter, scenic', 'Calm, clear'],
        ['Le Morne/South', 'Kitesurfing, hiking', 'Wild, dramatic', 'Windy, strong currents'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in Mauritius?',
        answer: '5–7 days lets you enjoy one coast properly, or split time between two if you want variety.',
      },
      {
        question: 'Is renting a car worth it?',
        answer:
          "Yes — the island is small enough to drive across in a few hours, and having a car makes it easy to explore beyond your resort's coast.",
      },
      {
        question: 'Best time of year to visit?',
        answer:
          'May–December (the dry, cooler season) is generally considered the most comfortable, avoiding the cyclone risk of the summer months.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel and resort rates across the island on',
    closingSuffix: ', or lock in the tours above through our KKday and Klook partners.',
  },
  {
    key: 'paris',
    site: 'karibucongo',
    title: 'Where to Stay in Paris',
    heroSubtitle:
      'Paris rewards picking the right arrondissement — the city is compact and walkable, but each neighborhood has a genuinely different feel, from grand and touristy to quiet and local.',
    areas: [
      {
        heading: 'Le Marais (3rd/4th) — Best for First-Timers',
        paragraphs: [
          'Cobblestone streets, historic Jewish quarter, trendy boutiques, and easy walking distance to Notre-Dame, the Louvre, and the Seine. One of the most atmospheric and centrally located bases in the city.',
        ],
        goodFor: 'first-time visitors, walkable sightseeing, boutique shopping',
        skipIf: 'you want a quieter, more residential feel — Le Marais gets busy, especially on weekends',
        activityBlurb:
          'A Louvre skip-the-line ticket and a Seine river cruise are the two bookings most worth locking in ahead of time:',
        cta: { label: 'Browse Paris museum tickets & Seine cruises on KKday', href: KKDAY },
      },
      {
        heading: 'Saint-Germain-des-Prés (6th) — Best for a Classic, Elegant Paris',
        paragraphs: [
          'Home to historic cafés (Les Deux Magots, Café de Flore), the Luxembourg Gardens, and some of the city\'s best bookshops and galleries. This is the "two-hour lunch" version of Paris — elegant, literary, unhurried.',
        ],
        goodFor: 'couples, food and wine lovers, a quieter luxury base',
        skipIf: "you're on a tight budget — this is one of the more expensive areas to stay",
        activityBlurb: "A Luxembourg Gardens visit paired with a Musée d'Orsay ticket is the natural combination from this base:",
        cta: { label: "Find Musée d'Orsay tickets on Klook", href: KLOOK },
      },
      {
        heading: 'Montmartre (18th) — Best for Views and a Village Feel',
        paragraphs: [
          "Perched on Paris's highest hill, home to Sacré-Cœur and a maze of steep, artsy streets that still feel like a village within the city. More budget-friendly than central Paris, with genuinely different views over the rooftops.",
        ],
        goodFor: 'budget travelers, photographers, a less formal Paris experience',
        skipIf:
          'you want to be within easy walking distance of the Louvre or the Eiffel Tower — Montmartre is a Metro ride from both',
        activityBlurb:
          'A Sacré-Cœur and Montmartre walking tour, plus sunset from the basilica steps, is the essential experience here:',
        cta: { label: 'See Montmartre tours on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['Le Marais', 'First-timers', 'Historic, central', '$$$'],
        ['Saint-Germain-des-Prés', 'Elegant, classic Paris', 'Literary, upscale', '$$$$'],
        ['Montmartre', 'Views, budget', 'Village-like, artsy', '$$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in Paris?',
        answer: '4–5 days covers the major sights comfortably; 3 days works for a tighter city break.',
      },
      {
        question: 'Is the Metro easy to use from any of these areas?',
        answer:
          'Yes — all three neighborhoods are well-served, though Le Marais and Saint-Germain are more walkable to the top sights than Montmartre.',
      },
      {
        question: 'Best time of year to visit?',
        answer: 'April–June or September–October for good weather with fewer crowds than peak summer.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates across these neighborhoods on',
    closingSuffix: ', or lock in the tickets and tours above through our KKday and Klook partners.',
  },
  {
    key: 'new-york',
    site: 'karibucongo',
    title: 'Where to Stay in New York',
    heroSubtitle:
      'New York is huge, and the "right" area depends on the trip you want — Broadway and Midtown energy, downtown cool, or a quieter base with a shorter commute to everything via subway.',
    areas: [
      {
        heading: 'Midtown Manhattan — Best for First-Timers',
        paragraphs: [
          'Times Square, Broadway theatres, the Empire State Building, and Rockefeller Center are all here or a short walk away. The most convenient base for a first visit, though also the busiest and priciest.',
        ],
        goodFor: 'first-time visitors, Broadway shows, walkable sightseeing',
        skipIf: 'you want a quieter, more local New York experience',
        activityBlurb:
          'A Broadway show and an Empire State Building observation deck ticket are the two bookings most worth securing in advance:',
        cta: { label: 'Browse Broadway shows & NYC attractions on KKday', href: KKDAY },
      },
      {
        heading: 'Lower Manhattan / Financial District — Best for History and Views',
        paragraphs: [
          'Home to the 9/11 Memorial, the Statue of Liberty ferry departure point, and increasingly good waterfront dining. Quieter in the evenings than Midtown, with some of the best skyline and harbor views in the city.',
        ],
        goodFor: 'history-focused trips, Statue of Liberty visits, harbor views',
        skipIf: 'you want to be near Broadway or Central Park — both are a subway ride away',
        activityBlurb: 'A Statue of Liberty & Ellis Island ferry ticket is the essential booking from this base:',
        cta: { label: 'Find Statue of Liberty ferry tickets on Klook', href: KLOOK },
      },
      {
        heading: 'Brooklyn (Williamsburg/DUMBO) — Best for a Local, Trendy Feel',
        paragraphs: [
          'Independent coffee shops, some of the best skyline views of Manhattan (especially from DUMBO), and a younger, more residential vibe. A short subway ride from Manhattan, with noticeably better value on food and often on hotels too.',
        ],
        goodFor: 'repeat visitors, foodies, skyline photography, budget-conscious trips',
        skipIf: "it's your first visit and you want to minimize travel time to Midtown's sights",
        activityBlurb:
          'A Brooklyn Bridge walk combined with the DUMBO waterfront and its classic Manhattan Bridge photo spot is the top experience from this base:',
        cta: { label: 'See Brooklyn walking tours on KKday', href: KKDAY },
      },
    ],
    comparisonTable: {
      headers: ['Area', 'Best For', 'Vibe', 'Price Level'],
      rows: [
        ['Midtown Manhattan', 'First-timers', 'Iconic, busy', '$$$$'],
        ['Lower Manhattan', 'History, views', 'Quieter, waterfront', '$$$'],
        ['Brooklyn', 'Local feel, value', 'Trendy, residential', '$$'],
      ],
    },
    faqs: [
      {
        question: 'How many days do I need in New York?',
        answer:
          '4–5 days covers the major sights across boroughs without feeling rushed; 3 days works for a tighter Midtown-focused trip.',
      },
      {
        question: 'Is the subway easy to use from any of these areas?',
        answer: "Yes — all three are well-connected, though Brooklyn adds a bit more travel time to reach Midtown's sights.",
      },
      {
        question: 'Best time of year to visit?',
        answer:
          'Spring (April–June) or fall (September–November) for comfortable weather and fewer crowds than summer or the December holidays.',
      },
    ],
    closingPrefix: 'Ready to book? Compare hotel rates across these areas on',
    closingSuffix: ', or lock in the tickets and tours above through our KKday and Klook partners.',
  },
];

export function getHotelGuide(key: string): HotelGuide | undefined {
  return hotelGuides.find((g) => g.key === key);
}
