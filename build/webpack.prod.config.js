var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
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
      name: 'commons',
      filename: config.assetsSubDirectory +'js/[name].[chunkhash:9].js',
      minChunks: 3
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: config.assetsSubDirectory +'js/[name].[chunkhash:9].js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ],
  devtool: 'source-map',
  externals: {
    jquery: 'jQuery',
    lodash: '_'
  }
};

config.entrys.forEach(function (entry) {
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: entry.filename,
    template: entry.template,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    chunks: ['manifest', 'commons', entry.entryName],
    env: JSON.parse(config.build.env.NODE_ENV)
  }))
});

module.exports = webpackMerge(webpackBaseConfig, webpackConfig);
