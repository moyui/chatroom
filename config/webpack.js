const path = require('path');
const options = require('../utils/commandOptions');

module.exports = {
    build: {
        env: {
            NODE_ENV: 'production',
        },
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/avalon'),
        assetsSubDirectory: options.subDirectory || '.',
        assetsPulicPath: options.publicPath || '/',
    },
    dev: {
        env: {
            NODE_ENV: 'development',
        },
        host: 'localhost',
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPulicPath: '/',
    }
}