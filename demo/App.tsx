import * as React from "react";
import { useTheme, ThemeToggle, ThemeSelector, DensitySelector } from "../src";
import { Github, Palette, Code, Zap, Layout, Settings, CheckCircle } from "lucide-react";

const Container: React.FC<{ children: React.ReactNode; maxWidth?: string }> = ({ children, maxWidth = 'var(--asm-container-xl)' }) => (
  <div style={{
    maxWidth,
    margin: '0 auto',
    padding: 'var(--asm-space-page-padding-y) var(--asm-space-page-padding-x)',
  }}>
    {children}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{
    backgroundColor: 'var(--asm-color-surface)',
    border: `var(--asm-border-hairline) solid var(--asm-color-border)`,
    borderRadius: 'var(--asm-radius-lg)',
    padding: 'var(--asm-space-6)',
    marginBottom: 'var(--asm-space-6)',
    boxShadow: 'var(--asm-effect-shadow-sm)',
  }}>
    {title && (
      <h3 style={{
        marginTop: 0,
        marginBottom: 'var(--asm-space-4)',
        fontSize: 'var(--asm-font-size-xl)',
        fontWeight: 'var(--asm-font-weight-600)',
        color: 'var(--asm-color-text)',
      }}>
        {title}
      </h3>
    )}
    {children}
  </div>
);

const CodeBlock: React.FC<{ code: string; title?: string }> = ({ code, title }) => (
  <div style={{ marginBottom: 'var(--asm-space-4)' }}>
    {title && (
      <div style={{
        padding: 'var(--asm-space-2) var(--asm-space-3)',
        background: 'var(--asm-color-bg)',
        borderRadius: 'var(--asm-radius-md) var(--asm-radius-md) 0 0',
        fontFamily: 'var(--asm-font-family-mono)',
        fontSize: 'var(--asm-font-size-sm)',
        fontWeight: 'var(--asm-font-weight-600)',
        color: 'var(--asm-color-text-muted)',
        borderBottom: `var(--asm-border-hairline) solid var(--asm-color-border)`,
      }}>
        {title}
      </div>
    )}
    <pre style={{
      backgroundColor: 'var(--asm-color-bg)',
      padding: 'var(--asm-space-4)',
      borderRadius: title ? '0 0 var(--asm-radius-md) var(--asm-radius-md)' : 'var(--asm-radius-md)',
      overflowX: "auto",
      border: `var(--asm-border-hairline) solid var(--asm-color-border)`,
      margin: 0,
      fontFamily: 'var(--asm-font-family-mono)',
      fontSize: 'var(--asm-font-size-sm)',
      lineHeight: 'var(--asm-line-height-relaxed)',
      color: 'var(--asm-color-text)',
    }}>
      <code style={{ color: 'var(--asm-color-text)' }}>{code}</code>
    </pre>
  </div>
);

const Header: React.FC = () => {
  const { mode, resolvedMode, density } = useTheme();

  return (
    <header style={{
      borderBottom: `var(--asm-border-hairline) solid var(--asm-color-border)`,
      marginBottom: 'var(--asm-space-8)',
    }}>
      <Container>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 'var(--asm-space-6)',
          paddingBottom: 'var(--asm-space-6)',
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 'var(--asm-font-size-4xl)',
              fontWeight: 'var(--asm-font-weight-700)',
              color: 'var(--asm-color-text)',
            }}>
              @asafarim/react-themes
            </h1>
            <p style={{
              margin: 'var(--asm-space-2) 0 0',
              fontSize: 'var(--asm-font-size-lg)',
              color: 'var(--asm-color-text-muted)',
            }}>
              React theme management powered by ASafariM Design Tokens
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--asm-space-3)', alignItems: 'center' }}>
            <ThemeToggle variant="ghost" size="lg" />
            <a
              href="https://github.com/AliSafari-IT/react-themes"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--asm-space-2)',
                padding: 'var(--asm-space-2) var(--asm-space-4)',
                backgroundColor: 'transparent',
                color: 'var(--asm-color-text)',
                textDecoration: 'none',
                borderRadius: 'var(--asm-radius-md)',
                border: `var(--asm-border-hairline) solid var(--asm-color-border)`,
                fontSize: 'var(--asm-font-size-sm)',
                fontWeight: 'var(--asm-font-weight-500)',
                transition: 'var(--asm-transition-fade)',
              }}
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: 'var(--asm-space-4)',
          paddingBottom: 'var(--asm-space-6)',
          fontSize: 'var(--asm-font-size-sm)',
          color: 'var(--asm-color-text-muted)',
        }}>
          <div>Mode: <strong>{mode}</strong> ({resolvedMode})</div>
          <div>Density: <strong>{density}</strong></div>
        </div>
      </Container>
    </header>
  );
};

