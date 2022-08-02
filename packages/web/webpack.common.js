const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'development',
  entry: {
    main: ['./src/main/index.tsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name]-bundle-[fullhash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}