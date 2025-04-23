import fs from 'fs'

export default function addAuthRoutesToRoutesFile(filePath) {
  const file = fs.readFileSync(filePath, 'utf-8')

  const importLine = `import { authRoutes } from './authRoutes'`
  const hasImport = file.includes(importLine)
  const hasSpread = file.includes('...authRoutes')

  if (hasImport && hasSpread) {
    console.log('ℹ️ authRoutes already added to routes file.')
    return
  }

  let newFile = file

  // ✅ 1. Add the import
  if (!hasImport) {
    const vueRouterImportRegex = /import\s+[^'"]*['"]vue-router['"]/
    if (vueRouterImportRegex.test(file)) {
      newFile = newFile.replace(
        vueRouterImportRegex,
        match => `${match}\n${importLine}`
      )
    } else {
      newFile = `${importLine}\n${newFile}`
    }
  }

  // ✅ 2. Add `...authRoutes,` inside the array
  const routesRegex = /(const\s+routes\s*:\s*RouteRecordRaw\[\]\s*=\s*\[)([\s\S]*?)(\][\s\S]*?export\s+default\s+routes)/m

  if (routesRegex.test(newFile)) {
    newFile = newFile.replace(routesRegex, (_, start, middle, end) => {
      if (middle.includes('...authRoutes')) return `${start}${middle}${end}`

      const lines = middle.split('\n')
      const firstRouteLineIndex = lines.findIndex(
        line => line.trim().startsWith('{') || line.trim().startsWith('//')
      )

      const indentMatch = lines[firstRouteLineIndex]?.match(/^(\s*)/)
      const indent = indentMatch ? indentMatch[1] : '  '

      const updatedLines = [
        ...lines.slice(0, firstRouteLineIndex),
        `${indent}...authRoutes,`,
        ...lines.slice(firstRouteLineIndex),
      ]

      return `${start}${updatedLines.join('\n')}${end}`
    })
  } else {
    console.warn('⚠️ Could not find routes array declaration.')
    return
  }

  fs.writeFileSync(filePath, newFile, 'utf-8')
  console.log('✅ Added authRoutes import and usage to routes file.')
}
