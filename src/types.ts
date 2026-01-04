export type ThemeMode = 'light' | 'dark' | 'auto';

export type DensityMode = 'compact' | 'comfortable' | 'default';

export type DirectionMode = 'ltr' | 'rtl';

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  density: DensityMode;
  setDensity: (density: DensityMode) => void;
  direction: DirectionMode;
  setDirection: (direction: DirectionMode) => void;
  isDark: boolean;
  isLight: boolean;
  isAuto: boolean;
  systemPrefersDark: boolean;
  resolvedMode: 'light' | 'dark';
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultDensity?: DensityMode;
  defaultDirection?: DirectionMode;
  storageKey?: string;
  enableTransitions?: boolean;
  persistMode?: boolean;
  persistDensity?: boolean;
  persistDirection?: boolean;
}

export interface UseThemeOptions {
  defaultMode?: ThemeMode;
  storageKey?: string;
}

export interface ThemeConfig {
  defaultMode?: ThemeMode;
  defaultDensity?: DensityMode;
  defaultDirection?: DirectionMode;
  persistMode?: boolean;
  persistDensity?: boolean;
  persistDirection?: boolean;
  storageKey?: string;
  enableTransitions?: boolean;
}

export interface Theme {
  name: string;
  mode: ThemeMode;
  colors: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  typography: {
    fontFamily: Record<string, string>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, string | number>;
    lineHeight: Record<string, string | number>;
  };
  transitions: Record<string, string>;
  zIndex: Record<string, number>;
}
