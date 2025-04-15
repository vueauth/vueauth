import { join } from 'node:path'

import { replacePackageVersion } from './replacePackageVersion'
import corePackageJson from '../core/package.json'

const coreVersion = corePackageJson.version

const folders = [
  'firebase',
  'indexeddb',
  'sanctum',
  'strapi',
  'supabase',
]

folders.forEach(async folder => {
  replacePackageVersion(
    join(__dirname, `../${folder}/package.json`),
    "\"@vueauth/core\"",
    coreVersion
  )
})

