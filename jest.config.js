// FAQ: https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
  silent: true,
  transformIgnorePatterns: ['/', '<rootDir>/node_modules/(?!@foo)'],
  testPathIgnorePatterns: ['.tmp', 'build', 'dist', 'node_modules'],
  roots: ['<rootDir>/packages'],
  verbose: true,
  automock: false,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass|sss|ttf|woff|woff2)$': 'identity-obj-proxy'
  },
  collectCoverage: true,
  bail: true,
  coverageReporters: ['lcov', 'text', 'text-summary'],
  cacheDirectory: '.tmp/jest-cache',
  coverageDirectory: './.tmp/reports/coverage',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  globals: {
    __DEV__: true,
    __PROD__: false
  }
}
