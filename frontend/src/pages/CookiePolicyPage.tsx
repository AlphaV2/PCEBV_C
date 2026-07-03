import React from 'react';
import LegalPage from '../components/LegalPage';

const CookiePolicyPage: React.FC = () => (
  <LegalPage
    badge="Cookie Policy"
    title="Cookie and consent management"
    intro="We use a minimal consent model so visitors can accept or reject optional cookie categories before any tracking begins."
    updatedAt="3 July 2026"
    sections={[
      {
        heading: 'Cookie categories',
        body: [
          'Necessary cookies are required for essential site functions.',
          'Functional, analytics, and marketing cookies are optional and only enabled after consent.',
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'You can accept all cookies, reject optional cookies, or manage the categories individually.',
        ],
      },
    ]}
  />
);

export default CookiePolicyPage;
