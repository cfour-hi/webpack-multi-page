require('../lib/app/app.css')
var app = require('../lib/app/app.js')
var webpackPng = require('../lib/app/res/webpack.png')

app('home')

var banner = new Image();
banner.src = webpackPng;

document.body.appendChild(banner)
