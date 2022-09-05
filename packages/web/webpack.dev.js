const path = require('path');
const DotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { outputConfig, copyPluginPatterns, entryConfig, devServer } = require("./env.config");

module.exports = (env, options) => 
{
    return {
        mode: "development",
        entry: entryConfig,
        devServer,
        // Dev only
        // Target must be set to web for hmr to work with .browserlist
        // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
        target: "web",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: [
                      '/node_modules/',
                      '/cypress',
                      '/**/*.spec.ts'
                  ],
                }, {
                  test: /\.css$/,
                  use: [
                      // We're in dev and want HMR, SCSS is handled in JS
                      // In production, we want our css as files
                      "style-loader",
                      "css-loader",
                      {
                          loader: "postcss-loader",
                          options: {
                              postcssOptions: {
                                  plugins: [
                                      ["postcss-preset-env"],
                                  ],
                              },
                          },
                      }
                  ],
              }, {
                    test: /\.scss$/,
                    use: [
                        // We're in dev and want HMR, SCSS is handled in JS
                        // In production, we want our css as files
                        "style-loader",
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        ["postcss-preset-env"],
                                    ],
                                },
                            },
                        },
                        "sass-loader"
                    ],
                },
                {
                  test: /\.(ico|png|jpeg|jpg|gif|svg)$/i,
                  type: "asset/resource",
                  parser: {
                    dataUrlCondition: {
                      maxSize: 8192
                    }
                  }
                },
                {
                  test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                  type: "asset/resource"
                }
            ],
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.scss'],
          alias: {
            '@': path.join(__dirname, 'src')
          }
        },
        output: {
            filename: "./js/[name].bundle.js",
            path: path.resolve(__dirname, outputConfig.destPath),
            publicPath: "/",
        },
        plugins: [
            new DotEnv({
                path: './.env.dev'
            }),
            new HtmlWebpackPlugin({
                template: './public/template.dev.html',
                inject: true,
                minify: false
            }),
            new CopyPlugin(copyPluginPatterns),
        ]
    };
};