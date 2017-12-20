
const webpack = require('webpack')
const emoji = require('node-emoji')
const chalk = require('chalk')

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
    colors: true,
    modules: false
  }))
}

module.exports = (config) => {

  const compiler = webpack(config)

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

  return {
    run() {
      return compiler.run(handler)
    },

    watch(opts) {
      return compiler.watch(opts, handler)
    }
  }

}
