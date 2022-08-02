const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports =  merge (common, {
  mode: 'production',  
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
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  externals: {
    react: 'React',
    axios: 'axios',
    recoil: 'Recoil',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM'
  },
  plugins: [
    new Dotenv({
      path: `./.env.prod`
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[fullhash].css',
      linkType: "text/css"
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/styles/main.min.css", to: "./css" },
      ],
    })
  ]
})