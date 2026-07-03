import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  CookieConsentState,
  DEFAULT_COOKIE_CONSENT,
  acceptAllConsent,
  loadCookieConsent,
  rejectAllConsent,
  saveCookieConsent,
} from '../config/cookies';

type CookieBannerProps = {
  onConsentChange?: (consent: CookieConsentState) => void;
};

const CookieConsentBanner: React.FC<CookieBannerProps> = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>(DEFAULT_COOKIE_CONSENT);

  useEffect(() => {
    const stored = loadCookieConsent();
    if (!stored) {
      setIsVisible(true);
      return;
    }

    setConsent(stored);
    onConsentChange?.(stored);
  }, [onConsentChange]);

  const persistConsent = (nextConsent: CookieConsentState) => {
    setConsent(nextConsent);
    saveCookieConsent(nextConsent);
    onConsentChange?.(nextConsent);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[1100] mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.92)] p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[14px] sm:bottom-6 sm:left-6 sm:right-6">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-white">
            We use cookies to improve your browsing experience.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            Necessary cookies remain active. Analytics, marketing, and functional cookies are only used after you choose them.
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close cookie banner"
        >
          <X size={16} />
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 sm:grid-cols-2">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked disabled className="h-4 w-4 accent-[#F25C19]" />
            Necessary Cookies
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={consent.functional}
              onChange={(e) => setConsent((prev) => ({ ...prev, functional: e.target.checked }))}
              className="h-4 w-4 accent-[#F25C19]"
            />
            Functional Cookies
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={(e) => setConsent((prev) => ({ ...prev, analytics: e.target.checked }))}
              className="h-4 w-4 accent-[#F25C19]"
            />
            Analytics Cookies
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={(e) => setConsent((prev) => ({ ...prev, marketing: e.target.checked }))}
              className="h-4 w-4 accent-[#F25C19]"
            />
            Marketing Cookies
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          onClick={() => persistConsent(acceptAllConsent())}
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-[#071B34] transition-colors hover:bg-white/90"
        >
          Accept All
        </button>
        <button
          onClick={() => persistConsent(rejectAllConsent())}
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-transparent px-5 text-sm font-bold text-white transition-colors hover:bg-white/5"
        >
          Reject All
        </button>
        <button
          onClick={() => {
            setIsExpanded((open) => !open);
            if (isExpanded) {
              persistConsent(consent);
            }
          }}
          className="inline-flex h-12 items-center justify-center rounded-full border border-[#F25C19]/40 bg-[#F25C19]/10 px-5 text-sm font-bold text-[#FFB38B] transition-colors hover:bg-[#F25C19]/20"
        >
          {isExpanded ? 'Save Preferences' : 'Manage Preferences'}
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
