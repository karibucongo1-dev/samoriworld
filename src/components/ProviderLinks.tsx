interface Provider {
  name: string;
  href: string;
}

export default function ProviderLinks({ providers, className }: { providers: Provider[]; className?: string }) {
  if (providers.length === 0) return null;

  return (
    <div className={className ?? 'mt-4 flex flex-wrap items-center gap-2'}>
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Book via:</span>
      {providers.map((provider) => (
        <a
          key={provider.name}
          href={provider.href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-600 dark:border-white/15 dark:text-zinc-300 dark:hover:border-teal-400 dark:hover:text-teal-400"
        >
          {provider.name} →
        </a>
      ))}
    </div>
  );
}
