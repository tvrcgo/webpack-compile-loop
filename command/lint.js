const { resolve } = require('path')

module.exports = function* (argv, cmd) {
  const eslint = require.resolve('eslint/bin/eslint.js')
  const args = [
    '--config',
    resolve(__dirname, '../config/eslint.json')
  ].concat(argv._.slice(1))
  yield cmd.fork(eslint, args)
}
