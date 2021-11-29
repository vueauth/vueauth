// eslint-disable-next-line no-undef
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/main.ts',
  external: [
    'vue-demi',
    'vue',
    'vue-router'
  ],

  output: [
    {
      file: './dist/auth-composables.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve({
      resolveOnly: [/^(?!vue).*/],
      modulesOnly: true,
      dedupe: [
        'vue'
      ]
    }),
    typescript({
      sourceMap: !production,
      tsconfig: './tsconfig.json'
    })
  ]
}
