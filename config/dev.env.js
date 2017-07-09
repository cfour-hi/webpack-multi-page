var webpackMerge = require('webpack-merge')
var prodEnv = require('./prod.env.js')

module.exports = webpackMerge(prodEnv, {
  NODE_ENV: '"development"'
})
