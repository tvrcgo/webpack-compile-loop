
const { plugins } = require('./webpack')
const { join } = require('path')
const root = process.cwd()

module.exports = {
  entry: {
    lib: [
      'react',
      'react-dom',
      'react-router',
      'mobx',
      'mobx-react'
    ],
  },
  output: {
    path: join(root, 'app/public'),
    filename: 'bundle/[name].[hash:8].js',
    library: '[name]_[hash]',
  },
  plugins: [
    plugins.DefineProdEnv,
    plugins.Dll,
    plugins.UglifyJS,
    plugins.Assets('lib_assets.json')
  ]
}
