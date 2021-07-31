const esModules = ['nypr-design-system-vue'].join('|')

module.exports = {
  globalSetup: './test/jest.setup.js',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  collectCoverage: true,
  coverageDirectory: 'test/coverage',
  collectCoverageFrom: [
    'components/**/*.vue',
    'pages/**/*.vue'
  ]
}
