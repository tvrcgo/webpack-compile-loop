#!/usr/bin/env node

const emoji = require('node-emoji')
const chalk = require('chalk')
const webpack = require('webpack')
const argv = require('minimist')(process.argv.slice(2))

const cmd = argv._[0]

if (!['lib', 'dev', 'prod'].includes(cmd)) {
  console.warn(emoji.get('x'), cmd, ': command not support.')
} else {

  const config = require(`../config`)
  const compiler = webpack(config(argv))

  compiler.plugin("compile", (params) => {
    process.stdout.write(emoji.emojify('\n:airplane: '))
  })

  compiler.plugin("compilation", (compilation) => {
    let tm

    compilation.plugin('build-module', (module) => {
      tm = +new Date()
    })

    compilation.plugin('succeed-module', (module) => {
      const cost = +new Date() - tm
      const dot = cost < 1000 ? chalk.green('.') : ( cost < 3000 ? chalk.yellow('.') : chalk.magenta('.'))
      process.stdout.write(dot)
    })

    compilation.plugin('failed-module', (module) => {
      process.stdout.write(chalk.red('.'))
    })
  })

  compiler.plugin('done', (stats) => {
    process.stdout.write(emoji.emojify(' :ok_hand:\n\n'))
  })

  const handler = (err, stats) => {
    const json = stats.toJson()
    if (err || stats.hasErrors()) {
      return json.errors.map(e => {
        console.error(emoji.get('x'), e)
      })
    }
    if (stats.hasWarnings()) {
      return json.warnings.map(warn => {
        console.warn(emoji.get('warning'), warn)
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
      console.warn(emoji.get('x'), cmd, ': command not support.')
      break
  }
}


