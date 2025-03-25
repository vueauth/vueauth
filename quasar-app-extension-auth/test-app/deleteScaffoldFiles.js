import fs from 'fs'

const folders = [
  './src/components/auth',
  './src/composables/auth',
  './src/layouts/AuthLayout',
  './src/pages/auth',
  './src/pages/dashboard',
]
const files = [
  './src/router/authRoutes.ts',
  './src/boot/vueauth.ts',
  './src/router/authRoutes.js',
  './src/boot/vueauth.js',
]

folders.forEach((folder) => {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true })
  }
})
files.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.rmSync(file, { recursive: true })
  }
})
