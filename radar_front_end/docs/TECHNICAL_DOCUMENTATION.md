# Radar Snipers Frontend Technical Documentation

## 1. Project Summary

This project is the public-facing frontend for Radar Snipers. It is built with React 19, TypeScript, and Vite 6, and it consumes data from a PHP backend. The website supports English and Dutch localization, responsive layouts across desktop/tablet/mobile, and content-heavy sections such as services, products, gallery, projects, testimonials, about, and contact.

The current codebase has been tuned for:
- multilingual rendering
- reliable mobile navigation
- small-screen layout stability
- performance-safe motion and section reveal behavior
- modal-based product/service/project details

## 2. Technology Stack

- React 19
- TypeScript 5.8
- Vite 6
- Tailwind utility classes via CDN in `index.html`
- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`
- `lucide-react` icons

## 3. Repository Layout

Important frontend paths:

- `App.tsx` - top-level page composition, modal state, language wiring, WhatsApp link generation
- `index.tsx` - React bootstrap and global stylesheet import
- `src/i18n/index.ts` - i18n initialization and language detection
- `src/i18n/locales/en.json` - English translations
- `src/i18n/locales/nl.json` - Dutch translations
- `src/hooks/useTranslatedData.ts` - translated data hooks for services, products, gallery, team, contacts, nav links
- `src/components/Navbar.tsx` - desktop/mobile navigation and language switcher
- `src/components/Hero.tsx` - hero section and rotating media background
- `src/components/Services.tsx` - service cards
- `src/components/Products.tsx` - product cards
- `src/components/Gallery_.tsx` - gallery carousel and lightbox
- `src/components/Projects.tsx` - project list and project modal launcher
- `src/components/Testimonials.tsx` - testimonials section
- `src/components/About.tsx` - company story and founder profile
- `src/components/Contact.tsx` - contact cards and WhatsApp form flow
- `src/components/Footer.tsx` - footer and social links
- `src/components/ServiceModal.tsx` - service detail modal
- `src/components/ProductModal.tsx` - product detail modal
- `src/components/ProjectModal.tsx` - project detail modal
- `src/components/RevealSection.tsx` - lightweight reveal-on-scroll wrapper
- `src/styles/motion.css` - shared motion classes and reduced-motion fallback

Backend paths relevant to the frontend:

- `backend/api/getprojects.php`
- `backend/api/gettestimonials.php`
- `backend/api/getproducts.php`
- `backend/api/getservices.php`
- `backend/api/getgallery.php`
- `backend/api/submit-contact.php`
- `backend/api/health-check.php`
- `backend/api/db_test.php`

## 4. Data Flow Overview

The app is mostly data-driven:

1. `App.tsx` initializes the page and passes modal handlers into child components.
2. `Navbar.tsx` renders translated navigation and mobile controls.
3. `useTranslatedData.ts` converts base data/constants into translated view models.
4. Sections render translated content and open modals for deeper details.
5. Some sections use backend fetch calls and fall back to static constants if the API is unavailable.

The contact form opens a WhatsApp chat using the composed message rather than submitting to a traditional API form endpoint.

## 5. Internationalization

Localization is configured in `src/i18n/index.ts`.

Behavior:
- Supported languages: English (`en`) and Dutch (`nl`)
- Browser language detection is enabled
- The chosen language is cached in `localStorage`
- English is the fallback language

Implementation notes:
- Translation data lives in JSON locale files.
- Shared content is mapped through hooks rather than storing language-specific copies in state.
- This avoids stale-language bugs in modals and nested content.

Developer guidance:
- When adding new UI strings, add them to both locale files.
- Prefer translation keys over hardcoded UI text for user-facing content.
- For structured content like services/products/gallery, translate the source data in a hook rather than in each component.

## 6. Responsive Design Strategy

The current responsive strategy uses Tailwind utility classes and carefully chosen breakpoint variants.

Key responsive principles used in the project:
- fluid widths rather than fixed widths where possible
- breakpoint-specific heights for hero/gallery/modal content
- mobile-first spacing that scales up on tablet and desktop
- safe-area support for modern mobile devices
- reduced menu and modal padding on small phones

Important mobile improvements already in place:
- burger menu remains usable while scrolled
- EN/NL toggles are visible near the mobile header actions
- mobile menu uses a bounded panel rather than a full lock-screen sheet
- body scroll is locked only while the menu is open
- modals use dynamic viewport sizing to avoid clipping on iPhone and Samsung devices

## 7. Motion And Interaction Policy

Motion was intentionally kept subtle and performance-safe.

Implemented behavior:
- section reveal animation for major sections via Intersection Observer
- mobile menu enter animation using opacity and transform only
- reduced-motion fallback through CSS media query

Avoided patterns:
- no heavy parallax across the full page
- no repeated animation loops on most content blocks
- no layout thrashing animations using width/height/top/left where avoidable

If you add new motion, prefer:
- `opacity`
- `transform`
- short durations
- one-time reveal triggers

## 8. Mobile Navigation Details

`Navbar.tsx` now includes a more defensive mobile interaction model.

Implemented safeguards:
- body scroll lock with scroll position restore
- outside-click close on the overlay only
- escape-to-close support
- auto-close on hash changes and desktop breakpoint resize
- open timestamp guard to avoid immediate close race conditions

This prevents the menu from freezing or failing to open after the user has scrolled down the page.

## 9. Content And Modal Behavior

The site uses modal views for deeper product/service/project detail browsing.

Data consistency rules:
- the modal display should resolve translated data by stable ID
- do not hold stale language-dependent objects in state if the language can change
- keep modal content resilient to missing images and API fallbacks

Current modal files:
- `ServiceModal.tsx`
- `ProductModal.tsx`
- `ProjectModal.tsx`

Responsive modal handling now includes:
- smaller overlay padding on small phones
- dynamic viewport height limits
- tighter image headers
- responsive title wrapping

## 10. API And Environment Variables

The frontend expects these environment values:

```bash
GEMINI_API_KEY=your-gemini-api-key
VITE_API_BASE_URL=http://localhost/radarsnipers/backend/api
```

Notes:
- `GEMINI_API_KEY` is injected by Vite config for compatibility with existing code paths.
- `VITE_API_BASE_URL` is used for backend requests such as projects and testimonials.

If you deploy the frontend separately from the PHP backend, make sure the API base URL is reachable from the browser.

## 11. Local Development Workflow

Typical workflow:

1. Install dependencies.
2. Set environment variables.
3. Run the dev server.
4. Verify the language switcher, mobile menu, and modal flows.
5. Run a production build before deployment.

Commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 12. Recent Fixes Shipped

This codebase has recently been updated with:

- full English/Dutch localization support
- shared translated data hooks
- modal translation consistency fixes
- founder image and about-section translation stability
- removal of stale layout issues and runtime warnings
- better gallery loading behavior
- better mobile navigation reliability at all scroll positions
- subtle reveal animations and reduced-motion support
- breakpoint hardening across hero, about, contact, gallery, and modals

## 13. Known Integration Points

When extending the site, the most important integration points are:

- `App.tsx` for global state and section layout
- `Navbar.tsx` for mobile navigation and language handling
- `src/hooks/useTranslatedData.ts` for translated content mapping
- `src/i18n/locales/en.json` and `src/i18n/locales/nl.json` for new strings
- `backend/api/*` for new or updated data endpoints

## 14. Development Guidelines

Recommended conventions for future work:

- Keep UI text in translation files where possible.
- Prefer shared data hooks over duplicated content in multiple components.
- Keep responsive changes minimal and test at common breakpoints.
- Validate mobile behavior after any navbar, modal, or hero change.
- Favor transform/opacity motion over layout-changing animation.
- Keep fallback behavior for API-driven sections.

## 15. Troubleshooting

If the site does not load correctly:

- Verify `npm install` completed successfully.
- Confirm `VITE_API_BASE_URL` points to the backend API.
- Check whether the backend endpoints are reachable from the browser.
- Ensure locale files still contain the keys used by components.
- Run `npm run build` to catch TypeScript or bundle regressions.

If mobile layout breaks:

- check the navbar first
- inspect fixed heights in hero/gallery/modal containers
- confirm no element is forcing horizontal overflow
- verify safe-area and viewport-fit settings remain in `index.html`

## 16. Build Verification

The frontend is currently validated with:

```bash
npm run build
```

The build has been confirmed successful after the recent responsive and documentation updates.