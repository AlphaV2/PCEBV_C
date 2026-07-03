import { COMPANY } from './company';
import { ROUTES, SUPPORTED_LOCALES } from './routes';

export const SEO = {
  title: `${COMPANY.name} | Engineering and Project Controls`,
  description: 'Netherlands-led EPC engineering and project controls for complex industrial projects across Europe.',
  keywords: [
    'EPC engineering',
    'project controls',
    'detail engineering',
    'Netherlands engineering',
    'industrial project planning',
    'execution support',
  ],
  siteName: COMPANY.name,
  defaultLocale: 'en',
  supportedLocales: SUPPORTED_LOCALES,
  canonicalPath: ROUTES.home,
  ogImage: '/logo/company_logo.png',
} as const;

export const buildCanonicalUrl = (origin: string, path: string = ROUTES.home) => {
  const trimmedOrigin = origin.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${trimmedOrigin}${normalizedPath}`;
};
