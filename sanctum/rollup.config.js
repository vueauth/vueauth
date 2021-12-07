import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/main.ts',
  external: [
    'vue',
    'vue-demi',
    'vue-router'
  ],
  output: [
    {
      file: './dist/sanctum-composables.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve({
      resolveOnly: [/^(?!vue-demi).*/],
      modulesOnly: true,
      dedupe: [
        'vue-demi'
      ]
    }),
    typescript({
      sourceMap: !production,
      tsconfig: './tsconfig.json'
    })
  ]
}
