if (process.env.NODE_ENV === 'development') {
  require('font-awesome/css/font-awesome.css')
}

require('app/css/app.css')
require('./index.css')

var app = require('app/js/app.js')

app('home')

var banner = new Image()
banner.src = require('app/img/webpack.png')
document.body.appendChild(banner)

$('nav').css('background-color', '#0096ff')

const consoleInfo = (info) => {
  console.info(info)
}

consoleInfo('home')
