
const { loaders, plugins } = require('./webpack')
const base = require('./base')
const config = Object.assign({}, base)

config.output.filename = 'bundle/[name].[hash:8].js'

config.module.loaders = config.module.loaders.concat([
  loaders.babel
])

config.plugins = config.plugins.concat([
  plugins.DefineProdEnv,
  plugins.ExtractCSS('[name].[hash:8].css'),
  plugins.UglifyJS,
])

module.exports = config
