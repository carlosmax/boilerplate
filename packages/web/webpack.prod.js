const path = require('path')
const DotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {
  outputConfig,
  copyPluginPatterns,
  entryConfig,
  scssConfig,
  terserPluginConfig,
  externals
} = require('./env.config')

module.exports = (env, options) => {
  return {
    mode: 'production',
    entry: entryConfig,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: ['/node_modules/', '/cypress', '/**/*.spec.ts']
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']]
                }
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(ico|png|jpeg|jpg|gif|svg)$/i,
          type: 'asset/resource',
          parser: {
            dataUrlCondition: {
              maxSize: 8192
            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    output: {
      filename: 'js/[name]-[fullhash].js',
      path: path.resolve(__dirname, outputConfig.destPath),
      sourceMapFilename: 'js/[name].[fullhash].map',
      chunkFilename: 'js/[id]-[chunkhash].js',
      publicPath: ''
    },
    optimization: {
      minimizer: [new TerserPlugin(terserPluginConfig)],
      splitChunks: {
        chunks: 'all'
      }
    },
    // externals: {
    //   react: 'React',
    //   axios: 'axios',
    //   recoil: 'Recoil',
    //   'react-dom': 'ReactDOM',
    //   'react-router-dom': 'ReactRouterDOM'
    // },
    plugins: [
      new WebpackBar(),
      new DotEnv({
        path: './.env.prod'
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin(copyPluginPatterns),
      new MiniCssExtractPlugin({ filename: scssConfig.destFileName }),
      new HtmlWebpackPlugin({
        template: './public/template.prod.html',
        inject: 'body',
        minify: false
      })
      // new HtmlWebpackExternalsPlugin({
      //   externals: externals,
      // })
    ]
  }
}
