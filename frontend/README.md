# PCE BV Frontend

PCE BV is a Vite + React + TypeScript frontend for the company website. It includes English/Dutch localization, responsive mobile navigation, data-driven sections, modal-driven service details, and a PHP-backed API integration layer.

For full developer documentation, see [docs/TECHNICAL_DOCUMENTATION.md](docs/TECHNICAL_DOCUMENTATION.md).

## Quick Start

### Prerequisites
- Node.js 18+ recommended
- A compatible backend API base URL for the PHP endpoints

### Install
```bash
npm install
```

### Environment
Create or update `.env.local` with the project API key and backend URL:
```bash
GEMINI_API_KEY=your-gemini-api-key
VITE_API_BASE_URL=http://localhost/PCEBV/backend/api
```

### Run
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Project Notes
- Localization is handled through `src/i18n` with browser language detection and localStorage persistence.
- Responsive behavior is tuned for desktop, tablet, iPhone, Samsung, and narrow mobile screens.
- Key user-facing sections are driven by translated constants and API-backed content.

## Documentation
- [Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md)



 