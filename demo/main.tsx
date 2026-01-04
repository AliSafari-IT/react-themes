import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '../src'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultMode="auto"
      defaultDensity="default"
      persistMode={true}
      enableTransitions={true}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
