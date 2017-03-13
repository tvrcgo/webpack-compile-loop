const { join } = require('path')
const { loaders, plugins } = require('./webpack')
const ls = require('../lib/ls')
const root = process.cwd()
const entryRoot = join(root, 'front/view')

class Manager {

  constructor(cmd, argv) {

    if (cmd === 'lib') {
      this.config = require('./lib')
      return
    }

    this.config = require('./base')

    // entry
    const entries = ls(entryRoot)
    entries.map(name => {
      const entrypoint = join(entryRoot, name)
      this.config.entry[name] = [].concat(entrypoint)
    })
    if (!Object.keys(entries).length) {
      console.error(entryRoot, 'No entry founded.')
      process.exit(1)
    }

    // compiler: typescript or babel
    if (['ts', 'typescript'].includes(argv.compiler)) {
      this.loader(loaders.typescript)
    } else {
      this.loader(loaders.babel)
    }
  }

  plugin(plugins) {
    if (!this.config.plugins) {
      this.config.plugins = []
    }
    this.config.plugins = this.config.plugins.concat(plugins)
    return this
  }

  loader(loaders) {
    if (!this.config.module) {
      this.config.module = {}
    }
    if (!this.config.module.loaders) {
      this.config.module.loaders = []
    }
    this.config.module.loaders = this.config.module.loaders.concat(loaders)
    return this
  }
}

module.exports = {
  Manager,
  plugins,
  loaders
}