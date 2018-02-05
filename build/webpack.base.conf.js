var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

module.exports = {
    entry: {
        'web-bundle': './src/platforms/web/web.entry.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].web.js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: utils.resolver(),
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-path-loader',
                    query: {
                        target: 'web'
                    } 
                },{
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [utils.resolve('src'), utils.resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
}