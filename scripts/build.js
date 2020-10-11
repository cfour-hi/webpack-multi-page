const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');

process.env.MODE = 'production';
const webpackConf = require('../webpack.conf/prod');

function build() {
  webpack(webpackConf, (error) => {
    if (error) throw error;
    console.log('build success');
  });
}

rimraf(path.resolve(__dirname, '../dist'), (error) => {
  if (error) throw error;
  build();
});
