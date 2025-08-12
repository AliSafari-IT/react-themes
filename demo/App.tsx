import * as React from "react";
import { useState } from "react";
import {
  ThemeProvider,
  useTheme,
  useThemeToggle,
  ThemeToggle,
  ThemeSelector,
  createTheme,
  lightTheme,
  darkTheme,
  mergeThemes,
  applyTheme,
  Theme,
} from "../src"; // Adjust the import path as necessary
import {
  ButtonComponent,
  HeaderComponent,
  PackageLinks,
} from "@asafarim/shared";

// Simple GitHub icon component
const GithubIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    style={{ marginRight: "4px" }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

// Code block component for displaying code examples
const CodeBlock: React.FC<{ code: string; language?: string }> = ({
  code,
  language = "tsx",
}) => {
  return (
    <pre
      style={{
        backgroundColor: "var(--theme-color-background-secondary)",
        padding: "1rem",
        borderRadius: "var(--theme-radius-md)",
        overflowX: "auto",
        border: "1px solid var(--theme-color-border)",
        fontSize: "0.9rem",
        lineHeight: 1.5,
      }}
    >
      <code>{code}</code>
    </pre>
  );
};

// Tab component for organizing content
const TabComponent: React.FC<{
  tabs: { id: string; label: string; content: React.ReactNode }[];
}> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          borderBottom: "1px solid var(--theme-color-border)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor:
                activeTab === tab.id
                  ? "var(--theme-color-primary)"
                  : "transparent",
              color: activeTab === tab.id ? "white" : "var(--theme-color-text)",
              border: "none",
              borderRadius: "var(--theme-radius-sm) var(--theme-radius-sm) 0 0",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
};

// Create custom themes
const customPinkTheme = createTheme(lightTheme, {
  name: "pink",
  colors: {
    ...lightTheme.colors,
    primary: "#ff6b6b",
    primaryHover: "#ff5252",
    background: "#fdf2f8",
    backgroundSecondary: "#fce7f3",
    border: "#fbcfe8",
  },
});

const customBlueTheme = createTheme(darkTheme, {
  name: "blue",
  colors: {
    ...darkTheme.colors,
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    background: "#1e3a8a",
    backgroundSecondary: "#1e40af",
    text: "#f1f5f9",
  },
});

const customGreenTheme = createTheme(lightTheme, {
  name: "green",
  colors: {
    ...lightTheme.colors,
    primary: "#10b981",
    primaryHover: "#059669",
    background: "#ecfdf5",
    backgroundSecondary: "#d1fae5",
    border: "#a7f3d0",
  },
});

// Example code snippets for the tutorial
const codeExamples = {
  basicSetup: `import React from 'react';
import { ThemeProvider } from '@asafarim/react-themes';
import '@asafarim/react-themes/styles.css'; // Import styles in your main entry file

function App() {
  return (
    <ThemeProvider defaultMode="auto" persistMode={true}>
      <YourAppContent />
    </ThemeProvider>
  );
}`,

  usingThemeHook: `import React from 'react';
import { useTheme } from '@asafarim/react-themes';

function MyComponent() {
  const { mode, currentTheme, toggleMode } = useTheme();
  
  return (
    <div>
      <h1>Current mode: {mode}</h1>
      <button onClick={toggleMode}>Toggle Theme</button>
      {/* Your component content */}
    </div>
  );
}`,

  customThemeCreation: `import { createTheme, lightTheme } from '@asafarim/react-themes';

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
</ThemeProvider>`,

  cssVariables: `.my-component {
  background-color: var(--theme-color-background);
  color: var(--theme-color-text);
  border: 1px solid var(--theme-color-border);
  border-radius: var(--theme-radius-md);
  padding: var(--theme-spacing-md);
  transition: all var(--theme-transition-normal);
}`,

  dynamicThemeLoading: `import { createTheme, useTheme } from '@asafarim/react-themes';

function DynamicThemeLoader() {
  const { setTheme } = useTheme();
  
  const loadUserTheme = async (userId) => {
    const userPrefs = await fetch(\`/api/users/\${userId}/theme\`);
    const themeData = await userPrefs.json();
    
    const customTheme = createTheme(themeData);
    setTheme(customTheme);
  };
  
  return <div>Loading personalized theme...</div>;
}`,

  multiBrandThemes: `// Switch between different brand themes
const brandThemes = {
  corporate: createTheme(lightTheme, {
    name: 'corporate',
    colors: { primary: '#0066cc', secondary: '#004499' }
  }),
  creative: createTheme(darkTheme, {
    name: 'creative', 
    colors: { primary: '#ff6b6b', secondary: '#4ecdc4' }
  })
};

<ThemeProvider customThemes={brandThemes}>
  <BrandSwitcher />
</ThemeProvider>`,
};

