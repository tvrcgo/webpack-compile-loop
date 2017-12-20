const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { join } = require('path')

// fix loaderUtils.parseQuery() warning. Remove GTD.
process.noDeprecation = true

module.exports = (argv) => {
  const cwd = process.cwd()
  const root = join(cwd, argv.baseDir || '')
  const dist = join(cwd, argv.distDir || 'app/public')
  const src = join(root, 'src')
  const pkg = require(join(root, 'package.json'))
  // base config
  const config = {
    entry: {
      app: join(src, 'index')
    },
    output: {
      path: dist,
      publicPath: '/public/'
    },
    resolve: {
      extensions: [ '.ts', '.tsx', '.js', '.json', '.jsx' ],
      modules: [
        src,
        join(root, 'node_modules'),
        join(__dirname, '../node_modules')
      ]
    },
    resolveLoader: {
      modules: [
        join(root, 'node_modules'),
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
              extends: join(root, '.babelrc')
            }
          },
          include: [ src ],
          exclude: [ /node_modules/ ]
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          include: [ src ],
          exclude: [ /node_modules/ ],
          options: {
            // loader options
            useBabel: true,
            babelOptions: {
              presets: [ "es2015", "stage-0", "react" ],
              plugins: [ "transform-decorators-legacy" ],
              cacheDirectory: true,
              extends: join(root, '.babelrc'),
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
            baseUrl: src,
            typeRoots: [
              join(__dirname, '../node_modules/@types'),
              join(root, '/node_modules/@types')
            ]
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]&camelCase",
              "postcss-loader"
            ]
          })
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader",
              {
                loader: "less-loader",
                options: {
                  modifyVars: pkg.theme || {}
                }
              }
            ]
          })
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          exclude: /node_modules/,
          loader: "url-loader",
          options: {
            limit: 2048,
            name: "image/[hash:12].[ext]"
          }
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          context: src,
          postcss: [
            require('postcss-nested')
          ]
        }
      }),
      new webpack.ProvidePlugin({
        "React": "react",
      }),
      new webpack.DllReferencePlugin({
        manifest: require(join(dist, 'dll_manifest.json')),
        context: root,
      }),
      new AssetsPlugin({
        fullPath: false,
        path: dist,
        filename: 'app_assets.json',
      })
    ]
  }

  return config

}
