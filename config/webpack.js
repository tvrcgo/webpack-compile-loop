const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const { join } = require('path')
const root = process.cwd()
const front = join(root, 'front')

const mod = name => join(__dirname, '../node_modules/', name)

exports.loaders = {

  babel: {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
      presets: [
        mod('babel-preset-es2015'),
        mod('babel-preset-stage-0'),
        mod('babel-preset-react')
      ],
      plugins: [
        mod('babel-plugin-transform-decorators-legacy'),
        [ mod('babel-plugin-import'), { libraryName: 'antd', style: true }],
      ]
    },
    include: [ front ],
    exclude: [ /node_modules/ ],
  },

  typescript: {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    query: {
      configFileName: './tsconfig.json'
    },
    include: [ front ],
    exclude: [ /node_modules/ ],
  },

  css: {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract([ 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:8]&camelCase', 'postcss-loader' ])
  },

  less: (vars = {}) => {
    return {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract([ 'css-loader', `less-loader?{modifyVars:${JSON.stringify(vars)}}` ])
    }
  }
}

exports.plugins = {

  DefineProdEnv: new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),

  PostcssOptions: new webpack.LoaderOptionsPlugin({
    test: /\.css$/,
    options: {
      postcss: [
        require('postcss-nested')
      ]
    }
  }),

  UglifyJS: new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    minimize: true,
    output: {
      comments: false,
    },
  }),

  Dll: new webpack.DllPlugin({
    path: join(root, 'run/[name]_manifest.json'),
    name: '[name]_[hash]',
    context: root,
  }),

  DllReference: (name = 'lib_manifest.json') => {
    return new webpack.DllReferencePlugin({
      manifest: require(join(root, `run/${name}`)),
      context: root,
    })
  },

  Assets: (name) => {
    return new AssetsPlugin({
      fullPath: false,
      path: join(root, 'run'),
      filename: name,
    })
  },

  ExtractCSS: (filename = '[name].css') => {
    return new ExtractTextPlugin(`style/${filename}`)
  }

}
