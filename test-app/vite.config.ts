import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Sanctum
      '/sanctum/api': {
        target: 'http://localhost',
        changeOrigin: true,
      },
      '/sanctum/csrf-cookie': 'http://localhost',
      '/sanctum/login': 'http://localhost',
      '/sanctum/register': 'http://localhost',
      '/sanctum/logout': 'http://localhost',
      '/sanctum/forgot-password': 'http://localhost',
      '/sanctum/reset-password': 'http://localhost',
      '/sanctum/user/password': 'http://localhost',

      // strapi
      '/api': {
        target: 'http://localhost:1337',
        changeOrigin: true,
      },
      '/api/auth/local': 'http://localhost:1337',
      '/api/auth/local/register': 'http://localhost:1337',
      '/api/users/me': 'http://localhost:1337',
      '/api/auth/reset-password': 'http://localhost:1337',
      '/api/auth/forgot-password': 'http://localhost:1337',
      '/api/change-password': 'http://localhost:1337',
    },
  },
})
