import React from 'react';
import LegalPage from '../components/LegalPage';

const PrivacyPolicyPage: React.FC = () => (
  <LegalPage
    badge="Privacy Policy"
    title="How PCE BV handles your information"
    intro="We only collect and use the information needed to respond to enquiries, maintain the website, and comply with legal obligations."
    updatedAt="3 July 2026"
    sections={[
      {
        heading: 'Information we collect',
        body: [
          'Contact form details, inquiry content, and basic technical data required for site operation and security.',
          'Consent preferences stored locally so we can respect your cookie choices.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'To respond to enquiries, improve site performance, and protect the website from abuse.',
          'We do not sell personal data.',
        ],
      },
    ]}
  />
);

export default PrivacyPolicyPage;
