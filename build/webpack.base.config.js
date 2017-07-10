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
    // 忽略大型的 library 可以提高构建性能
    noParse: /jquery/,
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
                minimize: process.env.NODE_ENV === 'production',
                importLoaders: 1
              },
            },
            'postcss-loader'
          ]
        }),
        include: [path.join(__dirname, '../src')]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              // path.join 在 win 环境下路径分隔符为 "\"
              // css bankground-image url 路径使用 "\" 分隔符会有问题
              // path.join(config.assetsSubDirectory, 'res/') => "assets\res\"
              // path.posix.join(config.assetsSubDirectory, 'res/') => "assets/res/"
              outputPath: path.posix.join(config.assetsSubDirectory, 'res/'),
              publicPath: process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
            }
          }
        ]
      }
    ],
  }
};

module.exports = webpackConfig;
