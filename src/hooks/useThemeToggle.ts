import { useTheme } from './useTheme';

/**
 * Hook that provides theme toggle functionality
 */
export function useThemeToggle() {
  const { mode, setMode, toggleMode } = useTheme();
  
  return {
    mode,
    setMode,
    toggleMode,
    isDark: mode === 'dark',
    isLight: mode === 'light',
    isAuto: mode === 'auto',
  };
}
