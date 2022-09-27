const path = require('path');

const outputConfig = {
    destPath: "./dist"
};

// Entry points
// https://webpack.js.org/concepts/entry-points/ 
const entryConfig = [
    "./src/main/index.tsx",
    "./src/presentation/assets/scss/themes.scss",
];


// Copy files from src to dist
// https://webpack.js.org/plugins/copy-webpack-plugin/
const copyPluginPatterns = {
    patterns: [
        { from: "./src/presentation/assets/images", to: "images" },
        { from: "./src/presentation/assets/fonts", to: "fonts" },
        {
          from: "public",
          to: "./",
          globOptions: {
            ignore: ["**/template.dev.html", "**/template.prod.html"],
          },
        }
    ]
};

// Dev server setup
// https://webpack.js.org/configuration/dev-server/
const devServer = {
    static: {
        directory: path.join(__dirname, outputConfig.destPath),
    },
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    // https: true,
    port: "3000",
    // host: "0.0.0.0",
    // disableHostCheck: true
};


// SCSS compile
const scssConfig = {
    destFileName: "css/[name].min.css"
};


// Production terser config options
// https://webpack.js.org/plugins/terser-webpack-plugin/#terseroptions
const terserPluginConfig = {
    extractComments: false,
    terserOptions: {
        compress: {
            drop_console: true,
        },
    }
};

const externals = [
    {
        "module": "react",
        "entry": {
            path: "https://unpkg.com/react@18.2.0/umd/react.production.min.js",
            attributes: {
                crossorigin: 'anonymous'
            }
        },
        "global": "React"
    },
    {
        "module": "react-dom",
        "entry": {
            path: "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js",
            attributes: {
                crossorigin: 'anonymous'
            }
        },
        "global": "ReactDOM"
    },
    {
        "module": "history",
        "entry": {
            path: "https://unpkg.com/history@5/umd/history.production.min.js",
            attributes: {
                crossorigin: 'anonymous'
            }
        },
        "global": "history"
    },
    {
        "module": "react-router",
        "entry": {
            path: "https://unpkg.com/react-router@6.3.0/react-router.production.min.js",
            attributes: {
                crossorigin: 'anonymous'
            }
        },
        "global": "ReactRouter"
    },
    {
        "module": "react-router-dom",
        "entry": {
            path: "https://unpkg.com/react-router-dom@6.3.0/react-router-dom.production.min.js",
            attributes: {
                crossorigin: 'anonymous'
            }
        },
        "global": "ReactRouterDOM"
    },
    {
        "module": "axios",
        "entry": {
            path: "https://unpkg.com/axios/dist/axios.min.js",
            attributes: {
                crossorigin: 'anonymous'
            }
        },
        "global": "axios"
    },
    {
        "module": "recoil",
        "entry": {
            path: "https://unpkg.com/recoil@0.0.13/umd/recoil.min.js",
            attributes: {
                crossorigin: 'anonymous'
            }
        },
        "global": "Recoil"
    },
    {
        "module": "bootstrap",
        "entry": {
            path: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
            attributes: {
                integrity: 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM',
                crossorigin: 'anonymous'
            }
        }
    }
];

module.exports.copyPluginPatterns = copyPluginPatterns;
module.exports.entryConfig = entryConfig;
module.exports.scssConfig = scssConfig;
module.exports.devServer = devServer;
module.exports.terserPluginConfig = terserPluginConfig;
module.exports.outputConfig = outputConfig;
module.exports.externals = externals;