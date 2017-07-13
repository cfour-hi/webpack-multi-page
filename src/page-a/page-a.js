require('app/app.css')
require('./page-a.css')

var _ = require('lodash');

var app = require('../lib/app/app.js')

app('page-a')

$('h1').css('background-color', '#0096ff');
