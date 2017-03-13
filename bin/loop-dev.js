#!/usr/bin/env node

const compile = require('../lib/compile')
const { Manager, plugins } = require('../config')

module.exports = (cmd, argv) => {

  const man = new Manager(cmd, argv)

  // bundle file name
  man.config.output.filename = 'bundle/[name].js'

  // plugins
  man.plugin([
    plugins.ExtractCSS('[name].css')
  ])

  // compile
  compile(man.config).watch({
    poll: true
  })

}
