var path = require('path');
var webpack = require('webpack');
var webpackBaseConfig = require('./build/webpack.base.config.js');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: {
    'index': './src/index/index.js',
    'page-a': './src/page-a/page-a.js',
    'page-b': './src/page-b/page-b.js',
    'page-c': './src/page-c/page-c.js'
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
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    new ExtractTextPlugin({
      filename: '[name]/[name].[[contenthash]].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      chunks: Object.keys
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true
    // })
  ]
};

Object.keys(webpackConfig.entry).forEach(function (key) {
  var tpl;
  if (key === 'index') {
    tpl = path.resolve('./src', key + '.html');
  } else {
    tpl = path.resolve('./src', key + '/' + key + '.html')
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: key + '.html',
    template: tpl,
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
    chunks: ['manifest', 'commons', 'app', key]
  }))
});

module.exports = webpackMerge(webpackBaseConfig, webpackConfig);
