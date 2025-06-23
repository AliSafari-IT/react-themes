import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@asafarim/react-themes': path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/index.ts')
    }
  },
  server: {
    port: 3005,
    open: true
  }
})
