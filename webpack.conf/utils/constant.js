const path = require('path');

module.exports = {
  assetsRoot: path.resolve(process.cwd(), 'dist'),
  assetsSubDirectory: 'assets',
  assetsPublicPath: process.env.MODE === 'production' ? /* CDN */ '/' : '/',
};
