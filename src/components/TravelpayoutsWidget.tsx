'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { whenConsentGranted } from '@/lib/consent';

interface TravelpayoutsWidgetProps {
  /** Script src URL for the Travelpayouts widget (tp.media/content?...). */
  src: string;
  /** Static, pre-rendered fallback content shown while the script loads and to crawlers/AI bots that don't execute JS. */
  fallback: ReactNode;
  /** Container width. Accepts any valid CSS width value (px, %, etc.). Defaults to "100%". */
  width?: string | number;
  /** Container height. Accepts any valid CSS height value (px, %, etc.). Defaults to "auto". */
  height?: string | number;
  /** Unique id for this widget instance, used to scope the script and container. */
  id: string;
}

export default function TravelpayoutsWidget({
  src,
  fallback,
  width = '100%',
  height = 'auto',
  id,
}: TravelpayoutsWidgetProps) {
  const mount = useRef<HTMLDivElement>(null);

  // The partner script is only inserted after the visitor accepts optional scripts.
  useEffect(() => {
    let cancelled = false;
    whenConsentGranted(() => {
      const node = mount.current;
      if (cancelled || !node) return;
      const script = document.createElement('script');
      script.id = `tp-widget-script-${id}`;
      script.async = true;
      script.src = src;
      node.appendChild(script);
    });
    return () => {
      cancelled = true;
      if (mount.current) mount.current.innerHTML = '';
    };
  }, [src, id]);

  return (
    <div
      id={`tp-widget-${id}`}
      style={{ width, height, position: 'relative' }}
    >
      {fallback}
      <div ref={mount} />
    </div>
  );
}
