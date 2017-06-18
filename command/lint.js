const { resolve } = require('path')

const _module = (name) => resolve(__dirname, '../node_modules/', name)

module.exports = function* (argv, cmd) {
  const eslint = _module('.bin/eslint')
  const args = [
    '--config',
    resolve(__dirname, '../config/eslint.json')
  ].concat(argv._.slice(1))
  yield cmd.fork(eslint, args)
}
