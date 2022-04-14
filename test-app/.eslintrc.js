module.exports = {
  root: true,

  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
  },

  env: {
    es2021: true,
    node: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'plugin:vue/vue3-recommended',
    'standard',
  ],

  plugins: [
    '@typescript-eslint',
  ],

  globals: {
    process: 'readonly',
    NodeJS: true,
    Cypress: true,
  },

  // add your custom rules here
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true }],

    // Enforce comma dangle. This makes it easier to see diffs
    'comma-dangle': ['error', 'always-multiline'],

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
}