const QuickStartSection: React.FC = () => (
  <Card title="Quick Start">
    <p style={{ marginTop: 0, color: 'var(--asm-color-text)' }}>
      Install the package and start using design tokens in your React app.
    </p>
    
    <CodeBlock 
      title="Installation"
      code={`npm install @asafarim/react-themes`}
    />
    
    <CodeBlock 
      title="Setup"
      code={`import { ThemeProvider } from '@asafarim/react-themes';

function App() {
  return (
    <ThemeProvider defaultMode="auto" persistMode={true}>
      <YourApp />
    </ThemeProvider>
  );
}`}
    />
    
    <CodeBlock 
      title="Usage"
      code={`import { useTheme, ThemeToggle } from '@asafarim/react-themes';

function MyComponent() {
  const { mode, resolvedMode, toggleMode } = useTheme();
  
  return (
    <div>
      <p>Current mode: {resolvedMode}</p>
      <ThemeToggle variant="outline" />
    </div>
  );
}`}
    />
  </Card>
);

const ComponentShowcaseSection: React.FC = () => (
  <Card title="Built-in Components">
    <h4 style={{ marginBottom: 'var(--asm-space-4)' }}>ThemeToggle Variants</h4>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 'var(--asm-space-4)',
      marginBottom: 'var(--asm-space-6)',
    }}>
      {(['default', 'outline', 'ghost', 'circle', 'icon'] as const).map(variant => (
        <div key={variant} style={{
          padding: 'var(--asm-space-4)',
          backgroundColor: 'var(--asm-color-surface-muted)',
          borderRadius: 'var(--asm-radius-md)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--asm-space-2)',
        }}>
          <ThemeToggle variant={variant} />
          <code style={{ fontSize: 'var(--asm-font-size-xs)' }}>{variant}</code>
        </div>
      ))}
    </div>

    <h4 style={{ marginBottom: 'var(--asm-space-4)' }}>ThemeSelector</h4>
    <div style={{ marginBottom: 'var(--asm-space-6)' }}>
      <ThemeSelector variant="buttons" />
    </div>
    <div style={{ marginBottom: 'var(--asm-space-6)' }}>
      <ThemeSelector variant="dropdown" />
    </div>

    <h4 style={{ marginBottom: 'var(--asm-space-4)' }}>DensitySelector</h4>
    <DensitySelector />
  </Card>
);

