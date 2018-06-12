const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    output: {
        filename: '[name].js'
    },
    resolve: {
        extension: ['.js', '.jsx', '.json'],
        alias: {
            utils: resolve('utils'),
            root: resolve(''),
            '@': resolve('client'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [resolve('client')],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader'
            }
        ]
    }
}