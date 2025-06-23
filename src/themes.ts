import type { Theme, ThemeColors } from './types';

// Light theme colors
const lightColors: ThemeColors = {
  // Background colors
  background: '#ffffff',
  backgroundSecondary: '#f8fafc',
  backgroundTertiary: '#f1f5f9',
  
  // Text colors
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#64748b',
  
  // Border colors
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  borderHover: '#cbd5e1',
  
  // Accent colors
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryActive: '#1d4ed8',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  
  // Interactive states
  hover: '#f8fafc',
  active: '#f1f5f9',
  focus: 'rgba(59, 130, 246, 0.1)',
  
  // Shadows
  shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

// Dark theme colors
const darkColors: ThemeColors = {
  // Background colors
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  backgroundTertiary: '#334155',
  
  // Text colors
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  
  // Border colors
  border: '#334155',
  borderLight: '#475569',
  borderHover: '#64748b',
  
  // Accent colors
  primary: '#60a5fa',
  primaryHover: '#3b82f6',
  primaryActive: '#2563eb',
  
  // Status colors
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#22d3ee',
  
  // Interactive states
  hover: '#1e293b',
  active: '#334155',
  focus: 'rgba(96, 165, 250, 0.1)',
  
  // Shadows
  shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
};

// Base theme structure
const baseTheme = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '3rem',
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  transitions: {
    fast: 'all 0.1s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    tooltip: 1100,
    overlay: 1200,
  },
};

// Light theme
export const lightTheme: Theme = {
  name: 'light',
  mode: 'light',
  colors: lightColors,
  ...baseTheme,
};

// Dark theme
export const darkTheme: Theme = {
  name: 'dark',
  mode: 'dark',
  colors: darkColors,
  ...baseTheme,
};

// Default theme (light)
export const defaultTheme = lightTheme;

// Theme presets
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

// Helper function to merge themes
export function mergeTheme(baseTheme: Theme, customTheme: Partial<Theme>): Theme {
  return {
    ...baseTheme,
    ...customTheme,
    colors: {
      ...baseTheme.colors,
      ...customTheme.colors,
    },
    spacing: {
      ...baseTheme.spacing,
      ...customTheme.spacing,
    },
    radius: {
      ...baseTheme.radius,
      ...customTheme.radius,
    },
    typography: {
      ...baseTheme.typography,
      ...customTheme.typography,
      fontFamily: {
        ...baseTheme.typography.fontFamily,
        ...customTheme.typography?.fontFamily,
      },
      fontSize: {
        ...baseTheme.typography.fontSize,
        ...customTheme.typography?.fontSize,
      },
      fontWeight: {
        ...baseTheme.typography.fontWeight,
        ...customTheme.typography?.fontWeight,
      },
      lineHeight: {
        ...baseTheme.typography.lineHeight,
        ...customTheme.typography?.lineHeight,
      },
    },
    transitions: {
      ...baseTheme.transitions,
      ...customTheme.transitions,
    },
    zIndex: {
      ...baseTheme.zIndex,
      ...customTheme.zIndex,
    },
  };
}
