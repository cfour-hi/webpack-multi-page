require('app/app.css');
require('./index.css');

var $ = require('jquery');
var app = require('../lib/app/app.js');

app('home');

var banner = new Image();
banner.src = require('app/res/webpack.png');
document.body.appendChild(banner)

$('nav').css('background-color', '#0096ff');
