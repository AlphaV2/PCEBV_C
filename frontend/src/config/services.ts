import { ROUTES } from './routes';

export const SERVICES_PAGE = {
  title: 'Core Service Offerings',
  subtitle: 'Comprehensive EPC and engineering support across the full project lifecycle',
  fallbackCategories: ['Project Controls', 'Engineering Services', 'Documentation', 'Execution Support', 'Talent Solutions'],
  hero: {
    title: 'Our Services',
    subheading:
      'Integrated engineering, controls, and documentation services for process industries across the complete EPC project lifecycle.',
    whatsappPrompt: 'Hi, I\'m interested in PCE BV engineering and project controls services.',
    routes: {
      home: ROUTES.home,
      services: ROUTES.services,
    },
  },
} as const;
