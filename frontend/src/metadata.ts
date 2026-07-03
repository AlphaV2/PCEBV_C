import { COMPANY, buildWhatsAppUrl } from './config';
import { SEO, buildCanonicalUrl } from './config/seo';

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  locale?: string;
};

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const element = existing ?? document.createElement('meta');

  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));

  if (!existing) {
    document.head.appendChild(element);
  }
};

export const applyPageMetadata = ({
  title = SEO.title,
  description = SEO.description,
  path = SEO.canonicalPath,
  locale = SEO.defaultLocale,
}: MetadataInput = {}) => {
  const origin = window.location.origin;
  const canonicalUrl = buildCanonicalUrl(origin, path);

  document.title = title;
  document.documentElement.lang = locale;

  ensureMetaTag('meta[name="description"]', { name: 'description', content: description });
  ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
  ensureMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
  ensureMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: COMPANY.name });
  ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  let ogImage = document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]');
  if (!ogImage) {
    ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    document.head.appendChild(ogImage);
  }
  ogImage.setAttribute('content', SEO.ogImage);
};

export const getDefaultShareUrl = (path = SEO.canonicalPath) => `${window.location.origin}${path}`;
export const getDefaultWhatsAppUrl = () => buildWhatsAppUrl();
