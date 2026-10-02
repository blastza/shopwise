import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/products': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/categories': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/auth': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
