import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react-themes/',
  plugins: [react()],
  server: {
    port: 3005,
    open: true
  }
})
