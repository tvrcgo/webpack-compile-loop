const { resolve } = require('path')

const _module = (name) => resolve(__dirname, '../node_modules/', name)

module.exports = function* (argv, cmd) {
  const mocha = _module('.bin/mocha')
  const args = [
    '--require',
    _module('intelli-espower-loader'),
    'test/**/*.test.js'
  ]
  yield cmd.fork(mocha, args)
}
