import Link from 'next/link';
import { SITE_NAME } from '@/lib/site-config';

const navLinks = [
  { href: '/flights/', label: 'Flights' },
  { href: '/hotels/', label: 'Hotels' },
  { href: '/car-rental/', label: 'Car Rental' },
  { href: '/things-to-do/', label: 'Things to Do' },
  { href: '/esim/', label: 'eSIM' },
  { href: '/destinations/', label: 'Destinations' },
];

export default function SiteHeader() {
  const [firstWord, ...rest] = SITE_NAME.split(' ');
  const restWords = rest.join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" href="/">
          {firstWord} <span className="text-teal-600 dark:text-teal-400">{restWords}</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300 sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} className="hover:text-zinc-900 dark:hover:text-zinc-50" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <details className="relative sm:hidden">
          <summary
            aria-label="Open menu"
            className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 [&::-webkit-details-marker]:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full mt-2 flex w-48 flex-col gap-1 rounded-xl border border-black/5 bg-white p-2 text-sm font-medium text-zinc-600 shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="rounded-lg px-2 py-2 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
