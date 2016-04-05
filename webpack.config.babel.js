"use strict";

import path from 'path';
import Clean from 'clean-webpack-plugin';

module.exports = { //插件项  
    resolve: {
        alias: {

        },
        root: path.join(__dirname),
        extensions: ['', '.js', '.vue'],
    },
    entry: {
        vendor: [],
        index : './src/index.js'
    }, //入口文件输出配置
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: { //加载器配置  
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                },exclude: /(node_modules|bower_components)/
            }, 
            { test: /\.vue$/,loader: 'vue'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
            { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  loader: "file-loader" },
            { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new Clean(['dist'])
    ],
    devtool:'#source-map'
};

