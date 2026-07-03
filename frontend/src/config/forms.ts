export const CONTACT_FORM = {
  maxNameLength: 120,
  maxEmailLength: 200,
  maxPhoneLength: 32,
  maxCompanyLength: 160,
  maxMessageLength: 2000,
  honeypotFieldName: 'website',
  consentFieldName: 'consent',
  inquiryTopics: [
    'General Inquiry',
    'Product Support',
    'Sales & Quotes',
    'Partnership Opportunities',
    'Careers',
  ],
  phonePattern: /^[+]?([0-9\s()-]){7,20}$/,
  companyPattern: /^[\p{L}\p{N}\s.,&'()\-\/]{2,160}$/u,
  namePattern: /^[\p{L}\s.'\-]{2,120}$/u,
} as const;
