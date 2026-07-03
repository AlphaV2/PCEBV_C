import React from 'react';
import LegalPage from '../components/LegalPage';

const TermsPage: React.FC = () => (
  <LegalPage
    badge="Terms of Service"
    title="Website usage terms"
    intro="These terms outline acceptable use of the website and the limits of liability for the published content."
    updatedAt="3 July 2026"
    sections={[
      {
        heading: 'Acceptable use',
        body: [
          'Do not attempt unauthorized access, disrupt the site, or submit malicious or misleading information.',
          'Content on this website is provided for informational purposes and may change without notice.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'PCE BV is not liable for indirect damages resulting from site use, outages, or third-party integrations.',
        ],
      },
    ]}
  />
);

export default TermsPage;
