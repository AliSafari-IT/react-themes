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
  root.setAttribute('data-theme', effectiveMode);

  // Apply color variables using --asm- prefix for design tokens
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--asm-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
  });

  // Apply spacing variables using --asm- prefix
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--asm-space-${key}`, value);
  });

  // Apply radius variables using --asm- prefix
  Object.entries(theme.radius).forEach(([key, value]) => {
    root.style.setProperty(`--asm-radius-${key}`, value);
  });

  // Apply typography variables using --asm- prefix
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    root.style.setProperty(`--asm-font-family-${key}`, value);
  });

  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--asm-font-size-${key}`, value);
  });

  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--asm-font-weight-${key}`, String(value));
  });

  Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
    root.style.setProperty(`--asm-line-height-${key}`, String(value));
  });

  // Apply transition variables using --asm- prefix
  Object.entries(theme.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--asm-transition-${key}`, value);
  });

  // Apply z-index variables using --asm- prefix
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    root.style.setProperty(`--asm-z-${kebabCase(key)}`, value.toString());
  });
}

/**
 * Removes all theme-related CSS variables and classes
 */
export function removeTheme(): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // Remove data attributes
  root.removeAttribute('data-theme');

  // Remove CSS variables (this is a simplified approach - in production you might want to track which variables were set)
  const styles = root.style;
  for (let i = styles.length - 1; i >= 0; i--) {
    const property = styles[i];
    if (property.startsWith('--asm-')) {
      root.style.removeProperty(property);
    }
  }
}

/**
 * Converts camelCase to kebab-case
 */
function kebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
