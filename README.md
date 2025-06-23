# @asafarim/react-themes

A comprehensive theme management system for React applications with automatic dark/light mode detection, custom theme creation, and smooth transitions.

![npm version](https://img.shields.io/npm/v/@asafarim/react-themes)
![license](https://img.shields.io/npm/l/@asafarim/react-themes)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)

## ✨ Features

- 🌓 **Auto Dark/Light Mode**: Automatic system preference detection
- 🎨 **Custom Themes**: Create and apply custom themes easily
- ⚡ **TypeScript Ready**: Full TypeScript support with type definitions
- 🔄 **Smooth Transitions**: Beautiful transitions between theme changes
- 💾 **Persistence**: Automatically save user preferences to localStorage
- 🎯 **CSS Variables**: Automatic CSS variable injection for styling
- 🔧 **Flexible API**: Easy to integrate with existing projects
- ♿ **Accessible**: Built with accessibility in mind

## 📦 Installation

```bash
npm install @asafarim/react-themes
# or
yarn add @asafarim/react-themes
# or
pnpm add @asafarim/react-themes
```

## 🚀 Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
import React from 'react';
import { ThemeProvider } from '@asafarim/react-themes';
import '@asafarim/react-themes/styles.css'; // Optional base styles

function App() {
  return (
    <ThemeProvider defaultMode="auto" persistMode={true}>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### 2. Use the theme in your components

```tsx
import React from 'react';
import { useTheme, ThemeToggle } from '@asafarim/react-themes';

function MyComponent() {
  const { mode, currentTheme, toggleMode } = useTheme();

  return (
    <div>
      <h1>Current mode: {mode}</h1>
      <ThemeToggle />
      {/* Your component content */}
    </div>
  );
}
```

## 📖 API Reference

### ThemeProvider

The main provider component that manages theme state and applies CSS variables.

```tsx
interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: 'light' | 'dark' | 'auto';
  defaultTheme?: string;
  persistMode?: boolean;
  storageKey?: string;
  customThemes?: Record<string, Theme>;
}
```

**Props:**
- `defaultMode`: Initial theme mode (default: 'auto')
- `defaultTheme`: Default theme name (default: 'default')
- `persistMode`: Save theme preference to localStorage (default: true)
- `storageKey`: localStorage key for persistence (default: 'asafarim-theme-mode')
- `customThemes`: Additional custom themes

### useTheme Hook

Access theme state and controls.

```tsx
const {
  currentTheme,    // Current active theme object
  mode,           // Current mode: 'light' | 'dark' | 'auto'
  setMode,        // Function to change mode
  setTheme,       // Function to change theme
  themes,         // Available themes
  toggleMode      // Function to cycle through modes
} = useTheme();
```

### useThemeToggle Hook

Simplified hook for theme toggling functionality.

```tsx
const {
  mode,          // Current mode
  setMode,       // Set specific mode
  toggleMode,    // Toggle between modes
  isDark,        // Boolean: is dark mode
  isLight,       // Boolean: is light mode
  isAuto         // Boolean: is auto mode
} = useThemeToggle();
```

### Components

#### ThemeToggle

A pre-built theme toggle button.

```tsx
<ThemeToggle 
  size="md"           // 'sm' | 'md' | 'lg'
  showLabels={false}  // Show text labels
  className="custom-class"
  style={{ margin: '10px' }}
/>
```

#### ThemeSelector

A dropdown selector for theme modes.

```tsx
<ThemeSelector 
  showLabels={true}
  className="custom-class"
  options={[
    { mode: 'light', label: 'Light', icon: '☀️' },
    { mode: 'dark', label: 'Dark', icon: '🌙' },
    { mode: 'auto', label: 'Auto', icon: '🌓' }
  ]}
/>
```

## 🎨 Custom Themes

### Creating Custom Themes

```tsx
import { createTheme, lightTheme } from '@asafarim/react-themes';

const myCustomTheme = createTheme(lightTheme, {
  name: 'my-theme',
  colors: {
    primary: '#ff6b6b',
    primaryHover: '#ff5252',
    background: '#f8f9fa',
    text: '#212529'
  }
});

// Use with provider
<ThemeProvider customThemes={{ 'my-theme': myCustomTheme }}>
  <App />
</ThemeProvider>
```

### Using CSS Variables

The package automatically injects CSS variables that you can use in your styles:

```css
.my-component {
  background-color: var(--theme-color-background);
  color: var(--theme-color-text);
  border: 1px solid var(--theme-color-border);
  border-radius: var(--theme-radius-md);
  padding: var(--theme-spacing-md);
  transition: all var(--theme-transition-normal);
}

.my-button {
  background-color: var(--theme-color-primary);
  color: white;
  font-size: var(--theme-font-size-sm);
}

.my-button:hover {
  background-color: var(--theme-color-primary-hover);
}
```

## 🎯 Integration with @asafarim/dd-menu

This package works seamlessly with `@asafarim/dd-menu`:

```tsx
import { DDMenu } from '@asafarim/dd-menu';
import { useTheme } from '@asafarim/react-themes';

function NavMenu() {
  const { mode } = useTheme();
  
  return (
    <DDMenu 
      items={menuItems}
      theme={mode}  // Pass current theme mode
      variant="navbar"
    />
  );
}
```

## 🔧 Advanced Usage

### Custom Theme Structure

```tsx
interface Theme {
  name: string;
  mode: 'light' | 'dark' | 'auto';
  colors: {
    background: string;
    backgroundSecondary: string;
    text: string;
    textSecondary: string;
    primary: string;
    primaryHover: string;
    border: string;
    // ... more colors
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    // ... more spacing
  };
  // ... typography, radius, transitions, zIndex
}
```

### Programmatic Theme Application

```tsx
import { applyTheme } from '@asafarim/react-themes';

// Apply theme manually
applyTheme(customTheme, 'dark');
```

## 🌍 Browser Support

- Modern browsers with CSS custom properties support
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 16+

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit a pull request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Packages

- [`@asafarim/dd-menu`](https://www.npmjs.com/package/@asafarim/dd-menu) - Elegant dropdown menu component

## 📝 Changelog

### 1.0.0
- Initial release
- Theme provider with auto mode detection
- CSS variable injection
- Built-in components (ThemeToggle, ThemeSelector)
- TypeScript support
- localStorage persistence

---

Made with ❤️ by [ASafariM](https://github.com/AliSafari-IT)