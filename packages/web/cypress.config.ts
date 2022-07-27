import { defineConfig } from 'cypress'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: false,
    supportFile: 'cypress/support/index.js',
    video: false,
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.js']
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
              }
            ]
          }
        }
      }
      on('file:preprocessor', webpackPreprocessor(options))
    }
  }
})
