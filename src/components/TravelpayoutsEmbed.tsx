'use client';

import { useEffect, useRef, useState } from 'react';
import { openCookieSettings, whenConsentGranted } from '@/lib/consent';

/* Partner search widget. The partner script is only inserted after the visitor accepts
   optional scripts in the consent banner; until then a short note is shown instead. */
export default function TravelpayoutsEmbed({ src, className }: { src: string; className?: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    whenConsentGranted(() => {
      const node = mount.current;
      if (cancelled || !node) return;
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      script.charset = 'utf-8';
      node.appendChild(script);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
      if (mount.current) mount.current.innerHTML = '';
    };
  }, [src]);

  return (
    <div className={className}>
      {!loaded && (
        <p className="rounded-xl border border-dashed border-black/20 px-4 py-3 text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-400">
          This booking search box is provided by a partner and is hidden until you allow optional partner scripts.{' '}
          <button type="button" onClick={openCookieSettings} className="underline">
            Cookie settings
          </button>
        </p>
      )}
      <div ref={mount} />
    </div>
  );
}
