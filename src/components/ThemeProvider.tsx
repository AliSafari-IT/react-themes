import * as React from 'react';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, ThemeConfig, ThemeMode } from '../types';
import { defaultThemes } from '../themes';
import { applyTheme } from '../utils/applyTheme';

export interface ThemeContextType {
  currentTheme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: Theme) => void;
  themes: Record<string, Theme>;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  config?: ThemeConfig;
  defaultMode?: ThemeMode;
  defaultTheme?: string;
  persistMode?: boolean;
  storageKey?: string;
  customThemes?: Record<string, Theme>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'auto',
  defaultTheme = 'default',
  persistMode = true,
  storageKey = 'asafarim-theme-mode',
  customThemes = {},
}) => {
  const allThemes = { ...defaultThemes, ...customThemes };
  
  // Get initial mode from localStorage or use default
  const getInitialMode = (): ThemeMode => {
    if (!persistMode || typeof window === 'undefined') return defaultMode;
    
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'auto'].includes(stored)) {
        return stored as ThemeMode;
      }
    } catch (error) {
      console.warn('Failed to read theme mode from localStorage:', error);
    }
    
    return defaultMode;
  };
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [currentThemeName, setCurrentThemeName] = useState<string>(defaultTheme);

  // Get the effective mode (resolving 'auto' to actual light/dark)
  const getEffectiveMode = (): 'light' | 'dark' => {
    if (mode === 'auto') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light'; // fallback for SSR
    }
    return mode;
  };
  // Get the current theme based on mode and theme name
  const getCurrentTheme = (): Theme => {
    const effectiveMode = getEffectiveMode();
    
    // If user selected a specific theme, use it
    if (currentThemeName !== 'default' && currentThemeName in allThemes) {
      return allThemes[currentThemeName as keyof typeof allThemes];
    }
    
    // Otherwise use the theme that matches the effective mode
    return effectiveMode === 'dark' ? allThemes.dark : allThemes.light;
  };

  const currentTheme = getCurrentTheme();

  // Update mode and persist if enabled
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    
    if (persistMode && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, newMode);
      } catch (error) {
        console.warn('Failed to save theme mode to localStorage:', error);
      }
    }
  };

  // Toggle between light and dark modes
  const toggleMode = () => {
    if (mode === 'auto') {
      // If auto, switch to opposite of system preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(systemDark ? 'light' : 'dark');
    } else {
      setMode(mode === 'light' ? 'dark' : 'light');
    }
  };
  // Set theme by name
  const setTheme = (theme: Theme) => {
    setCurrentThemeName(theme.name);
  };
  // Apply theme to document
  useEffect(() => {
    applyTheme(currentTheme, mode);
  }, [currentTheme, mode, currentThemeName]); // Add currentThemeName as dependency

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (mode !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Force re-render when system preference changes
      applyTheme(getCurrentTheme(), mode);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  const contextValue: ThemeContextType = {
    currentTheme,
    mode,
    setMode,
    setTheme,
    themes: allThemes,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
