#!/usr/bin/env node

const webpack = require('webpack')
const argv = require('minimist')(process.argv.slice(2))

const cmd = argv._[0]

if (!['lib', 'dev', 'prod'].includes(cmd)) {
  console.warn(cmd, ': command not support.')
} else {

  const config = require(`../config`)
  const compiler = webpack(config(argv))

  compiler.plugin("compile", (params) => {
    console.log('Start compilation ...')
  })

  const handler = (err, stats) => {
    const json = stats.toJson()
    if (err || stats.hasErrors()) {
      return json.errors.map(e => {
        console.error(e)
      })
    }
    if (stats.hasWarnings()) {
      return json.warnings.map(warn => {
        console.warn(warn)
      })
    }
    console.log(stats.toString({
      chunks: false,
      colors: true
    }))
  }

  switch (cmd) {
    case 'dev':
      compiler.watch({
        poll: true
      }, handler)
      break
    case 'lib':
    case 'prod':
      compiler.run(handler)
      break
    default:
      console.warn(cmd, ': command not support.')
      break
  }
}


