import { Theme } from '../types';

/**
 * Merges multiple themes into a single theme
 * Later themes in the array take precedence over earlier ones
 */
export function mergeThemes(...themes: Array<Theme | Partial<Theme>>): Theme {
  if (themes.length === 0) {
    throw new Error('At least one theme must be provided to mergeThemes');
  }

  const [baseTheme, ...additionalThemes] = themes;
  
  if (!isFullTheme(baseTheme)) {
    throw new Error('First theme must be a complete theme object');
  }
  return additionalThemes.reduce((merged: Theme, theme): Theme => {
    return {
      ...merged,
      ...theme,
      name: theme.name || merged.name,
      mode: theme.mode || merged.mode,
      colors: {
        ...merged.colors,
        ...theme.colors,
      },
      spacing: {
        ...merged.spacing,
        ...theme.spacing,
      },
      radius: {
        ...merged.radius,
        ...theme.radius,
      },
      typography: {
        ...merged.typography,
        ...theme.typography,
        fontFamily: {
          ...merged.typography.fontFamily,
          ...theme.typography?.fontFamily,
        },
        fontSize: {
          ...merged.typography.fontSize,
          ...theme.typography?.fontSize,
        },
        fontWeight: {
          ...merged.typography.fontWeight,
          ...theme.typography?.fontWeight,
        },
        lineHeight: {
          ...merged.typography.lineHeight,
          ...theme.typography?.lineHeight,
        },
      },
      transitions: {
        ...merged.transitions,
        ...theme.transitions,
      },
      zIndex: {
        ...merged.zIndex,
        ...theme.zIndex,
      },
    };
  }, baseTheme);
}

/**
 * Type guard to check if an object is a complete theme
 */
function isFullTheme(theme: Theme | Partial<Theme>): theme is Theme {
  return !!(
    theme &&
    typeof theme === 'object' &&
    'name' in theme &&
    'mode' in theme &&
    'colors' in theme &&
    'spacing' in theme &&
    'radius' in theme &&
    'typography' in theme &&
    'transitions' in theme &&
    'zIndex' in theme
  );
}

/**
 * Merges theme colors only
 */
export function mergeThemeColors(
  baseColors: Theme['colors'],
  ...colorSets: Array<Partial<Theme['colors']>>
): Theme['colors'] {
  return colorSets.reduce((merged: Theme['colors'], colors): Theme['colors'] => ({
    ...merged,
    ...colors,
  }), baseColors);
}

/**
 * Deep merge utility for complex theme objects
 */
export function deepMergeThemes(target: Theme, ...sources: Array<Partial<Theme>>): Theme {
  return sources.reduce((merged: Theme, source): Theme => {
    const result = { ...merged };
    
    for (const key in source) {
      const sourceValue = source[key as keyof Theme];
      const targetValue = merged[key as keyof Theme];
      
      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue) && targetValue && typeof targetValue === 'object') {
        result[key as keyof Theme] = {
          ...targetValue,
          ...sourceValue,
        } as any;
      } else if (sourceValue !== undefined) {
        result[key as keyof Theme] = sourceValue as any;
      }
    }
    
    return result;
  }, target);
}
