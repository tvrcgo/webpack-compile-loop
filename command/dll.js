const chalk = require('chalk')
const compile = require('../lib/compile')
const config = require('../config/web-dll')

module.exports = function* (argv, cmd) {

  console.log(chalk.cyan('Loop dll library'))
  compile(config(argv)).run()

}
