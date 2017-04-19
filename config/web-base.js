
const { join } = require('path')
const { loaders, plugins } = require('./webpack')
const ls = require('../lib/ls')

const root = process.cwd()
const web = join(root, 'web')
const entryRoot = join(root, 'web/view')
const pkg = require(join(root, 'package.json'))

module.exports = (argv) => {

  // base config
  const config = {
    entry: {},
    output: {
      path: join(root, 'app/public'),
      publicPath: '/public/'
    },
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ],
      modules: [
        web,
        join(root, 'node_modules')
      ]
    },
    resolveLoader: {
      modules: [
        join(__dirname, '../node_modules'),
        'node_modules'
      ]
    },
    module: {
      loaders: [
        loaders.image,
        loaders.css,
        loaders.less((pkg.config && pkg.config.less) || {})
      ]
    },
    plugins: [
      plugins.PostcssOptions,
      plugins.DllReference(),
      plugins.Assets('app_assets.json')
    ]
  }

  // entry
  const entries = ls(entryRoot)
  entries.map(name => {
    const entrypoint = join(entryRoot, name)
    config.entry[name] = [].concat(entrypoint)
  })
  if (!Object.keys(entries).length) {
    console.error(entryRoot, 'No entry founded.')
    process.exit(1)
  }

  // compiler: typescript or babel
  if (['ts', 'typescript'].includes(argv.compiler)) {
    config.module.loaders.push(loaders.typescript)
  } else {
    config.module.loaders.push(loaders.babel)
  }

  return config

}
