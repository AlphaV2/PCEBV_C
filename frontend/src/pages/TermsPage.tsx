import React from 'react';
import LegalPage from '../components/LegalPage';

const TermsPage: React.FC = () => {
  const sections = [
    {
      heading: "1. Acceptance",
      body: ["By accessing or using https://pcebv.com, you agree to these Terms of Service. If you do not agree, please discontinue use of this website."]
    },
    {
      heading: "2. Website Purpose",
      body: ["Our website provides information regarding our Engineering, Project Controls, and Industrial Services. The content is for informational purposes only."]
    },
    {
      heading: "3. Intellectual Property",
      body: ["All content, branding, and materials on this website are the property of Petroleum Consulting Engineers BV, except where indicated otherwise."]
    },
    {
      heading: "4. Permitted Use",
      body: ["You may view, share, and print content for personal/business use. You may not copy, sell, republish, modify, or reverse-engineer our content without express written consent."]
    },
    {
      heading: "5. Engineering Disclaimer",
      body: ["Content on this site is informational only. It does not constitute professional engineering advice, does not create a client relationship, and does not replace professional consultancy services."]
    },
    {
      heading: "6. Quotes and Proposals",
      body: ["Any information provided on this site is not a binding offer. Only signed proposals or written agreements constitute a legally binding contract."]
    },
    {
      heading: "7. Limitation of Liability",
      body: ["PCE BV is not liable for damages resulting from the use or inability to use this website, to the extent permitted by applicable law."]
    },
    {
      heading: "8. Third-Party Links",
      body: ["Our website may contain links to external sites for which we hold no responsibility regarding their content or practices."]
    },
    {
      heading: "9. Website Availability",
      body: ["We strive to maintain website availability but do not guarantee uninterrupted access."]
    },
    {
      heading: "10. Privacy Reference",
      body: ["Please review our Privacy Policy and Cookie Policy for details on how we manage data."]
    },
    {
      heading: "11. Governing Law & Jurisdiction",
      body: ["These terms are governed by the laws of The Netherlands. Any disputes shall be subject to the exclusive jurisdiction of the Courts of The Netherlands."]
    },
    {
      heading: "12. Changes",
      body: ["We may update these terms occasionally. Continued use of the site constitutes acceptance of updated terms."]
    },
    {
      heading: "13. Contact",
      body: ["For enquiries, please contact nishikant.choudhary@pcenc.com."]
    }
  ];

  return (
    <LegalPage
      badge="Legal & Compliance"
      title="Terms of Service"
      intro="Website Terms and Conditions for Petroleum Consulting Engineers BV."
      updatedAt="July 2026"
      sections={sections}
    />
  );
};

export default TermsPage;