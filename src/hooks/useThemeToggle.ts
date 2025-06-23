import { useTheme } from './useTheme';

/**
 * Hook that provides theme toggle functionality
 */
export function useThemeToggle() {
  const { mode, setMode, toggleMode } = useTheme();
  
  // Get effective mode (resolving 'auto' to actual light/dark)
  const getEffectiveMode = (): 'light' | 'dark' => {
    if (mode === 'auto') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light'; // fallback for SSR
    }
    return mode;
  };

  const effectiveMode = getEffectiveMode();
  
  return {
    mode,
    setMode,
    toggleMode,
    isDark: effectiveMode === 'dark',
    isLight: effectiveMode === 'light',
    isAuto: mode === 'auto',
    effectiveMode, // Expose the resolved mode
  };
}
