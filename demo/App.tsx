import * as React from 'react';
import { 
  ThemeProvider, 
  useTheme, 
  useThemeToggle,
  ThemeToggle, 
  ThemeSelector,
  createTheme,
  lightTheme,
  darkTheme
} from '../src'; // Adjust the import path as necessary

// Create a custom theme
const customTheme = createTheme(lightTheme, {
  name: 'custom',
  colors: {
    ...lightTheme.colors,
    primary: '#ff6b6b',
    primaryHover: '#ff5252',
    background: '#fdf2f8',
  }
});

// Demo component that uses the theme
const ThemeDemo: React.FC = () => {
  const { currentTheme, mode, themes } = useTheme();
  const { isDark, isLight, isAuto } = useThemeToggle();

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: 'var(--theme-color-background, #fff)',
      color: 'var(--theme-color-text, #000)',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <h1>@asafarim/react-themes Demo</h1>      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Current Theme Info</h2>
        <p>Mode: {mode}</p>
        <p>Theme: {currentTheme.name}</p>
        <p>Is Dark: {isDark ? 'Yes' : 'No'}</p>
        <p>Is Light: {isLight ? 'Yes' : 'No'}</p>
        <p>Is Auto: {isAuto ? 'Yes' : 'No'}</p>
      </div>      <div style={{ marginBottom: '2rem' }}>
        <h2>Theme Controls</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemeToggle />
          <ThemeToggle showLabels={true} />
          <ThemeSelector />
          <button 
            onClick={() => console.log('Current theme:', currentTheme)}
            style={{
              backgroundColor: 'var(--theme-color-primary, #007bff)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--theme-radius-sm, 4px)',
              cursor: 'pointer'
            }}
          >
            Log Current Theme
          </button>
        </div>
      </div>      <div style={{ marginBottom: '2rem' }}>
        <h2>Available Themes</h2>
        <ul>
          {Object.keys(themes).map(themeName => (
            <li key={themeName}>
              <strong>{themeName}</strong>
              {themes[themeName] === currentTheme && ' (current)'}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Theme Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--theme-color-background-secondary)',
            border: '1px solid var(--theme-color-border)',
            borderRadius: 'var(--theme-radius-md)',
          }}>
            <h4>🎨 Multiple Themes</h4>
            <p>Light, dark, and custom themes</p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--theme-color-background-secondary)',
            border: '1px solid var(--theme-color-border)',
            borderRadius: 'var(--theme-radius-md)',
          }}>
            <h4>🔄 Auto Detection</h4>
            <p>Follows system preferences</p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--theme-color-background-secondary)',
            border: '1px solid var(--theme-color-border)',
            borderRadius: 'var(--theme-radius-md)',
          }}>
            <h4>💾 Persistence</h4>
            <p>Remembers your choice</p>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--theme-color-background-secondary)',
            border: '1px solid var(--theme-color-border)',
            borderRadius: 'var(--theme-radius-md)',
          }}>
            <h4>⚛️ React Hooks</h4>
            <p>Easy theme management</p>
          </div>
        </div>
      </div><div style={{
        padding: '1rem',
        backgroundColor: 'var(--theme-color-background-secondary, #f8f9fa)',
        border: '1px solid var(--theme-color-border, #dee2e6)',
        borderRadius: 'var(--theme-radius-md, 8px)',
        marginBottom: '2rem'
      }}>
        <h3>CSS Variables Demo</h3>
        <p>This box uses CSS variables from the current theme.</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button style={{
            backgroundColor: 'var(--theme-color-primary, #007bff)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--theme-radius-sm, 4px)',
            cursor: 'pointer'
          }}>
            Primary Button
          </button>
          <button style={{
            backgroundColor: 'var(--theme-color-success, #28a745)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--theme-radius-sm, 4px)',
            cursor: 'pointer'
          }}>
            Success Button
          </button>
          <button style={{
            backgroundColor: 'var(--theme-color-warning, #ffc107)',
            color: 'var(--theme-color-text, #000)',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--theme-radius-sm, 4px)',
            cursor: 'pointer'
          }}>
            Warning Button
          </button>
          <button style={{
            backgroundColor: 'var(--theme-color-error, #dc3545)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--theme-radius-sm, 4px)',
            cursor: 'pointer'
          }}>
            Error Button
          </button>
        </div>
      </div>
    </div>
  );
};

// Main demo app
const App: React.FC = () => {
  return (
    <ThemeProvider
      defaultMode="auto"
      customThemes={{ custom: customTheme }}
      persistMode={true}
    >
      <ThemeDemo />
    </ThemeProvider>
  );
};

export default App;
