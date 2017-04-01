const { loaders, plugins, externals } = require('./webpack')
const { join } = require('path')
const root = process.cwd()
const pkg = require(join(root, 'package.json'))

module.exports = ({ name = '' }) => {

  const deps = pkg.dependencies || {}
  const exts = {}
  Object.keys(deps).filter(lib => !!externals[lib]).map(lib => {
    Object.assign(exts, {
      [lib]: externals[lib]
    })
  })

  loaders.babel.include.push(join(root, 'src'))

  return {
    entry: join(root, 'src/index.js'),
    output: {
      libraryTarget: 'umd',
      library: name,
      path: root,
      filename: './index.js'
    },
    resolve: {
      extensions: [ '.js', '.jsx' ]
    },
    module: {
      loaders: [
        loaders.babel
      ]
    },
    plugins: [
      plugins.UglifyJS
    ],
    externals: exts
  }
}