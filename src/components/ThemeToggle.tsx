import * as React from 'react';
import { useTheme } from '../hooks/useTheme';

export interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  style = {},
  showLabels = false,
  size = 'md',
}) => {
  const { mode, toggleMode } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
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
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'auto':
      default:
        return '🌓';
    }
  };

  const getLabel = () => {
    switch (mode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'auto':
      default:
        return 'Auto';
    }
  };

  return (
    <button
      onClick={toggleMode}
      className={buttonClass}
      style={style}
      title={`Current theme: ${getLabel()}. Click to toggle.`}
      aria-label={`Switch theme. Current: ${getLabel()}`}
    >
      <span role="img" aria-hidden="true">
        {getIcon()}
      </span>
      {showLabels && (
        <span className="ml-2 text-sm font-medium">
          {getLabel()}
        </span>
      )}
    </button>
  );
};
