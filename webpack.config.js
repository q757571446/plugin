const path = require('path');
const webpack = require('webpack');
const config = require('./config')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

const weexConfig = {
    entry: {
        index: config.entry
    },
    output: {
        path: resolve('dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'environment': resolve('src/environment'),
            'common': resolve('src/app/common'),
            'modules': resolve('src/app/modules'),
            'library': resolve('src/app/library')
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules(?!(\/|\\).*(weex).*)/
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [{
                    loader: 'weex-loader'
                }]
            }
        ]
    },
    node: {
        setImmediate: false
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '// { "framework": "Vue"} \n',
            raw: true,
            exclude: 'Vue'
        })
    ]
};
module.exports = weexConfig;