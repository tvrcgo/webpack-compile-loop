const { resolve } = require('path')

module.exports = function* (argv, cmd) {
  const nyc = require.resolve('nyc/bin/nyc.js')
  const args = [
    'loop',
    'test'
  ]
  const opt = {
    env: {
      NODE_ENV: 'test'
    }
  }
  yield cmd.fork(nyc, args, opt)
}