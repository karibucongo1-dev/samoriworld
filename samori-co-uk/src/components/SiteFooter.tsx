import Link from 'next/link';
import { SITE_NAME, TRUST_PAGES } from '@/lib/site-config';

export default function SiteFooter() {
  return (
    <footer>
      <nav aria-label="Site information">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {TRUST_PAGES.map((page) => (
            <li key={page.path}>
              <Link href={page.path}>{page.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>
        {SITE_NAME} may earn a commission from some links. See the{' '}
        <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
      </p>
    </footer>
  );
}
