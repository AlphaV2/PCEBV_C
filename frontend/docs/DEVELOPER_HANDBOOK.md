# PCE BV Frontend Developer Handbook

## Purpose

This handbook is the working guide for the current frontend version. It is meant to keep the codebase modular, responsive, and easy to extend without introducing layout regressions.

## Current Structure

- `App.tsx` owns global composition, route selection, language wiring, and page shell order.
- `src/components/` contains reusable UI blocks such as navbar, hero, ticker, footer, and section cards.
- `src/pages/` contains route-level pages that compose those components.
- `src/config/` contains page content configuration.
- `src/i18n/` contains locale setup and translations.

Prefer shared components when a section is used in more than one place. For example, the About page now uses the shared `FoundersSection` component instead of carrying a duplicate inline founders implementation.

## Organization Rules

1. Keep route-level pages small and compositional.
2. Move repeated UI or content patterns into components.
3. Keep content data in config/constants rather than copying it into multiple files.
4. Keep section-level anchors stable so navbar deep links continue to work.
5. Use descriptive names for sections and files so future maintenance is obvious.

## Responsive Standards

Use mobile-first layout rules with Tailwind breakpoints.

- Start with a single-column mobile layout.
- Add `sm`, `md`, `lg`, and `xl` enhancements only when needed.
- Avoid fixed heights unless a section is intentionally clipped or animated.
- Prefer `max-width`, flexible grids, and wrapping flex layouts.
- Use `scroll-mt-*` on anchored sections so the fixed navbar does not hide targets.

Device compatibility targets:

- iPhone Safari
- Android Chrome
- iPad and tablet widths
- Desktop Chromium-based browsers
- Reduced-motion accessibility mode

## Navbar And Global Shell Rules

- The navbar is fixed and global.
- Any top-page content must account for navbar offset.
- Mobile drawers must lock body scroll while open.
- Close overlays on outside click, Escape, and desktop resize.
- Keep language controls visible and never let the burger button drift away from the right edge on mobile.

## Motion And Performance Rules

Prefer transform and opacity animations.

Good:

- `opacity`
- `transform`
- `will-change: transform`
- one-time IntersectionObserver reveals

Avoid:

- animating width, height, top, or left unless necessary
- repeated timers that never clear
- heavy re-renders in scrolling sections

For performance-sensitive sections:

- keep image `loading="lazy"` where appropriate
- add `contain` where a section can be isolated safely
- use `backface-visibility` and `translateZ(0)` for marquee/ticker style motion when needed

## Component Maintenance Rules

- Keep a component focused on one job.
- If a page starts carrying repeated logic, extract it.
- Avoid duplicating section data in both a page and a component.
- Keep image fallbacks resilient so broken assets do not crash the layout.
- Keep comments short and only where the code would otherwise be ambiguous.

## Page-Specific Notes

### Home Page

- Treat the hero as the above-the-fold anchor.
- Keep the ticker lightweight and mobile-safe.
- Keep each major section visually separated with clear spacing and background contrast.

### About Page

- Use the shared `FoundersSection` component.
- Keep the page narrative in sections, not in ad-hoc inline markup.
- Preserve the `#founders` anchor for navigation and CTA links.

### Services Page

- Keep deep-link anchors stable.
- Service cards should be readable and usable at small widths.

## Refactor Checklist

Before merging a change:

1. Check the affected component in mobile and desktop layouts.
2. Run a production build.
3. Verify there are no stale imports or duplicate logic.
4. Confirm fixed-header anchors still scroll to the correct content.
5. Check reduced-motion behavior if the change adds animation.

## Version Notes

Current version focus:

- simplified navbar hierarchy
- shared founders section on About page
- mobile ticker stability
- fixed-navbar spacing on hero and anchored sections
- responsive cleanup across mobile, tablet, and desktop widths

## Updating This Handbook

Update this document when you:

- move UI into new components
- add a page-level layout rule
- change responsive breakpoints or navbar behavior
- introduce new motion patterns or accessibility requirements
- add a new section that should be maintained by future contributors