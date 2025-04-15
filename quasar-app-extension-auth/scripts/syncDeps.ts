import { join } from 'node:path'

import { replacePackageVersion } from './replacePackageVersion'

const implementations = [
  'core',
  'firebase',
  'indexeddb',
  'sanctum',
  'strapi',
  'supabase'
]

implementations.forEach(async implementation => {
  const version = (await import(`../../${implementation}/package.json`)).version

  replacePackageVersion(
    join(__dirname, '../app-extension/src/providerDependencies.js'),
    `'@vueauth/${implementation}'`,
    version
  )
})