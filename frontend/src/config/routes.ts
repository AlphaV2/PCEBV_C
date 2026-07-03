export const ROUTES = {
  home: '/',
  services: '/services',
  projects: '/projects',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy-policy',
  terms: '/terms',
  cookiePolicy: '/cookie-policy',
  cookiePreferences: '/cookie-preferences',
  sitemap: '/sitemap.xml',
  robots: '/robots.txt',
  manifest: '/manifest.webmanifest',
} as const;

export const SUPPORTED_LOCALES = ['en', 'nl'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
