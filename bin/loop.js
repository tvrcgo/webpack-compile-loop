#!/usr/bin/env node

const { resolve } = require('path')
const ls = require('../lib/ls')
const argv = require('minimist')(process.argv.slice(2))
const cmd = argv._[0]

const cmds = ls(__dirname)
  .filter(name => /loop\-[a-z]+/.test(name))
  .map(name => name.substr(5).replace(/\.js$/, ''))

if (!cmds.includes(cmd)) {
  console.warn(cmd, ': command not support.')
  process.exit(1)
}

const run = resolve(__dirname, `loop-${cmd}`)

require(run)(cmd, argv)
