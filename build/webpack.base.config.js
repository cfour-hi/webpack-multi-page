var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('../config/index.js');

var entrys = {};
config.entrys.forEach(function (entry) {
  entrys[entry.entryName] = entry.entry;
});

// 第三方依赖 js & css
// 必须是所有页面都使用到的第三方库
// 可配合插件 ProvidePlugin 省去依赖声明
// https://doc.webpack-china.org/plugins/commons-chunk-plugin/#-chunk
entrys.vendor = [
  'jquery',
  'normalize.css'
];

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = {
  entry: entrys,
  resolve: {
    // 快捷定位
    // var app = require('./lib/app/app.js')
    // =>
    // var app = require('app/app.js')
    // https://doc.webpack-china.org/configuration/resolve/#resolve-alias
    alias: {
      src: path.resolve(__dirname, '../src/'),
      app: path.resolve(__dirname, '../src/lib/app/')
    }
  },
  module: {
    // 忽略大型的 library 可以提高构建性能
    // 条件是 library 本身没有任何依赖
    // https://doc.webpack-china.org/configuration/module/#module-noparse
    noParse: /jquery/,
    // https://doc.webpack-china.org/guides/asset-management/
    rules: [
      {
        test: /\.html$/,
        use: {
          // https://github.com/emaphp/underscore-template-loader
          loader: 'underscore-template-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // https://github.com/webpack-contrib/style-loader
          fallback: 'style-loader',
          use: [
            {
              // https://github.com/webpack-contrib/css-loader
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: process.env.NODE_ENV === 'production',
                importLoaders: 1
              },
            },
            // https://github.com/postcss/postcss-loader
            'postcss-loader'
          ]
        })
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: {
          // https://github.com/MoOx/eslint-loader
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        include: [resolve('src')]
      },
      {
        test: /\.js$/,
        use: {
          // https://github.com/babel/babel-loader
          loader: 'babel-loader'
        },
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            // https://github.com/webpack-contrib/url-loader
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: config.assetsSubDirectory + '/img/[name].[hash:9].[ext]',
              publicPath: process.env.NODE_ENV === 'development'
                ? config.dev.assetsPublicPath
                : config.build.assetsPublicPath
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            // https://github.com/webpack-contrib/url-loader
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: config.assetsSubDirectory + '/fonts/[name].[hash:9].[ext]',
              publicPath: process.env.NODE_ENV === 'development'
                ? config.dev.assetsPublicPath
                : config.build.assetsPublicPath
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
    }),
    // 省去依赖声明
    // https://doc.webpack-china.org/plugins/provide-plugin/
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

config.entrys.forEach(function (entry) {
  // https://github.com/jantimon/html-webpack-plugin
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: entry.filename,
    template: entry.template,
    inject: true,
    minify: {
      caseSensitive: true,
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      useShortDoctype: true
    },
    chunks: ['manifest', 'vendor', 'app', entry.entryName],
    env: process.env.NODE_ENV === 'development'
      ? JSON.parse(config.dev.env.NODE_ENV)
      : JSON.parse(config.build.env.NODE_ENV)
  }))
});

module.exports = webpackConfig;
