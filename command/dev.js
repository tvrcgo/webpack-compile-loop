const compile = require('../lib/compile')
const { plugins } = require('../config/webpack')
const base = require('../config/web-base')

module.exports = function* (argv, cmd) {

  const config = base(argv)

  // bundle file name
  config.output.filename = 'bundle/[name].js'

  // plugins
  config.plugins.push(
    plugins.ExtractCSS('[name].css')
  )

  // compile
  compile(config).watch({
    poll: true
  })
}
