import Link from 'next/link';
import CookieSettingsButton from '@/components/CookieSettingsButton';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site-config';

const socialLinks = [
  { label: 'IG', name: 'Instagram' },
  { label: 'X', name: 'X' },
  { label: 'FB', name: 'Facebook' },
  { label: 'TT', name: 'TikTok' },
];

export default function SiteFooter() {
  const [firstWord, ...rest] = SITE_NAME.split(' ');
  const restWords = rest.join(' ');

  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" href="/">
              {firstWord} <span className="text-teal-600 dark:text-teal-400">{restWords}</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              We compare flights, cars, activities and eSIMs across dozens of providers so you can spend less time
              booking and more time exploring.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-zinc-600 transition-colors hover:border-teal-600 hover:text-teal-600 dark:border-white/15 dark:text-zinc-400 dark:hover:border-teal-400 dark:hover:text-teal-400"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Quick Links</h3>
            <nav className="mt-4 flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/flights/">
                Flights
              </Link>
              <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/hotels/">
                Hotels
              </Link>
              <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/car-rental/">
                Car Rental
              </Link>
              <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/things-to-do/">
                Things to Do
              </Link>
              <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/esim/">
                Stay Connected
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Explore</h3>
            <nav className="mt-4 flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Link className="hover:text-zinc-900 dark:hover:text-zinc-50" href="/destinations/">
                Destinations
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-10 border-t border-black/5 pt-6 text-center text-xs text-zinc-400 dark:border-white/10 dark:text-zinc-500 sm:text-left">
          {SITE_TAGLINE}
          <div data-samori-legal="" className="mt-2">
            <a href="/privacy/" className="underline">
              Privacy
            </a>{' '}
            · <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
