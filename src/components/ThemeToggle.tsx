import * as React from "react";
import { useTheme } from "../hooks/useTheme";
import type { CSSProperties, ReactNode } from 'react';

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
  lightIcon?: ReactNode;

  /**
   * Custom dark icon (default: 🌙)
   */
  darkIcon?: ReactNode;

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
  lightIcon = "☀️",
  darkIcon = "🌙",
  ariaLabel = "Toggle theme",
  variant = "default",
}) => {
  const { mode, toggleMode } = useTheme();

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const buttonClass = `
    ${sizeClasses[size]}
    inline-flex items-center justify-center
    rounded-md border border-gray-300
    bg-white hover:bg-gray-50
    dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-all duration-200
    ${className}
  `.trim();

  const getIcon = () => {
    switch (mode) {
      case "light":
        return lightIcon;
      case "dark":
        return darkIcon;
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
    fontSize: '1.25rem',
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
      width: '2.5rem',
      height: '2.5rem',
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
  
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      style={mergedStyles}
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
