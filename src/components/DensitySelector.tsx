import * as React from "react";
import { useTheme } from "../hooks/useTheme";
import type { DensityMode } from "../types";

export interface DensitySelectorProps {
  className?: string;
  style?: React.CSSProperties;
}

export const DensitySelector: React.FC<DensitySelectorProps> = ({
  className = "",
  style = {},
}) => {
  const { density, setDensity } = useTheme();

  const options: Array<{ mode: DensityMode; label: string }> = [
    { mode: "compact", label: "Compact" },
    { mode: "default", label: "Default" },
    { mode: "comfortable", label: "Comfortable" },
  ];

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
    padding: 'var(--asm-space-2) var(--asm-space-3)',
    borderRadius: 'var(--asm-radius-md)',
    border: 'none',
    backgroundColor: isActive ? 'var(--asm-color-button-primary-bg)' : 'transparent',
    color: isActive ? 'var(--asm-color-button-primary-text)' : 'var(--asm-color-text)',
    fontSize: 'var(--asm-font-size-sm)',
    fontWeight: 'var(--asm-font-weight-500)',
    cursor: 'pointer',
    transition: 'var(--asm-transition-fade)',
  });

  return (
    <div style={containerStyles} className={className} role="radiogroup" aria-label="Density selector">
      {options.map((option) => {
        const isActive = density === option.mode;
        return (
          <button
            key={option.mode}
            onClick={() => setDensity(option.mode)}
            style={buttonStyles(isActive)}
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.label} density`}
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
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
