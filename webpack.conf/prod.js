const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConf = require('./base.js');
const constant = require('./utils/constant');

const webpackConfig = {
  output: {
    filename: `${constant.assetsSubDirectory}/js/[name].[chunkhash:9].js`,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${constant.assetsSubDirectory}/css/[name].[chunkhash:9].css`,
    }),

    new OptimizeCssAssetsPlugin(),
  ],
};

module.exports = merge(webpackBaseConf, webpackConfig);
