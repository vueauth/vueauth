const fs = require('fs')
const path = require('path')

const dotQuasarDir = path.resolve('./.quasar')
const targetConfigPath = path.resolve('./quasar.config.js')
const viteConfigPath = path.resolve('./quasar-configs/vite-quasar.config.js')

if (fs.existsSync(targetConfigPath)) {
  fs.rmSync(targetConfigPath)
}

if (fs.existsSync(dotQuasarDir)) {
  fs.rmSync(dotQuasarDir, { recursive: true })
}

fs.copyFileSync(
  path.resolve(viteConfigPath),
  path.resolve(targetConfigPath)
)
