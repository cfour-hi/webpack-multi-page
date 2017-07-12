var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config/index.js');

var entrys = {};
config.entrys.forEach(function (entry) {
  entrys[entry.entryName] = entry.entry;
});

var inProduction = process.env.NODE_ENV === 'production';

var webpackConfig = {
  entry: entrys,
  output: {
    filename: inProduction ? '[name].[chunkhash:9].js' : '[name].js',
    path: config.assetsRoot,
    publicPath: inProduction ? config.build.publicPath : config.dev.publicPath
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      app: path.resolve(__dirname, 'src/lib/app/')
    }
  },
  module: {
    // 忽略大型的 library 可以提高构建性能
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'underscore-template-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: inProduction,
                importLoaders: 1
              },
            },
            'postcss-loader'
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:9].[ext]',
              publicPath: inProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:9].[ext]',
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': inProduction ? config.build.env : config.dev.env
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: inProduction ? '[name].[contenthash:9].css' : '[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 3,
      filename: inProduction ? '[name].[chunkhash:9].js' : '[name].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: inProduction ? '[name].[chunkhash:9].js' : '[name].js'
    })
  ],
  devtool: inProduction ? 'source-map' : 'cheap-module-eval-source-map'
};

config.entrys.forEach(function (entry) {
  var options = {
    filename: entry.filename,
    template: entry.template,
    inject: true,
    chunks: ['manifest', 'commons', entry.entryName],
    env: inProduction ? JSON.parse(config.build.env.NODE_ENV) : JSON.parse(config.dev.env.NODE_ENV)
  };

  if (inProduction) {
    options.minify = {
      removeComments: true,
      collapseWhitespace: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    };
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(options))
});

if (inProduction) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }));

  webpackConfig.externals = {
    jquery: 'jQuery',
    lodash: '_'
  }
}

module.exports = webpackConfig;
