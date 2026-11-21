import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SITE_NAME, absoluteUrl } from '@/lib/site-config';

const TITLE = 'Affiliate disclosure';
const DESCRIPTION = 'How Samori Systems earns money from affiliate links and how that affects our reviews.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl('/affiliate-disclosure/') },
  openGraph: { type: 'website', url: absoluteUrl('/affiliate-disclosure/'), title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

export default function AffiliateDisclosurePage() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: TITLE, path: '/affiliate-disclosure/' },
        ]}
      />

      <h1>Affiliate disclosure</h1>

      <p>
        {SITE_NAME} is funded by affiliate commission. When a page links to a retailer and you buy
        a product after following that link, we may earn a commission. It does not add to the price
        you pay.
      </p>

      <ul>
        <li>Affiliate links are marked with rel="sponsored" and open in a new tab.</li>
        <li>
          Commission does not decide which products we review or what we say about them. See our{' '}
          <Link href="/about/">editorial policy</Link>.
        </li>
        <li>
          Some pages have no buy link yet. That is not a recommendation against the product; the
          link is added only once it has been set up and checked.
        </li>
      </ul>
    </main>
  );
}
