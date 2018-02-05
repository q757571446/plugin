var path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/app/index.vue'),
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    },
    dev: {
        env: require('./dev.env'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        port: 8081,
        autoOpenBrowser: true,
        proxyTable: {},
    },
    nativeDev: {
        env: require('./dev.env'),
        port: 8089,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        autoOpenBrowser: true,
    },
    nativeBuild: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
    }
}