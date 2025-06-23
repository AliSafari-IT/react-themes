import * as React from "react";
import { useTheme } from "../hooks/useTheme";
import { ThemeMode } from "../types";

export interface ThemeSelectorProps {
  className?: string;
  style?: React.CSSProperties;
  showLabels?: boolean;
  options?: Array<{
    mode: ThemeMode;
    label: string;
    icon?: string;
  }>;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className = "",
  style = {},
  showLabels = true,
  options = [
    { mode: "light", label: "Light", icon: "☀️" },
    { mode: "dark", label: "Dark", icon: "🌙" },
    { mode: "auto", label: "Auto", icon: "🌓" },
  ],
}) => {
  const { mode, setMode } = useTheme();

  const selectClass = `
    px-3 py-2 border border-gray-300 rounded-md
    bg-white dark:bg-gray-800 dark:border-gray-600
    text-gray-900 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-all duration-200
    ${className}
  `.trim();

  return (
    <select
      value={mode}
      onChange={(e) => setMode(e.target.value as ThemeMode)}
      className={selectClass}
      style={style}
      aria-label="Select theme mode"
    >
      {options.map((option) => (
        <option key={option.mode} value={option.mode}>
          {showLabels
            ? `${option.icon ? option.icon + " " : ""}${option.label}`
            : option.icon || option.label}
        </option>
      ))}
    </select>
  );
};
