import React from 'react';
import LegalPage from '../components/LegalPage';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      heading: "1. Introduction",
      body: ["Petroleum Consulting Engineers BV ('PCE BV') is committed to protecting your privacy. This policy outlines how we collect, process, and protect your personal information in compliance with the General Data Protection Regulation (GDPR) for our website: https://pcebv.com."]
    },
    {
      heading: "2. Company Information",
      body: ["Petroleum Consulting Engineers BV", "Ereprijsweg 14, 2565 AV, The Hague, Netherlands", "Email: nishikant.choudhary@pcenc.com"]
    },
    {
      heading: "3. Information We Collect",
      body: ["We collect only necessary information: Full Name, Company, Business Email, Phone, Country, Service Interest, Project Message, Cookie preferences, and Anonymous Analytics."]
    },
    {
      heading: "4. How We Collect Information",
      body: ["We collect information through direct Contact Forms, Quick Enquiry submissions, functional Cookies, and Google Analytics."]
    },
    {
      heading: "5. Purpose of Processing",
      body: ["Data is processed for legitimate business purposes: responding to enquiries, scheduling consultations, improving website performance, maintaining security, and meeting legal obligations."]
    },
    {
      heading: "6. Legal Basis (GDPR)",
      body: ["We process data based on your explicit consent, legitimate business interests, or compliance with legal obligations."]
    },
    {
      heading: "7. Cookies",
      body: ["Our site uses Necessary Cookies for core functionality and Analytics Cookies (only after consent). We do not use marketing, advertising, or profiling cookies. Please see our Cookie Policy for details."]
    },
    {
      heading: "8. Google Analytics",
      body: ["Google Analytics is enabled only after user consent. It provides anonymous, aggregated usage statistics without advertising features."]
    },
    {
      heading: "9. Data Sharing",
      body: ["We do not sell or rent data. Data is shared only with essential service providers: Netlify (hosting), Google Analytics (with consent), and Google Workspace/Sheets (form processing)."]
    },
    {
      heading: "10. Data Retention",
      body: ["Contact enquiries are retained for 24 months. Analytics data is retained according to Google Analytics settings."]
    },
    {
      heading: "11. International Transfers",
      body: ["Data may be processed outside the EEA. Where this occurs, appropriate GDPR-compliant safeguards are applied."]
    },
    {
      heading: "12. Security",
      body: ["We employ HTTPS, strict access controls, and industry-standard digital safeguards to protect your information."]
    },
    {
      heading: "13. Your Rights",
      body: ["Under GDPR, you have the right to access, correct, delete, restrict, or object to processing, request data portability, withdraw consent, or lodge a complaint with a supervisory authority."]
    },
    {
      heading: "14. Children's Privacy",
      body: ["This website is intended for business users and does not knowingly collect information from children under 16."]
    },
    {
      heading: "15. External Links",
      body: ["We are not responsible for the privacy practices of external third-party websites linked from our platform."]
    },
    {
      heading: "16. Changes",
      body: ["We may update this policy periodically. The latest version is always available on this page."]
    },
    {
      heading: "17. Contact",
      body: ["For privacy enquiries, contact nishikant.choudhary@pcenc.com."]
    }
  ];

  return (
    <LegalPage
      badge="Legal & Compliance"
      title="Privacy Policy"
      intro="How PCE BV protects and processes your personal information."
      updatedAt="July 2026"
      sections={sections}
    />
  );
};

export default PrivacyPolicyPage;