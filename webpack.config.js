const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const common = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].[hash].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
        template: './config/index.ejs',
      }),
      new webpack.ProvidePlugin({
        html: ['snabbdom-jsx', 'html']
      }),
    ],
  },
  parts.loadCSS(),
  parts.loadJSXwithBabel(),
  parts.urlLoader({
    paths: PATHS,
  }),
  parts.lintJavaScript({
    paths: PATHS.app,
    options: {
      // Emit warnings over errors to avoid crashing
      // HMR on error.
      emitWarning: true,
    },
  }),
  parts.generateSourcemaps('source-map'),
]);

const development = merge([
  {
    plugins: [
      new webpack.NamedModulesPlugin(),
    ],
  },
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
]);

const production = merge([
  {},
  parts.clean(PATHS.build),
  parts.minifyJavaScript({
    useSourceMap: true
  }),

]);


module.exports = function (env) {
  if (env === 'production') {
    return merge(common, production);
  }

  return merge(common, development);
};
