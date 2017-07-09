require('./page-a.css')

var $ = require('jquery');

var app = require('../lib/app/app.js')

app('page-a')

$('h1').css('background-color', '#0096ff');
