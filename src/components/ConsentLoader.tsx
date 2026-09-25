'use client';

import { useEffect } from 'react';
import { requestConsentScripts } from '@/lib/consent';

export default function ConsentLoader({ providers }: { providers: string[] }) {
  useEffect(() => {
    requestConsentScripts(providers);
  }, [providers]);

  return null;
}
