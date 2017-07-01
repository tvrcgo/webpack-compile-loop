const { resolve } = require('path')

const _module = (name) => resolve(__dirname, '../node_modules/', name)

module.exports = function* (argv, cmd) {
  const mocha = require.resolve('mocha/bin/_mocha')
  const args = [
    '--require',
    'intelli-espower-loader',
    '--require',
    'co-mocha',
    'test/**/*.test.js'
  ]
  yield cmd.fork(mocha, args)
}