// Use case components
const BasicUsageExample: React.FC = () => {
  return (
    <div>
      <h3>Basic Usage</h3>
      <p>
        Start by wrapping your application with the <code>ThemeProvider</code>{" "}
        component and use the <code>useTheme</code> hook to access theme
        information.
      </p>
      <CodeBlock code={codeExamples.basicSetup} />
      <div style={{ marginTop: "1rem" }}>
        <h4>Key Features:</h4>
        <ul>
          <li>
            Automatic system theme detection with{" "}
            <code>defaultMode="auto"</code>
          </li>
          <li>
            Theme persistence across sessions with{" "}
            <code>persistMode={true}</code>
          </li>
          <li>Built-in light and dark themes</li>
        </ul>
      </div>
    </div>
  );
};

const CustomThemesExample: React.FC = () => {
  const { setTheme, themes } = useTheme();

  return (
    <div>
      <h3>Custom Themes</h3>
      <p>
        Create your own themes by extending the built-in light or dark themes.
        This allows for complete customization of colors, spacing, and more.
      </p>
      <CodeBlock code={codeExamples.customThemeCreation} />

      <div style={{ marginTop: "1.5rem" }}>
        <h4>Try Custom Themes:</h4>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginTop: "0.5rem",
          }}
        >
          {Object.keys(themes).map((themeName) => (
            <button
              key={themeName}
              onClick={() => setTheme(themes[themeName])}
              style={{
                backgroundColor:
                  themeName === "light" ||
                  themeName === "pink" ||
                  themeName === "green"
                    ? themes[themeName].colors.primary
                    : themes[themeName].colors.primary,
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "var(--theme-radius-sm)",
                cursor: "pointer",
              }}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CSSVariablesExample: React.FC = () => {
  return (
    <div>
      <h3>CSS Variables</h3>
      <p>
        The package automatically injects CSS variables that you can use in your
        styles. This makes it easy to apply theme colors and properties
        throughout your application.
      </p>
      <CodeBlock code={codeExamples.cssVariables} language="css" />

      <div style={{ marginTop: "1.5rem" }}>
        <h4>Available CSS Variables:</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--theme-color-background-secondary)",
              border: "1px solid var(--theme-color-border)",
              borderRadius: "var(--theme-radius-md)",
            }}
          >
            <h5>Colors</h5>
            <ul style={{ paddingLeft: "1.2rem" }}>
              <li>
                <code>--theme-color-background</code>
              </li>
              <li>
                <code>--theme-color-text</code>
              </li>
              <li>
                <code>--theme-color-primary</code>
              </li>
              <li>
                <code>--theme-color-border</code>
              </li>
            </ul>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--theme-color-background-secondary)",
              border: "1px solid var(--theme-color-border)",
              borderRadius: "var(--theme-radius-md)",
            }}
          >
            <h5>Spacing</h5>
            <ul style={{ paddingLeft: "1.2rem" }}>
              <li>
                <code>--theme-spacing-xs</code>
              </li>
              <li>
                <code>--theme-spacing-sm</code>
              </li>
              <li>
                <code>--theme-spacing-md</code>
              </li>
              <li>
                <code>--theme-spacing-lg</code>
              </li>
            </ul>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--theme-color-background-secondary)",
              border: "1px solid var(--theme-color-border)",
              borderRadius: "var(--theme-radius-md)",
            }}
          >
            <h5>Other</h5>
            <ul style={{ paddingLeft: "1.2rem" }}>
              <li>
                <code>--theme-radius-sm</code>
              </li>
              <li>
                <code>--theme-radius-md</code>
              </li>
              <li>
                <code>--theme-transition-normal</code>
              </li>
              <li>
                <code>--theme-font-size-sm</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedUsageExample: React.FC = () => {
  return (
    <div>
      <h3>Advanced Usage Patterns</h3>

      <div style={{ marginBottom: "2rem" }}>
        <h4>Dynamic Theme Loading</h4>
        <p>
          Load themes dynamically based on user preferences or API responses:
        </p>
        <CodeBlock code={codeExamples.dynamicThemeLoading} />
      </div>

      <div>
        <h4>Multi-Brand Applications</h4>
        <p>
          Switch between different brand themes for multi-tenant applications:
        </p>
        <CodeBlock code={codeExamples.multiBrandThemes} />
      </div>
    </div>
  );
};

