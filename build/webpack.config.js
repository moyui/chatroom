const path = require('path');
const utils = require('./utils');
const config = require('../config/webpack');
const entrys = require('../config/entrys');

const entry = {};

entrys.map((item) => {
    entry[item.entry.key] = item.entry.file;
});

const resolve = (dir) => {
    return path.join(__dirname, dir);
}

module.exports = {
   entry,
   output: {
       path: config.build.assetsRoot,
       filename: '[name].js',
       publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPulicPath
        : config.dev.assetsPulicPath
   },
   resolve: {
       extensions: ['.js', '.jsx', '.json'],
       alias: {
           '@': resolve('src'),
           root: resolve(''),
           utils: resolve('utils'),
       },
   },
   module: {
       rules: [
           {
               test: /\.jsx?$/,
               loader: 'babel-loader',
               include: [resolve('src')],
               exclude: /node_modules/,
           },
           {
               test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
               loader: 'url-loader',
               query: {
                   limit: 4000,
                   name: utils.assetsPath('img/[name].[hash:8].[ext]'),
               },
           },
           {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: utils.assetsPath('fonts/[name].[hash:8].[ext]'),
                },
            },
            {
                
            }
       ]
   }

}