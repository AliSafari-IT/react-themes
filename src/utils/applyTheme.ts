import { Theme, ThemeMode } from '../types';

/**
 * Applies theme CSS variables to the document root
 */
export function applyTheme(theme: Theme, mode: ThemeMode): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // Determine the effective mode
  let effectiveMode = mode;
  if (mode === 'auto') {
    effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Set data attributes for CSS targeting
  root.setAttribute('data-theme', theme.name);
  root.setAttribute('data-theme-mode', effectiveMode);

  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-color-${kebabCase(key)}`, value);
  });

  // Apply spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--theme-spacing-${key}`, value);
  });

  // Apply radius variables
  Object.entries(theme.radius).forEach(([key, value]) => {
    root.style.setProperty(`--theme-radius-${key}`, value);
  });

  // Apply typography variables
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    root.style.setProperty(`--theme-font-family-${key}`, value);
  });

  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--theme-font-size-${key}`, value);
  });

  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--theme-font-weight-${key}`, value);
  });

  Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
    root.style.setProperty(`--theme-line-height-${key}`, value);
  });

  // Apply transition variables
  Object.entries(theme.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--theme-transition-${key}`, value);
  });

  // Apply z-index variables
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    root.style.setProperty(`--theme-z-index-${kebabCase(key)}`, value.toString());
  });

  // Add theme class to body for additional styling
  document.body.className = document.body.className.replace(/theme-\w+/g, '');
  document.body.classList.add(`theme-${theme.name}`, `theme-${effectiveMode}`);
}

/**
 * Removes all theme-related CSS variables and classes
 */
export function removeTheme(): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // Remove data attributes
  root.removeAttribute('data-theme');
  root.removeAttribute('data-theme-mode');

  // Remove CSS variables (this is a simplified approach - in production you might want to track which variables were set)
  const styles = root.style;
  for (let i = styles.length - 1; i >= 0; i--) {
    const property = styles[i];
    if (property.startsWith('--theme-')) {
      root.style.removeProperty(property);
    }
  }

  // Remove theme classes from body
  document.body.className = document.body.className.replace(/theme-\w+/g, '');
}

/**
 * Converts camelCase to kebab-case
 */
function kebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
