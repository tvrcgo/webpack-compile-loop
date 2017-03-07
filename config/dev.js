
const { loaders, plugins } = require('./webpack')
const base = require('./base')
const config = Object.assign({}, base)

config.output.filename = 'bundle/[name].js'

config.module.loaders = config.module.loaders.concat([
  loaders.babel
])

config.plugins = config.plugins.concat([
  plugins.ExtractCSS('[name].css')
])

module.exports = config
