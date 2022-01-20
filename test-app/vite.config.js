import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // with options
      '/sanctum/api': {
        target: 'http://localhost',
        changeOrigin: true
      },
      '/sanctum/csrf-cookie': 'http://localhost',
      '/sanctum/login': 'http://localhost',
      '/sanctum/register': 'http://localhost',
      '/sanctum/logout': 'http://localhost',
      '/sanctum/forgot-password': 'http://localhost',
      '/sanctum/reset-password': 'http://localhost',
      '/sanctum/user/password': 'http://localhost'
    }
  }
})
