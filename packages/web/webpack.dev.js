const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge (common, {
  mode: 'development',
  devtool: 'inline-source-map',  
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: [
        '/node_modules/',
        '/cypress',
        '/**/*.spec.ts'
      ]
    }, {
      test: /\.(css|scss)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource"
    }, {
      test: /\.(png|jpeg|jpg|gif)$/i,
      type: "asset/resource",
      parser: {
        dataUrlCondition: {
          maxSize: 8192
        }
      }
    }]
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    }
  },
  plugins: [
    new Dotenv({
      path: `./.env.dev`
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/css/main.css", to: "./css" },
        { from: "./public/images/favicon/favicon.ico", to: "./img/favicon" },
        { from: "./public/images/favicon/favicon.png", to: "./img/favicon" },
        { from: "./public/images/favicon/manifest.json", to: "./img/favicon" },
        { from: "./public/images/logo/logo192.png", to: "./img/logo" },
        { from: "./public/images/logo/logo512.png", to: "./img/logo" },
        { from: "./public/robots.txt", to: "./" },
      ],
    })
  ]
})