const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBaseConf = require('./base.js');
const constant = require('./utils/constant');

const webpackConf = {
  output: {
    filename: `${constant.assetsSubDirectory}/js/[name].js`,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${constant.assetsSubDirectory}/css/[name].css`,
    }),
  ],
};

module.exports = merge(webpackBaseConf, webpackConf);
