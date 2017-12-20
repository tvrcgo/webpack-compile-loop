const chalk = require('chalk')
const compile = require('../lib/compile')
const config = require('../config/web-dll')

module.exports = function* (argv, cmd) {

  compile(config(argv)).run()

}
