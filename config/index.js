
const { loaders, plugins } = require('./webpack')
const base = require('./base')
const config = Object.assign({}, base)

module.exports = argv => {

  // cmd
  const cmd = argv._[0]

  if (cmd === 'dll') {
    return require('./dll')
  }

  if (cmd === 'dev') {
    // bundle file name
    config.output.filename = 'bundle/[name].js'
    // plugins
    config.plugins = config.plugins.concat([
      plugins.ExtractCSS('[name].css')
    ])
  }

  if (cmd === 'prod') {
    // bundle file name
    config.output.filename = 'bundle/[name].[hash:8].js'
    // plugins
    config.plugins = config.plugins.concat([
      plugins.DefineProdEnv,
      plugins.ExtractCSS('[name].[hash:8].css'),
      plugins.UglifyJS,
    ])
  }

  // parser
  const parser = ['ts', 'typescript'].includes(argv.parser) ? loaders.typescript : loaders.babel
  config.module.loaders.push(parser)

  return config
}
