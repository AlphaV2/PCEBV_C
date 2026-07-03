import { ROUTES } from './routes';

export const HERO = {
  label: 'Corporate EPC Delivery',
  title: 'Engineering & Project Controls for Industrial EPC Projects',
  subtitle: 'Netherlands-led governance. India-based engineering. Built for clarity, speed, and reliability.',
  ctas: {
    primary: 'Consult Us',
    secondary: 'Explore Services',
  },
  images: [
    { src: '/background/bg3.webp', alt: 'Industrial refinery plant EPC project', focalPoint: 'center 40%' },
    { src: '/background/bg2.webp', alt: 'Engineering team collaboration at worksite', focalPoint: 'center 50%' },
    { src: '/background/bg1.webp', alt: 'Industrial plant detail and process equipment', focalPoint: 'center 30%' },
  ],
  routes: {
    services: ROUTES.services,
    contact: ROUTES.contact,
  },
} as const;
