import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CONTACT_EMAIL, LAST_POLICY_UPDATE, SITE_NAME, absoluteUrl } from '@/lib/site-config';

const TITLE = 'Privacy';
const DESCRIPTION = 'What personal data Samori Systems collects when you visit samori.co.uk, and your UK GDPR rights.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl('/privacy/') },
  openGraph: { type: 'website', url: absoluteUrl('/privacy/'), title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

export default function PrivacyPage() {
  return (
    <main>
      <Breadcrumbs
        trail={[
          { name: 'Home', path: '/' },
          { name: TITLE, path: '/privacy/' },
        ]}
      />

      <h1>Privacy</h1>
      <p>Last updated: {LAST_POLICY_UPDATE}</p>

      <h2>What this site collects</h2>
      <p>
        {SITE_NAME} (samori.co.uk) is a static website. It has no accounts, no forms, no comments
        and no newsletter, and it does not set cookies or run analytics or advertising scripts of
        its own. We do not ask you for personal information.
      </p>

      <h2>Server and network logs</h2>
      <p>
        Like any website, requests to this site are handled by our hosting provider and by
        Cloudflare, which protects the site. These providers process technical data such as your IP
        address, browser type and the pages requested, for security and to deliver the site. We do
        not use this data to identify you.
      </p>

      <h2>Links to other sites</h2>
      <p>
        Some pages link to retailers, such as Amazon UK, through affiliate links. Once you follow a
        link you are on the retailer's site, which has its own privacy policy and may set cookies
        to track the referral. We do not control those sites.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK GDPR you can ask to see, correct or delete personal data held about you, and object
        to its use. To make a request, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        You can also complain to the Information Commissioner's Office at ico.org.uk.
      </p>

      <h2>Changes</h2>
      <p>If we add analytics, cookies or forms, we will update this page before we do.</p>
    </main>
  );
}
