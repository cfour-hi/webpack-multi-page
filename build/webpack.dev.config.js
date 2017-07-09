var path = require('path');
var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var webpackBaseConfig = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
      name: 'commons',
      filename: path.join(config.assetsSubDirectory, 'js/[name].js'),
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: path.join(config.assetsSubDirectory, 'js/[name].js')
    })
  ]
};

config.entrys.forEach(function (entry) {
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: entry.filename,
    template: entry.template,
    inject: true,
    chunks: ['manifest', 'commons', entry.entryName],
    env: JSON.parse(config.dev.env.NODE_ENV)
  }))
});

module.exports = webpackMerge(webpackBaseConfig, webpackConfig);
