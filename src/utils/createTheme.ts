import { Theme } from '../types';

/**
 * Creates a new theme by merging a base theme with custom properties
 */
export function createTheme(
  baseTheme: Theme,
  customTheme: Partial<Theme>
): Theme {
  return {
    ...baseTheme,
    ...customTheme,
    name: customTheme.name || `${baseTheme.name}-custom`,
    colors: {
      ...baseTheme.colors,
      ...customTheme.colors,
    },
    spacing: {
      ...baseTheme.spacing,
      ...customTheme.spacing,
    },
    radius: {
      ...baseTheme.radius,
      ...customTheme.radius,
    },
    typography: {
      ...baseTheme.typography,
      ...customTheme.typography,
      fontFamily: {
        ...baseTheme.typography.fontFamily,
        ...customTheme.typography?.fontFamily,
      },
      fontSize: {
        ...baseTheme.typography.fontSize,
        ...customTheme.typography?.fontSize,
      },
      fontWeight: {
        ...baseTheme.typography.fontWeight,
        ...customTheme.typography?.fontWeight,
      },
      lineHeight: {
        ...baseTheme.typography.lineHeight,
        ...customTheme.typography?.lineHeight,
      },
    },
    transitions: {
      ...baseTheme.transitions,
      ...customTheme.transitions,
    },
    zIndex: {
      ...baseTheme.zIndex,
      ...customTheme.zIndex,
    },
  };
}

/**
 * Creates a theme variant with modified colors
 */
export function createThemeVariant(
  baseTheme: Theme,
  colorOverrides: Partial<Theme['colors']>,
  name?: string
): Theme {
  return createTheme(baseTheme, {
    name: name || `${baseTheme.name}-variant`,
    colors: {
      ...baseTheme.colors,
      ...colorOverrides,
    },
  });
}
