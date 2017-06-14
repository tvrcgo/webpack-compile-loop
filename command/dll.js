const chalk = require('chalk')
const compile = require('../lib/compile')
const config = require('../config/web-dll')

module.exports = argv => {

  console.log(chalk.cyan('Loop dll library'))
  compile(config(argv)).run()

}