const DesignTokensSection: React.FC = () => {
  const tokenCategories = [
    {
      title: 'Colors',
      tokens: [
        '--asm-color-bg',
        '--asm-color-surface',
        '--asm-color-text',
        '--asm-color-text-muted',
        '--asm-color-border',
        '--asm-color-button-primary-bg',
      ]
    },
    {
      title: 'Spacing',
      tokens: [
        '--asm-space-1 (4px)',
        '--asm-space-2 (8px)',
        '--asm-space-3 (12px)',
        '--asm-space-4 (16px)',
        '--asm-space-6 (24px)',
        '--asm-space-8 (32px)',
      ]
    },
    {
      title: 'Typography',
      tokens: [
        '--asm-font-family-primary',
        '--asm-font-size-sm',
        '--asm-font-size-md',
        '--asm-font-size-lg',
        '--asm-font-weight-400',
        '--asm-font-weight-600',
      ]
    },
    {
      title: 'Effects',
      tokens: [
        '--asm-radius-sm',
        '--asm-radius-md',
        '--asm-radius-lg',
        '--asm-effect-shadow-sm',
        '--asm-transition-fade',
        '--asm-motion-duration-normal',
      ]
    },
  ];

  return (
    <Card title="Design Tokens">
      <p style={{ marginTop: 0, color: 'var(--asm-color-text)' }}>
        The package leverages <code>@asafarim/design-tokens</code> for consistent theming across all applications.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--asm-space-4)',
        marginTop: 'var(--asm-space-6)',
      }}>
        {tokenCategories.map(category => (
          <div key={category.title} style={{
            padding: 'var(--asm-space-4)',
            backgroundColor: 'var(--asm-color-surface-muted)',
            borderRadius: 'var(--asm-radius-md)',
          }}>
            <h5 style={{
              margin: '0 0 var(--asm-space-3) 0',
              fontSize: 'var(--asm-font-size-md)',
              fontWeight: 'var(--asm-font-weight-600)',
            }}>
              {category.title}
            </h5>
            <ul style={{
              margin: 0,
              padding: '0 0 0 var(--asm-space-4)',
              fontSize: 'var(--asm-font-size-sm)',
              color: 'var(--asm-color-text-muted)',
            }}>
              {category.tokens.map(token => (
                <li key={token} style={{ marginBottom: 'var(--asm-space-1)' }}>
                  <code>{token}</code>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeBlock 
        title="Using Design Tokens in CSS"
        code={`.my-component {
  background: var(--asm-color-surface);
  color: var(--asm-color-text);
  padding: var(--asm-space-4);
  border-radius: var(--asm-radius-md);
  box-shadow: var(--asm-effect-shadow-sm);
  transition: var(--asm-transition-fade);
}`}
      />
    </Card>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    { icon: <Palette size={20} />, title: 'Design Token Integration', description: 'Seamlessly integrates with @asafarim/design-tokens for consistent theming' },
    { icon: <Zap size={20} />, title: 'Auto Theme Detection', description: 'Automatically detects and respects system theme preferences' },
    { icon: <Layout size={20} />, title: 'Density Controls', description: 'Built-in support for compact, default, and comfortable density modes' },
    { icon: <Code size={20} />, title: 'TypeScript First', description: 'Fully typed with comprehensive TypeScript support' },
    { icon: <Settings size={20} />, title: 'Customizable', description: 'Flexible API allows full customization of theme behavior' },
    { icon: <CheckCircle size={20} />, title: 'SSR Ready', description: 'Works seamlessly with server-side rendering' },
  ];

  return (
    <Card title="Features">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--asm-space-4)',
      }}>
        {features.map(feature => (
          <div key={feature.title} style={{
            padding: 'var(--asm-space-4)',
            backgroundColor: 'var(--asm-color-surface-muted)',
            borderRadius: 'var(--asm-radius-md)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--asm-space-2)',
              marginBottom: 'var(--asm-space-2)',
              color: 'var(--asm-color-button-primary-bg)',
            }}>
              {feature.icon}
              <h5 style={{
                margin: 0,
                fontSize: 'var(--asm-font-size-md)',
                fontWeight: 'var(--asm-font-weight-600)',
              }}>
                {feature.title}
              </h5>
            </div>
            <p style={{
              margin: 0,
              fontSize: 'var(--asm-font-size-sm)',
              color: 'var(--asm-color-text-muted)',
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const App: React.FC = () => {

  return (
    <div>
      <Header />
      <Container>
        <FeaturesSection />
        <QuickStartSection />
        <ComponentShowcaseSection />
        <DesignTokensSection />
        
        <footer style={{
          marginTop: 'var(--asm-space-16)',
          paddingTop: 'var(--asm-space-8)',
          borderTop: `var(--asm-border-hairline) solid var(--asm-color-border)`,
          textAlign: 'center',
          color: 'var(--asm-color-text-muted)',
          fontSize: 'var(--asm-font-size-sm)',
        }}>
          <p>
            Built with ❤️ by <a href="https://github.com/AliSafari-IT" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--asm-color-button-primary-bg)' }}>Ali Safari</a>
          </p>
          <p>
            <a href="https://www.npmjs.com/package/@asafarim/react-themes" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--asm-color-text-muted)' }}>npm</a>
            {' • '}
            <a href="https://github.com/AliSafari-IT/react-themes" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--asm-color-text-muted)' }}>GitHub</a>
          </p>
        </footer>
      </Container>
    </div>
  );
};

export default App;
