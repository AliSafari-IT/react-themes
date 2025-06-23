// Theme types
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Border colors
  border: string;
  borderLight: string;
  borderHover: string;
  
  // Accent colors
  primary: string;
  primaryHover: string;
  primaryActive: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Interactive states
  hover: string;
  active: string;
  focus: string;
  
  // Shadows
  shadow: string;
  shadowMd: string;
  shadowLg: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface ThemeRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
  bounce: string;
}

export interface Theme {
  name: string;
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  typography: ThemeTypography;
  transitions: ThemeTransitions;
  zIndex: {
    dropdown: number;
    modal: number;
    tooltip: number;
    overlay: number;
  };
}

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
  isLight: boolean;
  isAuto: boolean;
  systemPrefersDark: boolean;
  applyTheme: (customTheme: Partial<Theme>) => void;
  resetTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  customTheme?: Partial<Theme>;
  storageKey?: string;
  enableTransitions?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface UseThemeOptions {
  defaultMode?: ThemeMode;
  storageKey?: string;
}

export interface ThemeConfig {
  defaultMode?: ThemeMode;
  defaultTheme?: string;
  persistMode?: boolean;
  storageKey?: string;
  enableTransitions?: boolean;
  customThemes?: Record<string, Theme>;
}

// CSS Variable names for theme integration
export interface ThemeVariables {
  colors: Record<keyof ThemeColors, string>;
  spacing: Record<keyof ThemeSpacing, string>;
  radius: Record<keyof ThemeRadius, string>;
  typography: {
    fontFamily: Record<keyof ThemeTypography['fontFamily'], string>;
    fontSize: Record<keyof ThemeTypography['fontSize'], string>;
    fontWeight: Record<keyof ThemeTypography['fontWeight'], string>;
    lineHeight: Record<keyof ThemeTypography['lineHeight'], string>;
  };
  transitions: Record<keyof ThemeTransitions, string>;
  zIndex: Record<keyof Theme['zIndex'], string>;
}
