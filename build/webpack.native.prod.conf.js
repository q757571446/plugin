var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.native.base.conf.js');
var merge = require('webpack-merge');
var config = require('../config');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// if (!process.env.NODE_ENV) {
//   process.env.NODE_ENV = JSON.parse(config.nativeBuild.env.NODE_ENV)
// }
// var env = process.env.NODE_ENV;

// if (env === 'production'){
//   baseWebpackConfig.output.filename = '[name].js';
// }
baseWebpackConfig.output.filename = '[name].js';

module.exports = merge(baseWebpackConfig,{
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env': JSON.stringify(env)
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.BannerPlugin({
     raw: true ,
     banner: '// { "framework": "Vue" }\n'
    })
  ]
});
