'use client';

import { useEffect, useRef } from 'react';

export default function TravelpayoutsEmbed({ src, className }: { src: string; className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = mount.current;
    if (!node) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.charset = 'utf-8';
    node.appendChild(script);
    return () => {
      node.innerHTML = '';
    };
  }, [src]);

  return <div ref={mount} className={className} />;
}
