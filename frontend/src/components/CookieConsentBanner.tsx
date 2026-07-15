import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { ROUTES } from '../config'; // Ensure this points to your config file
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

  useEffect(() => {
    if (!loadCookieConsent()) setIsVisible(true);
  }, []);

  const persistConsent = (nextConsent: CookieConsentState) => {
    saveCookieConsent(nextConsent);
    onConsentChange?.(nextConsent);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[1100] mx-auto max-w-[720px] rounded-2xl border border-slate-200 bg-[#FCFCFD] p-6 shadow-lg sm:bottom-8" 
         style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
         role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      
      <div className="flex items-start gap-4">
        <ShieldCheck className="text-[#071B34] shrink-0" size={24} />
        <div>
          <h2 id="cookie-title" className="text-lg font-bold text-[#071B34]">Privacy & Cookies</h2>
          <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
            We use essential cookies to operate this site. With your permission, we also use analytics cookies to improve engineering performance.
          </p>
          <div className="mt-3 flex gap-4 text-xs font-bold underline underline-offset-4 text-[#071B34]">
            <a href={ROUTES.privacy} className="hover:text-[#F25C19]">Privacy Policy</a>
            <a href="/cookies" className="hover:text-[#F25C19]">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Button Hierarchy */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => persistConsent(rejectAllConsent())}
          className="h-11 rounded-xl border border-slate-200 text-sm font-semibold text-[#071B34] hover:bg-slate-100 transition-all"
        >
          Reject
        </button>
        <button
          onClick={() => persistConsent(acceptAllConsent())}
          className="h-11 rounded-xl bg-[#071B34] text-sm font-semibold text-white hover:bg-[#1a2e4d] transition-all"
        >
          Accept All
        </button>
        <button
          onClick={() => window.location.href = '/cookies'}
          className="col-span-2 h-11 rounded-xl border border-transparent text-sm font-semibold text-[#C65300] hover:bg-orange-50 transition-all"
        >
          Customize Preferences
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;