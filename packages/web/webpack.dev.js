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
        { from: "./public/styles/main.css", to: "./css" },
      ],
    })
  ]
})