const production = !process.env.ROLLUP_WATCH;

import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/main.ts',
  external: [
    'firebase',
    'firebase/auth',
    'vue',
    'vue-router',
    'firebase/app',
    'firebase/firestore',
  ],

  output: [
    {
      file: './dist/firebase-composables.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve({
      resolveOnly: [/^(?!firebase).*/],
      modulesOnly: true,
      dedupe: [
        'firebase',
        'firebase/auth',
        'firebase/app',
        'firebase/firestore'
      ]
    }),
    typescript({
      sourceMap: !production,
      tsconfig: './tsconfig.json'
    })
  ]
}
