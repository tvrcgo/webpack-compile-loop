const chalk = require('chalk')
const compile = require('../lib/compile')
const config = require('../config/umd')

module.exports = function* (argv, cmd) {

  const name = argv.name
  if (!name) {
    console.error('Missing library name')
    process.exit(1)
  }

  console.info(chalk.cyan(`Loop UMD library: ${name}`))
  
  compile(config({ name })).watch({
    poll: true
  })
  
}
