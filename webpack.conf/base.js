const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryConf = require('./utils/entry.conf');
const constant = require('./utils/constant');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

const entries = {};
entryConf.forEach((entry) => {
  entries[entry.entryName] = entry.entry;
});

const webpackConfig = {
  mode: process.env.MODE,

  entry: entries,

  output: {
    path: constant.assetsRoot,
    publicPath: constant.assetsPublicPath,
  },

  resolve: {
    alias: {
      lib: resolve('lib'),
    },
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'underscore-template-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: [resolve('pages'), resolve('lib')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: `${constant.assetsSubDirectory}/img/[name].[hash:9].[ext]`,
              publicPath: constant.assetsPublicPath,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: `${constant.assetsSubDirectory}/font/[name].[hash:9].[ext]`,
              publicPath: constant.assetsPublicPath,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -10,
        },

        common: {
          test: /[\\/]lib[\\/]/,
          name: 'common',
          chunks: 'all',
          priority: -20,
        },
      },
    },
  },
};

entryConf.forEach((entry) => {
  const options = {
    filename: entry.filename,
    template: entry.template,
    chunks: ['vendor', 'common', entry.entryName],
  };

  webpackConfig.plugins.push(new HtmlWebpackPlugin(options));
});

module.exports = webpackConfig;
