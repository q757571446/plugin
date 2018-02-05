var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.nativeDev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.native.dev.conf.js');
var port = process.env.PORT || config.nativeDev.port;
var autoOpenBrowser = !!config.nativeDev.autoOpenBrowser
var app = express();
var compiler = webpack(webpackConfig);
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
var ip = require('ip').address()
var uri = `http://${ip}:${port}?page=index-dev.js`
console.log(uri);
app.use(devMiddleware);
var staticPath = path.posix.join(config.nativeDev.assetsPublicPath, config.nativeDev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return;
  }
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})