export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    display: 'Oswald, Inter, system-ui, sans-serif',
  },
  scale: {
    hero: 'clamp(1.8rem, 4vw, 3rem)',
    h2: 'clamp(1.3rem, 2.5vw, 2rem)',
    h3: 'clamp(1rem, 1.8vw, 1.3rem)',
    body: 'clamp(0.9rem, 1.4vw, 1.05rem)',
    label: '0.75rem',
    small: '0.875rem',
  },
  weight: {
    hero: 900,
    heading: 700,
    body: 400,
    label: 600,
    small: 500,
  },
  lineHeight: {
    hero: 1.05,
    heading: 1.2,
    body: 1.6,
  },
} as const;
