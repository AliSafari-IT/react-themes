import { useThemeContext } from '../components/ThemeProvider';
import type { ThemeContextValue } from '../types';

export function useTheme(): ThemeContextValue {
  return useThemeContext();
}
