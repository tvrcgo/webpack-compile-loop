const { resolve } = require('path')

module.exports = function* (argv, cmd) {
  const nyc = require.resolve('nyc/bin/nyc.js')
  const loop = resolve(__dirname, '../bin/loop.js')
  const args = [
    '--temp-directory', './node_modules/.nyc_output',
    '--report-dir', 'cov',
    loop,
    'test'
  ]
  const opt = {
    env: {
      NODE_ENV: 'test',
      FORCE_COLOR: true
    }
  }
  yield cmd.fork(nyc, args, opt)
}