const Dotenv = require('dotenv-webpack');

module.exports = {
    devServer: {
        port: 8080
    },
    configureWebpack: {
        plugins: [
            new Dotenv()
        ]
    }
} 