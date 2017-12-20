const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const { join } = require('path')

// fix loaderUtils.parseQuery() warning. Remove GTD.
process.noDeprecation = true

module.exports = (argv) => {
  const cwd = process.cwd()
  const root = join(cwd, argv.baseDir || '')
  const dist = join(cwd, argv.distDir || 'app/public')
  // dll library
  const dll = [ 'react', 'react-dom', 'react-router', 'mobx', 'mobx-react' ]

  return {
    entry: {
      dll
    },
    output: {
      path: dist,
      filename: 'bundle/[name].[hash:8].js',
      library: '[name]_[hash]',
    },
    resolve: {
      modules: [
        join(cwd, 'node_modules'),
        join(root, 'node_modules'),
        join(__dirname, '../node_modules')
      ]
    },
    resolveLoader: {
      modules: [
        join(cwd, 'node_modules'),
        join(root, 'node_modules'),
        join(__dirname, '../node_modules'),
        'node_modules'
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.ProvidePlugin({
        "React": "react",
      }),
      new webpack.DllPlugin({
        path: join(dist, '[name]_manifest.json'),
        name: '[name]_[hash]',
        context: root,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        minimize: true,
        output: {
          comments: false,
        },
      }),
      new AssetsPlugin({
        fullPath: false,
        path: dist,
        filename: 'dll_assets.json',
      })
    ]
  }
}
