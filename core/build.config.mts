import { defineBuildConfig } from 'unbuild'
import { fileURLToPath } from 'node:url'

export default defineBuildConfig({
  alias: {
    src: fileURLToPath(new URL('./src', import.meta.url)),
  },
})
