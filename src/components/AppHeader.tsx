'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SITE_NAME } from '@/lib/site-config';

const navLinks = [
  { label: 'Flights', href: '/flights/' },
  { label: 'Hotels', href: '/hotels/' },
  { label: 'Car Rental', href: '/car-rental/' },
  { label: 'Things to Do', href: '/things-to-do/' },
  { label: 'eSIM', href: '/esim/' },
  { label: 'Destinations', href: '/destinations/' },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const [firstWord, ...rest] = SITE_NAME.split(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {firstWord} <span className="text-teal-600 dark:text-teal-400">{rest.join(' ')}</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300 sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-zinc-900 dark:hover:text-zinc-50">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-black/5 bg-white px-6 py-4 dark:border-white/10 dark:bg-black sm:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
