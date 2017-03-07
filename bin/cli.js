#!/usr/bin/env node

const webpack = require('webpack')
const argv = require('minimist')(process.argv.slice(2))
const env = argv._[0]

const config = require(`../config/${env}`)
const compiler = webpack(config)

compiler.run((err, stats) => {
  // if (err || stats.hasErrors) {
  //   console.error(err)
  // }

  console.log(stats.toString({ color: 'green' }))
})