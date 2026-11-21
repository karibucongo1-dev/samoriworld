import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CONTACT_EMAIL, SITE_NAME, absoluteUrl } from '@/lib/site-config';

const TITLE = 'Contact';
const DESCRIPTION = 'How to contact Samori Systems about a review, a correction or a privacy request.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl('/contact/') },
  openGraph: { type: 'website', url: absoluteUrl('/contact/'), title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

export default function ContactPage() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: TITLE, path: '/contact/' },
        ]}
      />

      <h1>Contact</h1>
      <p>
        Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to reach {SITE_NAME}. Use it to
        report a mistake in a review, ask about a product, or make a privacy request.
      </p>
    </main>
  );
}
