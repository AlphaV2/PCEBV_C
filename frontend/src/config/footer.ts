import { COMPANY } from './company';
import { ROUTES } from './routes';

export const FOOTER = {
  companyLine: `${COMPANY.legalName} is a Netherlands-based engineering and project controls company delivering EPC support across Europe and beyond.`,
  contactInfo: {
    email: COMPANY.email,
    phone: COMPANY.phone,
    address: `${COMPANY.office.street}, ${COMPANY.office.postalCode} ${COMPANY.office.city}, ${COMPANY.office.country}`,
  },
  legalLinks: [
    { label: 'Privacy Policy', href: ROUTES.privacy },
    { label: 'Terms of Service', href: ROUTES.terms },
    { label: 'Cookie Policy', href: ROUTES.cookiePolicy },
  ],
} as const;
