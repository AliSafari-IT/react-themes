import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'


// Import styles in your main entry file
import "@asafarim/shared/dist/styles.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
