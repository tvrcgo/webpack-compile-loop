const compile = require('../lib/compile')
const { plugins } = require('../config/webpack')
const base = require('../config/web-base')

module.exports = function* (argv, cmd) {

  const config = base(argv)

  // bundle file name
  config.output.filename = 'bundle/[name].[hash:8].js'

  // plugins
  config.plugins = config.plugins.concat([
    plugins.DefineProdEnv,
    plugins.ExtractCSS('[name].[hash:8].css'),
    plugins.UglifyJS,
  ])

  // compile
  compile(config).run()
  
}
