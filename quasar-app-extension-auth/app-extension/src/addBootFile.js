import fs from 'fs'

export default function addBootFile (filePath, newBootEntry) {
  const file = fs.readFileSync(filePath, 'utf-8')
  const fileName = filePath.split('/').slice(-1)

  // Match `boot: [...]` including multi-line versions, and capture indentation
  const bootRegex = /^([ \t]*)boot\s*:\s*\[\s*([\s\S]*?)\s*^\1]/m
  const match = file.match(bootRegex)

  if (!match) {
    console.error(`❌ No boot array found in "${filePath}".`)
    return
  }

  const indent = match[1]
  const bootArrayRaw = match[2]

  // Check for trailing comma
  const hasTrailingComma = /,\s*$/.test(bootArrayRaw.trim())

  // Extract existing boot entries
  const bootEntries = bootArrayRaw
    .split(',')
    .map(s => s.trim().replace(/^['"`]|['"`]$/g, '')) // remove quotes
    .filter(Boolean)

  if (bootEntries.includes(newBootEntry)) {
    console.log(`ℹ️ "${newBootEntry}" boot file already exists.`)
    return
  }

  // Add new entry
  bootEntries.push(newBootEntry)

  // Format the array with preserved trailing comma logic
  const innerIndent = indent + '  '
  const lastIndex = bootEntries.length - 1
  const formattedEntries = bootEntries.map((entry, i) => {
    const comma = (i < lastIndex || hasTrailingComma) ? ',' : ''
    return `${innerIndent}'${entry}'${comma}`
  })

  const newBootBlock =
    `${indent}boot: [\n` +
    formattedEntries.join('\n') +
    `\n${indent}]`

  const newFileContent = file.replace(bootRegex, newBootBlock)

  fs.writeFileSync(filePath, newFileContent, 'utf-8')
  console.log(`✅ Added "${newBootEntry}" to ${fileName} -> boot.`)
}
