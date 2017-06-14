const { resolve } = require('path')
const ls = require('./ls')

const CMDS = Symbol.for('cmd#commands')

class Cmd {
  constructor(opts) {
    this.$opts = opts || {}
    this.argv = require('minimist')(process.argv.slice(2))
    this[CMDS] = new Map()
    // load cmds
    this.load()
  }

  // run cmd
  run() {
    const cmd = this.argv._[0]
    const entry = this[CMDS].get(cmd)
    if (!entry) {
      return console.error(`loop: '${cmd}' unknown command.`)
    }
    return entry.call(this, this.argv)
  }

  // add sub cmd
  add(cmd, entry) {
    this[CMDS].set(cmd, entry)
    return this
  }

  // cmd alias
  alias(alias, name) {
    this[CMDS].set(alias, this[CMDS].get(name))
    return this
  }

  // load cmds
  load(fullPath = resolve(__dirname, '../command')) {
    const cmds = ls(fullPath)
    cmds.map(file => {
      const cmd = file.replace(/\.js$/, '')
      const entry = require(resolve(fullPath, file))
      this.add(cmd, entry)
    })
    return this
  }
}

module.exports = Cmd