var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config/index.js');

var webpackConfig = {
  output: {
    filename: '[name].[chunkhash:9].js',
    path: config.assetsRoot,
    publicPath: config.build.publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:9].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: config.commonsChunkName,
      filename: config.assetsSubDirectory + '/js/[name].[chunkhash:9].js',
      minChunks: 3
    })
  ],
  devtool: 'source-map',
  externals: {
    jquery: 'jQuery',
    lodash: '_'
  }
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }))
}

module.exports = webpackMerge(webpackBaseConfig, webpackConfig);
