var webpackConfig = process.env.NODE_ENV === 'development'
  ? require('./build/webpack.dev.config.js')
  : require('./build/webpack.prod.config.js')

module.exports = webpackConfig
