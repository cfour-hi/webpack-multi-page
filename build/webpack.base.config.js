var path = require('path');

var webpackConfig = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};

module.exports = webpackConfig;
