'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  GOOGLE_API_KEY: `"${process.env.GOOGLE_API_KEY}"`,
})
