import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

export const THEME = {
  colors: COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
} as const;
