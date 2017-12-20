const webpack = require('webpack')
const compile = require('../lib/compile')
const base = require('../config/web-base')

module.exports = function* (argv, cmd) {

  const config = base(argv)

  // bundle file name
  config.output.filename = 'bundle/[name].[hash:8].js'

  // plugins
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new ExtractTextPlugin(`style/[name].[hash:8].css`),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      minimize: true,
      output: {
        comments: false,
      },
    })
  )

  // compile
  compile(config).run()

}
