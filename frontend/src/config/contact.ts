import { COMPANY, buildMailtoUrl, buildTelUrl, buildWhatsAppUrl } from './company';

export const CONTACT = {
  title: 'Have a Project in Mind?',
  description: "Let's explore how PCEBV can support your next EPC initiative.",
  trustPoints: ['24-hour response commitment', 'Confidential project discussions', 'Expert technical support'],
  offices: [
    {
      title: 'Registered Office (Netherlands)',
      lines: [
        COMPANY.legalName,
        COMPANY.office.street,
        `${COMPANY.office.postalCode} ${COMPANY.office.city}`,
        COMPANY.registration,
        `Mobile No.: ${COMPANY.phone}`,
        `Email: ${COMPANY.email}`,
      ],
    },
    {
      title: 'Partner Engineering Office (India)',
      lines: [
        COMPANY.partnerOffice.name,
        COMPANY.partnerOffice.city,
        COMPANY.partnerOffice.role,
        'Disciplines: Process, Piping, Mechanical, Electrical, Instrumentation, Civil',
      ],
    },
  ],
  links: {
    mailto: buildMailtoUrl(),
    tel: buildTelUrl(),
    whatsapp: buildWhatsAppUrl(),
  },
} as const;
