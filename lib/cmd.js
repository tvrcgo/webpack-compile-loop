const { resolve, dirname } = require('path')
const ls = require('./ls')
const co = require('co')
const cp = require('child_process')

const CMDS = Symbol.for('cmd#commands')

class Cmd {
  constructor(opts) {
    this.$opts = opts || {}
    this.argv = require('minimist')(process.argv.slice(2))
    this[CMDS] = new Map()
    // load cmds
    const cmdsDir = resolve(dirname(require.main.filename), '../command')
    this.load(cmdsDir)
  }

  // run cmd
  run(cmd) {
    cmd = cmd || this.argv._[0]
    const entry = this[CMDS].get(cmd)
    if (!entry) {
      return console.error(`'${cmd}' unknown command.`)
    }
    const self = this
    const argv = this.argv
    return co(function* () {
      yield entry(argv, self)
    }).catch(err => console.error(err.message))
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
  load(fullPath) {
    const cmds = ls(fullPath)
    cmds.map(file => {
      const cmd = file.replace(/\.js$/, '')
      const entry = require(resolve(fullPath, file))
      this.add(cmd, entry)
    })
    return this
  }

  fork(modulePath, args = [], opts = {}) {
    opts.stdio = opts.stdio || 'inherit'
    return new Promise((resolve, reject) => {
      const proc = cp.fork(modulePath, args, opts)
      proc.once('error', (err) => reject(err))
      proc.once('exit', (code) => {
        if (code !== 0) {
          return reject(new Error(`${modulePath} ${args.join(' ')} exit with code ${code}`))
        }
        resolve()
      })
    })
  }
}

module.exports = Cmd