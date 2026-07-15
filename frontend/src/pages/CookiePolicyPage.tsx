import React from 'react';
import LegalPage from '../components/LegalPage';

const CookiePolicyPage: React.FC = () => {
  const sections = [
    {
      heading: "1. Introduction",
      body: ["Petroleum Consulting Engineers BV ('PCE BV') uses cookies to ensure our website functions correctly, remember your preferences, and help us understand website usage. This policy explains what cookies are and how you can manage them. By continuing to use our website, you acknowledge this policy."]
    },
    {
      heading: "2. What Are Cookies?",
      body: ["Cookies are small text files stored on your device by your browser. They help websites remember preferences, improve functionality, and measure performance. They do not access files on your device."]
    },
    {
      heading: "3. Cookies We Use",
      body: [
        "We use only two categories:",
        "• Necessary Cookies: Essential for website functionality and storing your consent preferences (Always Active).",
        "• Analytics Cookies: Used to understand website usage through Google Analytics (Only after your explicit consent)."
      ]
    },
    {
      heading: "4. Exclusions",
      body: ["We do not use advertising, marketing, behavioural profiling, social media tracking, or third-party advertising network cookies."]
    },
    {
      heading: "5. Google Analytics",
      body: ["Enabled only after your consent. It collects anonymous usage data such as pages visited, time spent, and approximate location. This data is aggregated and does not identify individuals."]
    },
    {
      heading: "6. Managing Cookies",
      body: ["You can manage your preferences via our Cookie Banner or through your browser settings. Note that disabling necessary cookies may affect website functionality."]
    },
    {
      heading: "7. Cookie Retention",
      body: ["Necessary cookie preferences remain until you clear your browser data. Analytics cookie retention is governed by Google Analytics policies."]
    },
    {
      heading: "8. Contact Us",
      body: ["For questions, contact nishikant.choudhary@pcenc.com. Our office is located at Ereprijsweg 14, 2565 AV, The Hague, Netherlands."]
    }
  ];

  return (
    <LegalPage
      badge="Legal & Compliance"
      title="Cookie Policy"
      intro="How PCE BV uses cookies to manage your preferences and improve website performance."
      updatedAt="July 2026"
      sections={sections}
    />
  );
};

export default CookiePolicyPage;