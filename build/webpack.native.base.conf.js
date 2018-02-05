var webpack = require('webpack');
var path = require('path');
var config = require('../config')
var utils = require('./utils')

var config = {
  entry: {
    'index': './src/platforms/native/native.entry.js?entry=true'
  },
  output: {
    path: config.nativeBuild.assetsRoot,
  },
  resolve: utils.resolver(),
  module: {
    rules: [{
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-path-loader',
          query: {
            target: 'native'
          }
        }, {
          loader: 'weex-loader',
        }]
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules(?!(\/|\\).*(weex).*)/
      }
    ]
  }
};

module.exports = config;