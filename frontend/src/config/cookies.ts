export type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieConsentState {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const COOKIE_CONSENT_STORAGE_KEY = 'pcebv.cookieConsent';

export const DEFAULT_COOKIE_CONSENT: CookieConsentState = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const loadCookieConsent = (): CookieConsentState | null => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    return {
      necessary: true,
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
};

export const saveCookieConsent = (consent: CookieConsentState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
};

export const acceptAllConsent = (): CookieConsentState => ({
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
});

export const rejectAllConsent = (): CookieConsentState => ({
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
});
