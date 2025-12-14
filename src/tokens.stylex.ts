import * as stylex from '@stylexjs/stylex'

// Colors
export const colors = stylex.defineVars({
  // Grays
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  gray950: '#030712',

  // Blues
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#2563eb',

  // Status colors
  green400: '#4ade80',
  red400: '#f87171',

  // Semantic colors
  white: '#ffffff',
  transparent: 'transparent',
})

// Spacing
export const spacing = stylex.defineVars({
  '0': '0',
  '1': '0.25rem',    // 4px
  '2': '0.5rem',     // 8px
  '3': '0.75rem',    // 12px
  '4': '1rem',       // 16px
  '8': '2rem',       // 32px
  '9': '2.25rem',    // 36px
  '12': '3rem',      // 48px
})

// Font sizes
export const fontSize = stylex.defineVars({
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  '10px': '10px',
})

// Border radius
export const borderRadius = stylex.defineVars({
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
})

// Transitions
export const transitions = stylex.defineVars({
  fast: '200ms',
})
