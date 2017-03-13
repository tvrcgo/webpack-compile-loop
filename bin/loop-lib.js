#!/usr/bin/env node

const compile = require('../lib/compile')
const config = require('../config/lib')

module.exports = (cmd, argv) => {

  compile(config).run()
}
