import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; // 1. Import path

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: { // 2. Add resolve.alias configuration
    alias: {
      '@': path.resolve(__dirname, './src'), // 3. Map '@' to the src directory
    },
  },
  server: {
    proxy: {
      // Proxy requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:3000', // Your backend server address
        changeOrigin: true, // Needed for virtual hosted sites
        // Optional: rewrite path if needed, but often not necessary
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
