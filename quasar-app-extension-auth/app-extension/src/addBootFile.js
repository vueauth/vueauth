import fs from 'fs'

export default function addBootFile(filePath, newBootEntry) {
  const file = fs.readFileSync(filePath, 'utf-8')
  const fileName = filePath.split('/').slice(-1)[0]

  const bootRegex = /^([ \t]*)(boot\s*:\s*)\[\s*([\s\S]*?)\s*](,?)/m
  const match = file.match(bootRegex)

  if (!match) {
    console.error(`❌ No boot array found in "${filePath}".`)
    return
  }

  const [fullMatch, baseIndent, prefix, inside, trailingComma] = match

  const bootEntries = inside
    .split(',')
    .map(s => s.trim().replace(/^['"`]|['"`]$/g, ''))
    .filter(Boolean)

  if (bootEntries.includes(newBootEntry)) {
    console.log(`ℹ️ "${newBootEntry}" boot file already exists.`)
    return
  }

  bootEntries.push(newBootEntry)

  const innerIndent = baseIndent + '  '

  const formatted = [
    `${baseIndent}${prefix}[`,
    ...bootEntries.map(e => `${innerIndent}'${e}',`),
    `${baseIndent}]${trailingComma}`
  ].join('\n')

  const newFileContent = file.replace(bootRegex, formatted)

  fs.writeFileSync(filePath, newFileContent, 'utf-8')
  console.log(`✅ Added "${newBootEntry}" to ${fileName} -> boot.`)
}