const ComponentsExample: React.FC = () => {
  return (
    <div>
      <h3>Built-in Components</h3>
      <p>The package includes ready-to-use components for theme switching:</p>

      <div style={{ marginTop: "1.5rem" }}>
        <h4>ThemeToggle Component</h4>
        <p>A button that cycles through light, dark, and auto modes:</p>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "var(--theme-color-background-secondary)",
            border: "1px solid var(--theme-color-border)",
            borderRadius: "var(--theme-radius-md)",
            marginBottom: "1rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <strong>Default:</strong> <ThemeToggle />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <strong>With Labels:</strong> <ThemeToggle showLabels={true} />
          </div>
          <div>
            <strong>Custom Size:</strong> <ThemeToggle size="lg" />
          </div>
        </div>

        <h4>ThemeSelector Component</h4>
        <p>A dropdown selector for theme modes:</p>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "var(--theme-color-background-secondary)",
            border: "1px solid var(--theme-color-border)",
            borderRadius: "var(--theme-radius-md)",
          }}
        >
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

const RealWorldExample: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div>
      <h3>Real-World Example</h3>
      <p>
        Here's a practical example of a themed card component that adapts to the
        current theme:
      </p>

      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--theme-color-background-secondary)",
            border: "1px solid var(--theme-color-border)",
            borderRadius: "var(--theme-radius-md)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "var(--theme-transition-normal)",
          }}
        >
          <h4 style={{ marginTop: 0 }}>Product Card</h4>
          <div
            style={{
              width: "100%",
              height: "120px",
              backgroundColor: currentTheme.colors.primary,
              borderRadius: "var(--theme-radius-sm)",
              marginBottom: "1rem",
            }}
          />
          <h5>Premium Headphones</h5>
          <p style={{ color: "var(--theme-color-text-secondary)" }}>
            High-quality wireless headphones with noise cancellation.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>$299.99</span>
            <button
              style={{
                backgroundColor: "var(--theme-color-primary)",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "var(--theme-radius-sm)",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--theme-color-background-secondary)",
            border: "1px solid var(--theme-color-border)",
            borderRadius: "var(--theme-radius-md)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "var(--theme-transition-normal)",
          }}
        >
          <h4 style={{ marginTop: 0 }}>User Profile</h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: currentTheme.colors.primary,
                marginRight: "1rem",
              }}
            />
            <div>
              <h5 style={{ margin: 0 }}>Jane Smith</h5>
              <p
                style={{
                  margin: 0,
                  color: "var(--theme-color-text-secondary)",
                }}
              >
                Product Designer
              </p>
            </div>
          </div>
          <p>
            Experienced designer with a passion for creating intuitive user
            interfaces.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <button
              style={{
                backgroundColor: "transparent",
                color: "var(--theme-color-primary)",
                border: "1px solid var(--theme-color-primary)",
                padding: "0.5rem 1rem",
                borderRadius: "var(--theme-radius-sm)",
                cursor: "pointer",
              }}
            >
              Message
            </button>
            <button
              style={{
                backgroundColor: "var(--theme-color-primary)",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "var(--theme-radius-sm)",
                cursor: "pointer",
              }}
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main tutorial component
const ThemeTutorial: React.FC = () => {
  const { currentTheme, mode } = useTheme();
  const { isDark, isLight, isAuto } = useThemeToggle();

  const gotoNpm = () => {
    window.open(
      "https://www.npmjs.com/package/@asafarim/react-themes",
      "_blank"
    );
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "var(--theme-color-background, #fff)",
        color: "var(--theme-color-text, #000)",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <HeaderComponent
        type="default"
        title="@asafarim/react-themes Tutorial"
        subtitle="A comprehensive guide to using the theme management system for React applications"
        logoText="ASM"
        size="md"
        align="space-between"
        elevation="medium"
        showBorder
        onLogoClick={gotoNpm}
        onTitleClick={gotoNpm}
        leftContent={
          <ThemeToggle
            size="lg"
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "var(--theme-color-text)",
              cursor: "pointer",
            }}
          />
        }
        rightContent={
          <ButtonComponent
            size="sm"
            variant="outline"
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "var(--theme-color-text)",
              cursor: "pointer",
            }}
            onClick={() =>
              window.open(
                "https://github.com/AliSafari-IT/react-themes",
                "_blank"
              )
            }
            icon={<GithubIcon />}
            target="_blank"
          >
            GitHub
          </ButtonComponent>
        }
      />

      <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "var(--theme-color-background-secondary)",
            border: "1px solid var(--theme-color-border)",
            borderRadius: "var(--theme-radius-md)",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Current Theme Status</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <p>
                <strong>Mode:</strong> {mode}
              </p>
              <p>
                <strong>Theme:</strong> {currentTheme.name}
              </p>
              <p>
                <strong>Is Dark:</strong> {isDark ? "Yes" : "No"}
              </p>
              <p>
                <strong>Is Light:</strong> {isLight ? "Yes" : "No"}
              </p>
              <p>
                <strong>Is Auto:</strong> {isAuto ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p>
                <strong>Primary Color:</strong>{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: currentTheme.colors.primary,
                    borderRadius: "4px",
                    verticalAlign: "middle",
                    marginLeft: "8px",
                  }}
                ></span>
              </p>
              <p>
                <strong>Background:</strong>{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: currentTheme.colors.background,
                    border: "1px solid var(--theme-color-border)",
                    borderRadius: "4px",
                    verticalAlign: "middle",
                    marginLeft: "8px",
                  }}
                ></span>
              </p>
              <p>
                <strong>Text:</strong>{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: currentTheme.colors.text,
                    borderRadius: "4px",
                    verticalAlign: "middle",
                    marginLeft: "8px",
                  }}
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <TabComponent
        tabs={[
          {
            id: "basic",
            label: "Basic Usage",
            content: <BasicUsageExample />,
          },
          {
            id: "custom-themes",
            label: "Custom Themes",
            content: <CustomThemesExample />,
          },
          {
            id: "css-variables",
            label: "CSS Variables",
            content: <CSSVariablesExample />,
          },
          {
            id: "components",
            label: "Components",
            content: <ComponentsExample />,
          },
          {
            id: "advanced",
            label: "Advanced Usage",
            content: <AdvancedUsageExample />,
          },
          {
            id: "real-world",
            label: "Real-World Examples",
            content: <RealWorldExample />,
          },
        ]}
      />

      <div style={{ marginTop: "3rem" }}>
        <PackageLinks
          packageName="@asafarim/react-themes"
          githubPath="https://github.com/AliSafari-IT/react-themes"
          demoPath="https://bibliography.asafarim.com/react-themes/demo"
        />
      </div>
    </div>
  );
};

// Main demo app
const App: React.FC = () => {
  return (
    <ThemeProvider
      defaultMode="auto"
      customThemes={{
        pink: customPinkTheme,
        blue: customBlueTheme,
        green: customGreenTheme,
      }}
      persistMode={true}
    >
      <ThemeTutorial />
    </ThemeProvider>
  );
};

export default App;
