var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config/index.js');

var webpackConfig = {
  output: {
    filename: '[name].js',
    path: config.assetsRoot,
    publicPath: config.dev.publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: config.commonsChunkName,
      filename: config.assetsSubDirectory + '/js/[name].js',
      minChunks: 3
    })
  ],
  devServer: {
    clientLogLevel: 'none',
    noInfo: true,
    overlay: true
  },
  devtool: 'cheap-module-eval-source-map'
};

module.exports = webpackMerge(webpackBaseConfig, webpackConfig);
