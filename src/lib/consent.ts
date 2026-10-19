declare global {
  interface Window {
    samoriConsent?: {
      open: () => void;
      status: () => 'granted' | 'denied' | null;
      load: (names: string | string[]) => void;
      whenGranted: (fn: () => void) => void;
    };
    __samoriConsentQueue?: string[];
    __samoriConsentCallbacks?: Array<() => void>;
  }
}

export function requestConsentScripts(names: string[]) {
  if (window.samoriConsent) window.samoriConsent.load(names);
  else window.__samoriConsentQueue = [...(window.__samoriConsentQueue ?? []), ...names];
}

export function openCookieSettings() {
  window.samoriConsent?.open();
}

/** Runs fn once the visitor has accepted optional scripts (immediately if they already have). */
export function whenConsentGranted(fn: () => void) {
  if (window.samoriConsent) window.samoriConsent.whenGranted(fn);
  else window.__samoriConsentCallbacks = [...(window.__samoriConsentCallbacks ?? []), fn];
}
