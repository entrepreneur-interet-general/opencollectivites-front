const Dotenv = require('dotenv-webpack');

module.exports = {
    devServer: {
        port: 8080
    },
    configureWebpack: {
        plugins: [
            new Dotenv()
        ]
    },
    pages: {
        index: {
            entry: 'src/main.js',
            title: process.env.VUE_APP_TITLE
        }
    }
} 