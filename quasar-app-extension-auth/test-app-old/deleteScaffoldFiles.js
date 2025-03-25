const fs = require('fs')

const folders = [
  './config',
  './src/auth'
]
const files = [
  './src/pages/UserDashboard.vue',
  './src/layouts/AuthenticatedLayout.vue'
]

folders.forEach(folder => {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true })
  }
})
files.forEach(file => {
  if (fs.existsSync(file)) {
    fs.rmSync(file, { recursive: true })
  }
})
