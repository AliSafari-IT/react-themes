import * as React from "react";
import { useTheme } from "../hooks/useTheme";
import type { CSSProperties, ReactNode } from 'react';
import { Moon, Sun, type LucideIcon } from "lucide-react";

type ThemeToggleVariant =
  | "default"
  | "outline"
  | "ghost"
  | "link"
  | "circle"
  | "icon";

export interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
  /**
   * Custom light icon (default: ☀️)
   */
  lightIcon?: ReactNode | LucideIcon | string;

  /**
   * Custom dark icon (default: 🌙)
   */
  darkIcon?: ReactNode | LucideIcon | string;

  /**
   * Button aria-label
   */
  ariaLabel?: string;

  /**
   * Button variant
   */
  variant?: ThemeToggleVariant;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  style = {},
  showLabels = false,
  size = "md",
  lightIcon = <Sun /> as ReactNode | LucideIcon | string,
  darkIcon = <Moon /> as ReactNode | LucideIcon | string,
  ariaLabel = "Toggle theme",
  variant = "default",
}) => {
  const { mode, toggleMode } = useTheme();

    const fontSizeMap: Record<NonNullable<ThemeToggleProps['size']>, string> = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
  };

  const circleSizeMap: Record<NonNullable<ThemeToggleProps['size']>, string> = {
    sm: '2rem',
    md: '2.5rem',
    lg: '3rem',
  };

  const buttonClass = `
    inline-flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-all duration-200
    ${className}
  `.trim();


    const renderIcon = (icon: ReactNode | LucideIcon | string) => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === 'function') {
      const IconComp = icon as LucideIcon;
      return <IconComp aria-hidden="true" />;
    }
    return icon as React.ReactNode;
  };

  const getIcon = () => {
    switch (mode) {
      case "light":
        return renderIcon(lightIcon);
      case "dark":
        return renderIcon(darkIcon);
      case "auto":
      default:
        return "🌓";
    }
  };


  const getLabel = () => {
    switch (mode) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "auto":
      default:
        return "Auto";
    }
  };

  
    const baseStyles: CSSProperties = {
    borderRadius: 'var(--theme-radius-md, 0.375rem)',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSizeMap[size],
    transition: 'all 0.2s ease-in-out',
    color: 'var(--color-text, #0f172a)',
  };


  const variantStyles: Record<ThemeToggleVariant, CSSProperties> = {
    default: {
      background: 'var(--color-surface, white)',
      border: '1px solid var(--color-border, #e5e7eb)',
      color: 'var(--color-text, #0f172a)',
      textAlign: 'center',
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--color-border, #e5e7eb)',
      color: 'var(--color-text, #0f172a)',
      textAlign: 'center',
      outline: 'none',
      
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      color: 'var(--color-text, #0f172a)',
      textAlign: 'center',
    },
    link: {
      background: 'transparent',
      border: 'none',
      padding: 0,
      fontSize: '1rem',
      color: 'var(--color-primary, #2563eb)',
      textAlign: 'center',

    },
        circle: {
      background: 'var(--color-surface, white)',
      border: '1px solid var(--color-border, #e5e7eb)',
      borderRadius: '9999px',
      textAlign: 'center',
    },

    icon: {
      background: 'transparent',
      border: 'none',
      padding: 0,
      fontSize: '1.5rem',
      textAlign: 'center',
    },
  };

    const mergedStyles = {
    ...baseStyles,
    ...(variantStyles[variant] ?? variantStyles.default),
    ...style,
  };

  const finalStyles: CSSProperties = {
    ...mergedStyles,
    ...(variant === "circle" ? { width: circleSizeMap[size], height: circleSizeMap[size] } : {}),
  };
  
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      style={finalStyles}
      onClick={toggleMode}
      className={buttonClass}
      title={ariaLabel}
    >

      <span role="img" aria-hidden="true">
        {getIcon()}
      </span>
      {showLabels && (
        <span className="ml-2 text-sm font-medium">{getLabel()}</span>
      )}
    </button>
  );
};
