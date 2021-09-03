module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // we trust the content from our CMS so we can safely ignore these warnings
    'vue/no-v-html': 0,
    'vue/component-name-in-template-casing': ['error', 'kebab-case']
  }
}
