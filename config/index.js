const { join } = require('path')
const { loaders, plugins } = require('./webpack')
const base = require('./base')
const config = Object.assign({}, base)
const ls = require('../lib/ls')
const root = process.cwd()
const entryRoot = join(root, 'front/view')

module.exports = argv => {

  // cmd
  const cmd = argv._[0]

  if (cmd === 'lib') {
    return require('./lib')
  }

  // Use DllReference plugin
  config.plugins.push(plugins.DllReference())

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

  // entry
  const entries = ls(entryRoot)
  entries.map(name => {
    const entrypoint = join(entryRoot, name)
    config.entry[name] = [].concat(entrypoint)
  })
  if (!Object.keys(entries).length) {
    return {
      error: new Error('No entry founded.')
    }
  }

  // compiler: typescript or babel
  if (['ts', 'typescript'].includes(argv.compiler)) {
    config.module.loaders.push(loaders.typescript)
  } else {
    config.module.loaders.push(loaders.babel)
  }

  return config
}
