#!/usr/bin/env node

const chalk = require('chalk')
const compile = require('../lib/compile')
const config = require('../config/dll')

module.exports = (cmd, argv) => {

  console.log(chalk.cyan('Loop dll library'))

  compile(config(argv)).run()
}
