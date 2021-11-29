module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }]
  }
}
