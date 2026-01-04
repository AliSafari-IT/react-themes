import * as React from "react";
import { useTheme } from "../hooks/useTheme";
import type { ThemeMode } from "../types";
import { Sun, Moon, Monitor } from "lucide-react";

export interface ThemeSelectorProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "buttons" | "dropdown";
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className = "",
  style = {},
  variant = "buttons",
}) => {
  const { mode, setMode } = useTheme();

  const options = [
    { mode: "light" as ThemeMode, label: "Light", Icon: Sun },
    { mode: "dark" as ThemeMode, label: "Dark", Icon: Moon },
    { mode: "auto" as ThemeMode, label: "Auto", Icon: Monitor },
  ];

  if (variant === "dropdown") {
    const selectStyles: React.CSSProperties = {
      padding: 'var(--asm-space-control-padding-y) var(--asm-space-control-padding-x)',
      borderRadius: 'var(--asm-radius-md)',
      border: `var(--asm-border-hairline) solid var(--asm-color-input-border)`,
      backgroundColor: 'var(--asm-color-input-bg)',
      color: 'var(--asm-color-input-text)',
      fontSize: 'var(--asm-font-size-sm)',
      fontFamily: 'var(--asm-font-family-primary)',
      cursor: 'pointer',
      transition: 'var(--asm-transition-fade)',
      outline: 'none',
      ...style,
    };

    return (
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as ThemeMode)}
        style={selectStyles}
        className={className}
        aria-label="Select theme mode"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--asm-color-input-border-focus)';
          e.currentTarget.style.boxShadow = `0 0 0 2px var(--asm-color-focus-ring)`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--asm-color-input-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {options.map((option) => (
          <option key={option.mode} value={option.mode}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  const containerStyles: React.CSSProperties = {
    display: 'inline-flex',
    gap: 'var(--asm-space-1)',
    padding: 'var(--asm-space-1)',
    borderRadius: 'var(--asm-radius-lg)',
    backgroundColor: 'var(--asm-color-surface-muted)',
    ...style,
  };

  const buttonStyles = (isActive: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--asm-space-2)',
    padding: 'var(--asm-space-2) var(--asm-space-3)',
    borderRadius: 'var(--asm-radius-md)',
    border: 'none',
    backgroundColor: isActive ? 'var(--asm-color-button-primary-bg)' : 'transparent',
    color: isActive ? 'var(--asm-color-button-primary-text)' : 'var(--asm-color-text)',
    fontSize: 'var(--asm-font-size-sm)',
    fontWeight: 'var(--asm-font-weight-500)',
    cursor: 'pointer',
    transition: 'var(--asm-transition-fade), var(--asm-transition-scale)',
  });

  return (
    <div style={containerStyles} className={className} role="radiogroup" aria-label="Theme mode selector">
      {options.map((option) => {
        const isActive = mode === option.mode;
        const Icon = option.Icon;
        return (
          <button
            key={option.mode}
            onClick={() => setMode(option.mode)}
            style={buttonStyles(isActive)}
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.label} mode`}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'var(--asm-color-button-ghost-bg-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Icon size={16} strokeWidth={1.5} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
