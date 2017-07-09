var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config/index.js');

var entrys = {};
config.entrys.forEach(function (entry) {
  entrys[entry.entryName] = entry.entry;
});

var webpackConfig = {
  entry: entrys,
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src/'),
      app: path.resolve(__dirname, '../src/lib/app/')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              },
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              outputPath: path.join(config.assetsSubDirectory, 'res')
            }
          }
        ]
      }
    ],
  }
};

module.exports = webpackConfig;
