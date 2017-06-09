
const { plugins } = require('./webpack')
const { join } = require('path')
const root = process.cwd()

module.exports = (argv) => {

  // library list
  const lib = argv.lib || [ 'react', 'react-dom', 'react-router', 'mobx', 'mobx-react' ]

  return {
    entry: {
      lib
    },
    output: {
      path: join(root, 'app/public'),
      filename: 'bundle/[name].[hash:8].js',
      library: '[name]_[hash]',
    },
    resolve: {
      modules: [
        join(__dirname, '../node_modules')
      ]
    },
    plugins: [
      plugins.DefineProdEnv,
      plugins.Dll,
      plugins.UglifyJS,
      plugins.Assets('lib_assets.json')
    ]
  }
}
