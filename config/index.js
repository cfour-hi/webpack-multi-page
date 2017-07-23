var path = require('path');
var entrys = require('./entrys.js');

var dirSrc = path.resolve(__dirname, '../src');

// 单独处理项目首页
// 因为它的结构与其它页面不相同
var entrysConfig = [
  {
    entryName: 'index/index',
    entry: path.resolve(dirSrc, 'index/index.js'),
    filename: 'index.html',
    template: path.resolve(dirSrc, 'index.html')
  }
];

entrys.forEach(function (entry) {
  var filename = entry + '.html';

  entrysConfig.push({
    entryName: entry,
    entry: path.resolve(dirSrc, entry + '.js'),
    filename: filename,
    template: path.resolve(dirSrc, filename)
  });
});

module.exports = {
  entrys: entrysConfig,
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'assets',
  commonsChunkName: ['app', 'vendor', 'manifest'],
  dev: {
    env: require('./dev.env.js'),
    assetsPublicPath: '/'
  },
  build: {
    env: require('./prod.env.js'),
    assetsPublicPath: '/'
  }
}
