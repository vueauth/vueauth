import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // with options
      '/api': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/sanctum/csrf-cookie': 'http://localhost',
      '/login': 'http://localhost',
      '/register': 'http://localhost',
      '/logout': 'http://localhost',
      '/forgot-password': 'http://localhost',
      '/reset-password': 'http://localhost',
      '/user/password': 'http://localhost'
    }
  }
})
