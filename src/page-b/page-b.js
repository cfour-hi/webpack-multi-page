require('app/app.css')
require('./page-b.css')

var $ = require('jquery');

var app = require('../lib/app/app.js')

app('page-b')

$('h1').css('background-color', '#0096ff');
