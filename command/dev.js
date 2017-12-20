const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const compile = require('../lib/compile')
const base = require('../config/web-base')

module.exports = function* (argv, cmd) {

  const config = base(argv)

  // bundle file name
  config.output.filename = 'bundle/[name].js'

  // plugins
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
    new ExtractTextPlugin(`style/[name].css`)
  )

  // compile
  compile(config).watch({
    poll: true
  })
}
