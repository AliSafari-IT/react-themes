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
  lightIcon?: ReactNode | LucideIcon | string;
  darkIcon?: ReactNode | LucideIcon | string;
  ariaLabel?: string;
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
  const { resolvedMode, toggleMode } = useTheme();

  const iconSizeMap: Record<NonNullable<ThemeToggleProps['size']>, string> = {
    sm: 'var(--asm-icon-size-sm)',
    md: 'var(--asm-icon-size-md)',
    lg: 'var(--asm-icon-size-lg)',
  };

  const circleSizeMap: Record<NonNullable<ThemeToggleProps['size']>, string> = {
    sm: '32px',
    md: '40px',
    lg: '48px',
  };

  const renderIcon = (icon: ReactNode | LucideIcon | string) => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === 'function') {
      const IconComp = icon as LucideIcon;
      return <IconComp size={iconSizeMap[size]} strokeWidth={1.5} aria-hidden="true" />;
    }
    return icon as React.ReactNode;
  };

  const getIcon = () => {
    return resolvedMode === "dark" ? renderIcon(darkIcon) : renderIcon(lightIcon);
  };

  const getLabel = () => {
    return resolvedMode === "dark" ? "Dark" : "Light";
  };

  const baseStyles: CSSProperties = {
    borderRadius: 'var(--asm-radius-md)',
    padding: 'var(--asm-space-2)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--asm-space-2)',
    fontSize: 'var(--asm-font-size-md)',
    transition: 'var(--asm-transition-fade), var(--asm-transition-scale)',
    border: 'none',
  };

  const variantStyles: Record<ThemeToggleVariant, CSSProperties> = {
    default: {
      background: 'var(--asm-color-button-secondary-bg)',
      border: `var(--asm-border-hairline) solid var(--asm-color-border)`,
      color: 'var(--asm-color-button-secondary-text)',
    },
    outline: {
      background: 'transparent',
      border: `var(--asm-border-hairline) solid var(--asm-color-border)`,
      color: 'var(--asm-color-text)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--asm-color-text)',
    },
    link: {
      background: 'transparent',
      padding: 0,
      color: 'var(--asm-color-button-primary-bg)',
    },
    circle: {
      background: 'var(--asm-color-button-secondary-bg)',
      border: `var(--asm-border-hairline) solid var(--asm-color-border)`,
      borderRadius: 'var(--asm-radius-full)',
    },
    icon: {
      background: 'transparent',
      padding: 0,
    },
  };

  const mergedStyles: CSSProperties = {
    ...baseStyles,
    ...(variantStyles[variant] ?? variantStyles.default),
    ...(variant === "circle" ? { width: circleSizeMap[size], height: circleSizeMap[size] } : {}),
    ...style,
  };
  
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      style={mergedStyles}
      onClick={toggleMode}
      className={className}
      title={ariaLabel}
      onMouseEnter={(e) => {
        if (variant === 'ghost' || variant === 'icon') {
          e.currentTarget.style.background = 'var(--asm-color-button-ghost-bg-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'ghost' || variant === 'icon') {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {getIcon()}
      {showLabels && (
        <span style={{ fontSize: 'var(--asm-font-size-sm)', fontWeight: 'var(--asm-font-weight-500)' }}>
          {getLabel()}
        </span>
      )}
    </button>
  );
};
