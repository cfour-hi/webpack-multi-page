var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config/index.js');

var webpackConfig = {
  // https://doc.webpack-china.org/configuration/output/
  output: {
    filename: config.assetsSubDirectory + '/js/[name].[chunkhash:9].js',
    path: config.assetsRoot,
    publicPath: config.build.assetsPublicPath
  },
  plugins: [
    // https://doc.webpack-china.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    // https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
    new ExtractTextPlugin({
      filename: config.assetsSubDirectory + '/css/[name].[contenthash:9].css',
      allChunks: true
    }),
    // https://doc.webpack-china.org/plugins/commons-chunk-plugin/
    new webpack.optimize.CommonsChunkPlugin({
      names: config.commonsChunkName,
      filename: config.assetsSubDirectory + '/js/[name].[chunkhash:9].js',
      minChunks: 3
    })
  ],
  // https://doc.webpack-china.org/configuration/devtool/
  devtool: 'source-map',
  // https://doc.webpack-china.org/configuration/externals/
  externals: {
    jquery: 'jQuery'
  }
};

if (process.env.NODE_ENV === 'production') {
  // https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }))
}

module.exports = webpackMerge(webpackBaseConfig, webpackConfig);
