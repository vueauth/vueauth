import fs from 'fs'

export default function addAuthenticateRoutes (filePath, lang = 'js') {
  const file = fs.readFileSync(filePath, 'utf-8')

  const importLine = 'import { authenticateRoutes } from \'@vueauth/quasar-app-extension-auth\''
  const callLine = 'authenticateRoutes()'
  const langAttr = `lang="${lang}"`

  // Match existing <script setup lang="...">, flexible on js/ts
  const scriptRegex = /<script\s+setup\s+(lang=["'](ts|js)["'])?>([\s\S]*?)<\/script>/m
  const match = file.match(scriptRegex)

  let newFileContent = ''

  if (match) {
    const currentScriptBody = match[3].trim()

    if (file.includes(importLine) || file.includes(callLine)) {
      console.log('ℹ️ App.vue already contains vueauth setup.')
      return
    }

    const updatedScriptBody =
      `${importLine}\n\n` +
      (currentScriptBody ? currentScriptBody + '\n\n' : '') +
      `${callLine}`

    const newScriptBlock = `<script setup ${langAttr}>\n${updatedScriptBody}\n</script>`

    newFileContent = file.replace(scriptRegex, newScriptBlock)
  } else {
    // No script tag at all, inject one
    const scriptBlock = `<script setup ${langAttr}>\n${importLine}\n\n${callLine}\n</script>\n\n`

    if (file.includes('<template')) {
      // Insert before the template block
      const templateIndex = file.indexOf('<template>')
      newFileContent = file.slice(0, templateIndex) + scriptBlock + file.slice(templateIndex)
    } else {
      // No <template>? Just insert at top
      newFileContent = scriptBlock + file
    }
  }

  fs.writeFileSync(filePath, newFileContent, 'utf-8')
  console.log('✅ Added vueauth setup to App.vue')
}
