var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.native.base.conf.js');
var merge = require('webpack-merge');

var config = require('../config');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.nativeDev.env.NODE_ENV)
}
var env = process.env.NODE_ENV;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

if (env !== 'production') {
  baseWebpackConfig.output.publicPath = config.nativeDev.assetsPublicPath;
  baseWebpackConfig.output.filename = '[name]-dev.js';
}

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'web/index.dev.html',
      inject: false
  }),
    new webpack.BannerPlugin({
      raw: true,
      banner: '// { "framework": "Vue" }\n'
    }),
    new CopyWebpackPlugin([{
      from: require.resolve('weex-vue-render/dist/index.js'),
      to: './render.js'
    }, {
      from: require.resolve('vue/dist/vue.js'),
      to: './vue.js'
    }]),
  ]
});