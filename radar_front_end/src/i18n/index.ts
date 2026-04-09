import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import nl from './locales/nl.json';

i18n
  .use(LanguageDetector)        // auto-detects browser language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      nl: { translation: nl },
    },
    fallbackLng: 'en',          // ← English as primary/fallback
    supportedLngs: ['en', 'nl'],
    detection: {
      order: ['localStorage', 'navigator'], // checks saved pref first, then browser
      caches: ['localStorage'],             // remembers user's choice
    },
    interpolation: {
      escapeValue: false,       // React already escapes
    },
  });

export default i18n;