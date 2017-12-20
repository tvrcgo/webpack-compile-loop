const webpack = require('webpack')
const { join } = require('path')
const root = process.cwd()
const pkg = require(join(root, 'package.json'))

module.exports = ({ name = '' }) => {

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
    resolveLoader: {
      modules: [
        join(__dirname, '../node_modules'),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [ 'es2015', 'stage-0', 'react' ],
              plugins: [ 'transform-decorators-legacy' ],
              cacheDirectory: true,
              filename: join(__dirname, '../package.json')
            }
          },
          include: [ root ],
          exclude: [ /node_modules/ ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        minimize: true,
        output: {
          comments: false,
        },
      })
    ],
    externals: {
      'react': {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom'
      },
      'react-router': {
        root: 'ReactRouter',
        commonjs: 'react-router',
        commonjs2: 'react-router',
        amd: 'react-router'
      },
      'mobx': 'mobx',
      'mobx-react': {
        root: 'mobxReact',
        commonjs: 'mobx-react',
        commonjs2: 'mobx-react',
        amd: 'mobx-react'
      },
    }
  }
}
