'use client';

import Script from 'next/script';
import type { ReactNode } from 'react';

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
  return (
    <div
      id={`tp-widget-${id}`}
      style={{ width, height, position: 'relative' }}
    >
      {fallback}
      <Script id={`tp-widget-script-${id}`} src={src} strategy="afterInteractive" async />
    </div>
  );
}
