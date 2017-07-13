require('app/app.css');
require('./index.css');

var _ = require('lodash');
var app = require('../lib/app/app.js');

app('home');

var banner = new Image();
banner.src = require('app/img/webpack.png');
document.body.appendChild(banner)

$('nav').css('background-color', '#0096ff');

const consoleInfo = (info) => {
  console.info(info);
};

consoleInfo('home')
