
const { join, resolve } = require('path')
const { loaders, plugins } = require('./webpack')
const root = process.cwd()
const front = join(root, 'front')
const pkg = require(join(root, 'package.json'))

module.exports = {
  entry: {},
  output: {
    path: 'app/public',
    publicPath: '/public/'
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ],
    modules: [
      front,
      join(root, 'node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      join(__dirname, '../node_modules')
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
