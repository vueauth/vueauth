import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/main.ts',
  external: [
    'vue',
    'vue-demi',
    'vue-router',
    'deepmerge',
    '@vueuse/core',
    '@vueuse/shared',
    '@vueauth/core',
  ],
  output: [
    {
      file: './dist/strapi.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    commonjs(),
    typescript({
      sourceMap: !production,
      tsconfig: './tsconfig.json',
    }),
  ],
}
