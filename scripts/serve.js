const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

process.env.MODE = 'development';

const webpackConf = require('../webpack.conf/dev.js');

const options = {
  hot: true,
  host: '0.0.0.0',
  stats: 'errors-only',
  overlay: true,
};

const compiler = webpack(webpackConf);
const server = new WebpackDevServer(compiler, options);

server.listen(1024, 'localhost', () => {
  console.log('dev server listening on port 1024');
});
