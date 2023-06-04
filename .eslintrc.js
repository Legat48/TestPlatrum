module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'jest',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {}
}
