import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/main.ts',
  external: [
    '@supabase/supabase-js',
    'vue',
    'vue-demi',
    'vue-router'
  ],

  output: [
    {
      file: './dist/supabase-composables.esm.js',
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
