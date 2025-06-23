import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allow importing from the parent src directory
      '@asafarim/react-themes': path.resolve(__dirname, '../src/index.ts')
    }
  },
  server: {
    port: 3005,
    open: true
  }
})
