var webpackConfig = process.env.NODE_ENV === 'production'
  ? require('./build/webpack.prod.config.js')
  : require('./build/webpack.dev.config.js')

module.exports = webpackConfig
