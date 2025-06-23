import { useThemeContext, ThemeContextType } from '../components/ThemeProvider';

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextType {
  return useThemeContext();
}
