import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss('./DishMasters_Frontend/tailwind.config.js')
  ],
  server: {
    port: 5173,
    cors: {
      origin: 'http://localhost:8000',
      credentials: true,
    },
  },
})
