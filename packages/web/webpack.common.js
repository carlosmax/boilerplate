const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: ['./src/main/index.tsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle-[fullhash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css', '.png', 'jpg', 'jpeg', 'gif'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}