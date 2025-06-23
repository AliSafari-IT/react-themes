// @asafarim/react-themes - A comprehensive theme management system for React apps
// Export all types and interfaces
export * from './types';

// Export all themes and utilities
export * from './themes';

// Export main components and hooks
export { ThemeProvider } from './components/ThemeProvider';
export type { ThemeContextType } from './components/ThemeProvider';
export { useTheme } from './hooks/useTheme';
export { useThemeToggle } from './hooks/useThemeToggle';
export { ThemeToggle } from './components/ThemeToggle';
export { ThemeSelector } from './components/ThemeSelector';

// Export theme utilities
export { createTheme } from './utils/createTheme';
export { applyTheme } from './utils/applyTheme';
export { mergeThemes, mergeThemeColors, deepMergeThemes } from './utils/mergeThemes';

// Default export for convenience
export { ThemeProvider as default } from './components/ThemeProvider';
