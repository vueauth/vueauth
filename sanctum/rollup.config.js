const production = !process.env.ROLLUP_WATCH;

import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/main.ts',
  external: [
    'vue',
    'vue-router',
  ],
  output: [
    {
      file: './dist/sanctum-composables.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve(),
    typescript({
      sourceMap: !production,
      tsconfig: './tsconfig.json'
    })
  ]
}
