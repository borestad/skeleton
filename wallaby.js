module.exports = function (wallaby) {
  return {
    files: [
      'packages/**/*.ts?(x)',
      'packages/**/*.snap',
      '!packages/**/*.spec.ts?(x)'
    ],
    tests: ['packages/**/*.spec.ts?(x)'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    debug: true
  }
}
