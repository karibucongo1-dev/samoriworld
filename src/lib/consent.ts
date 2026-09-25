declare global {
  interface Window {
    samoriConsent?: { open: () => void; status: () => 'granted' | 'denied' | null; load: (names: string | string[]) => void };
    __samoriConsentQueue?: string[];
  }
}

export function requestConsentScripts(names: string[]) {
  if (window.samoriConsent) window.samoriConsent.load(names);
  else window.__samoriConsentQueue = [...(window.__samoriConsentQueue ?? []), ...names];
}

export function openCookieSettings() {
  window.samoriConsent?.open();
}
