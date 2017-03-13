#!/usr/bin/env node

const compile = require('../lib/compile')
const { Manager, plugins } = require('../config')

module.exports = (cmd, argv) => {

  const man = new Manager(cmd, argv)

  // bundle file name
  man.config.output.filename = 'bundle/[name].[hash:8].js'

  // plugins
  man.plugin([
    plugins.DefineProdEnv,
    plugins.ExtractCSS('[name].[hash:8].css'),
    plugins.UglifyJS,
  ])

  // compile
  compile(man.config).run()
}
