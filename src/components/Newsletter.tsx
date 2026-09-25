'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-700 px-8 py-12 text-center text-white sm:px-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get the Best Deals First</h2>
        <p className="mx-auto mt-3 max-w-md text-teal-50">
          Weekly flight and travel deals, straight to your inbox. No spam, just savings.
        </p>
        {submitted ? (
          <p className="mt-6 text-sm font-medium">You&apos;re on the list — welcome aboard!</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-teal-100 outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
