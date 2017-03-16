const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const { join } = require('path')
const root = process.cwd()
const front = join(root, 'front')

// fix loaderUtils.parseQuery() warning. Remove GTD.
process.noDeprecation = true

exports.loaders = {

  babel: {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
      presets: [
        'es2015',
        'stage-0',
        'react'
      ],
      plugins: [
        'transform-decorators-legacy',
        [ 'import', { libraryName: 'antd', style: true }],
      ],
      filename: join(__dirname, '../package.json')
    },
    include: [ front ],
    exclude: [ /node_modules/ ],
  },

  typescript: {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    query: {
      // loader options
      useBabel: true,
      babelOptions: {
        presets: ["es2015", "stage-0", "react"],
        plugins: [
          [ "import", { "libraryName": "antd", "style": true }]
        ],
        filename: join(__dirname, '../package.json')
      },
      useCache: false,
      emitRequireType: false,
      // comiler options
      target : "es6",
      moduleResolution: "node",
      jsx : "react",
      experimentalDecorators: true,
      strictNullChecks: true,
      allowSyntheticDefaultImports: true,
      noImplicitAny: false,
      removeComments: true,
      sourceMap: false,
      baseUrl: "front",
      typeRoots: [
        join(__dirname, '../node_modules/@types'),
        join(root, 'node_modules/@types')
      ]
    },
    include: [ front ],
    exclude: [ /node_modules/ ],
  },

  css: {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract([ 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]&camelCase', 'postcss-loader' ])
  },

  less: (vars = {}) => {
    return {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract([ 'css-loader', `less-loader?{modifyVars:${JSON.stringify(vars)}}` ])
    }
  },

  image: {
    test: /\.(jpe?g|png|gif|svg)$/,
    exclude: /node_modules/,
    loader: 'url-loader?name=image/[hash:12].[ext]&limit=2048'
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
      context: front,
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
