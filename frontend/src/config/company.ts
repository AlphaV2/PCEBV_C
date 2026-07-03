import { ROUTES } from './routes';

export const COMPANY = {
  name: 'PCE BV',
  legalName: 'Petroleum Consulting Engineers BV',
  tagline: 'Engineering and Project Controls',
  email: 'nishikant.choudhary@pcenc.com',
  phone: '+31611596812',
  whatsappMessage: "Hi, I'm interested in PCE BV engineering and project controls services.",
  registration: 'KVK No. 97146412',
  office: {
    street: 'Ereprijsweg 14',
    postalCode: '2565 AV',
    city: 'The Hague',
    country: 'Netherlands',
  },
  partnerOffice: {
    name: 'PCE PL - Petroleum Consulting Engineers Private Limited',
    city: 'Mumbai, India',
    role: 'Execution and Engineering Delivery Center',
  },
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/nishikantchoudharypmp/',
    twitter: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },
  routes: ROUTES,
} as const;

export const buildWhatsAppUrl = (message: string = COMPANY.whatsappMessage) =>
  `https://wa.me/${COMPANY.phone.replace('+', '')}?text=${encodeURIComponent(message)}`;

export const buildMailtoUrl = (email: string = COMPANY.email) => `mailto:${email}`;
export const buildTelUrl = (phone: string = COMPANY.phone) => `tel:${phone}`;
