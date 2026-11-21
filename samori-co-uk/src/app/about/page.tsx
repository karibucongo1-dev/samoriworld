import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CONTACT_EMAIL, SITE_NAME, absoluteUrl } from '@/lib/site-config';

const TITLE = 'About and editorial policy';
const DESCRIPTION =
  'Who runs Samori Systems, how our UK tech reviews are written and checked, and how we handle affiliate links and corrections.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl('/about/') },
  openGraph: { type: 'website', url: absoluteUrl('/about/'), title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

export default function AboutPage() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: TITLE, path: '/about/' },
        ]}
      />

      <h1>About and editorial policy</h1>

      <p>
        {SITE_NAME} publishes short tech reviews for UK buyers. Each review gives a two-sentence
        verdict, a specification table and the UK recommended retail price (RRP) where we have
        confirmed one.
      </p>

      <h2>How we write our reviews</h2>
      <ul>
        <li>
          Specifications and prices come from the manufacturer's published product information.
          Where we cannot confirm a figure, we leave it out rather than guess.
        </li>
        <li>
          A review is only published once its specifications have been checked. Pages that are
          still drafts are not listed, not in the sitemap and not linked.
        </li>
        <li>
          Prices shown are UK RRP in pounds sterling. They are a guide, not a live offer, and can
          change; check the retailer before you buy.
        </li>
        <li>Verdicts are short, plain statements of who a product suits. They are not star ratings.</li>
      </ul>

      <h2>Affiliate links</h2>
      <p>
        Some product pages link to retailers through affiliate links. If you buy through one we may
        earn a commission at no extra cost to you. Commission does not change what a review says.
        Details are in the <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
      </p>

      <h2>Corrections</h2>
      <p>
        If you spot a mistake, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the
        page address and what is wrong. We correct confirmed errors as soon as we can.
      </p>
    </main>
  );
}
