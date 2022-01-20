import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/main.ts',
  external: [
    'firebase',
    'firebase/auth',
    'vue',
    'vue-demi',
    'vue-router',
    'firebase/app',
    'firebase/firestore'
  ],

  output: [
    {
      file: './dist/firebase.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    nodeResolve({
      resolveOnly: [/^(?!firebase).*/, /^(?!vue-demi).*/],
      modulesOnly: true,
      dedupe: [
        'firebase',
        'firebase/auth',
        'firebase/app',
        'firebase/firestore',
        'vue-demi'
      ]
    }),
    typescript({
      sourceMap: !production,
      tsconfig: './tsconfig.json'
    })
  ]
}
