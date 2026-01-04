import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeContextValue, ThemeProviderProps, ThemeMode, DensityMode, DirectionMode } from '../types';
import '@asafarim/design-tokens/css/index.css';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'auto',
  defaultDensity = 'default',
  defaultDirection = 'ltr',
  storageKey = 'asafarim-theme',
  enableTransitions = true,
  persistMode = true,
  persistDensity = false,
  persistDirection = false,
}) => {
  const getStoredValue = <T extends string>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const stored = localStorage.getItem(`${storageKey}-${key}`);
      return (stored as T) || defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const setStoredValue = (key: string, value: string, persist: boolean) => {
    if (!persist || typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${storageKey}-${key}`, value);
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  };

  const [mode, setModeState] = useState<ThemeMode>(() => 
    persistMode ? getStoredValue('mode', defaultMode) : defaultMode
  );
  const [density, setDensityState] = useState<DensityMode>(() => 
    persistDensity ? getStoredValue('density', defaultDensity) : defaultDensity
  );
  const [direction, setDirectionState] = useState<DirectionMode>(() => 
    persistDirection ? getStoredValue('direction', defaultDirection) : defaultDirection
  );
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(false);

  const resolvedMode: 'light' | 'dark' = 
    mode === 'auto' 
      ? (systemPrefersDark ? 'dark' : 'light')
      : mode;

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    setStoredValue('mode', newMode, persistMode);
  };

  const setDensity = (newDensity: DensityMode) => {
    setDensityState(newDensity);
    setStoredValue('density', newDensity, persistDensity);
  };

  const setDirection = (newDirection: DirectionMode) => {
    setDirectionState(newDirection);
    setStoredValue('direction', newDirection, persistDirection);
  };

  const toggleMode = () => {
    if (mode === 'auto') {
      setMode(systemPrefersDark ? 'light' : 'dark');
    } else {
      setMode(mode === 'light' ? 'dark' : 'light');
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (enableTransitions) {
      root.style.setProperty('transition', 'background-color var(--asm-motion-duration-normal) var(--asm-motion-easing-standard), color var(--asm-motion-duration-normal) var(--asm-motion-easing-standard)');
    }

    root.setAttribute('data-theme', resolvedMode);

    if (density !== 'default') {
      root.setAttribute('data-density', density);
    } else {
      root.removeAttribute('data-density');
    }

    root.setAttribute('dir', direction);

    return () => {
      if (enableTransitions) {
        root.style.removeProperty('transition');
      }
    };
  }, [resolvedMode, density, direction, enableTransitions]);

  const contextValue: ThemeContextValue = {
    mode,
    setMode,
    toggleMode,
    density,
    setDensity,
    direction,
    setDirection,
    isDark: resolvedMode === 'dark',
    isLight: resolvedMode === 'light',
    isAuto: mode === 'auto',
    systemPrefersDark,
    resolvedMode,
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
