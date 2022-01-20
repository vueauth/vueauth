import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/main.ts',
  external: [
    'vue',
    'vue-demi',
    'vue-router',
  ],
  output: [
    {
      file: './dist/sanctum.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve({
      // resolveOnly: [/^(?!vue-demi).*/],
      // modulesOnly: true,
      // dedupe: [
      //   'vue-demi',
      // ],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      tsconfig: './tsconfig.json',
    }),
  ],
}
