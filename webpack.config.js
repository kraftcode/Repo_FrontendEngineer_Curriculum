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
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    //
    // Entries have to resolve to files! It relies on Node.js
    // convention by default so if a directory contains *index.js*,
    // it will resolve to that.
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
      }),
    ],
  },
]);

module.exports = function(env) {
  if (env === 'production') {
    //Placeholde. Could do stuff here exclusive to production mode
    console.log('LOG: env param was: ' + env);
  }

  return merge([
    common,
    {
      plugins: [
        new webpack.NamedModulesPlugin(),
      ],
    },
    parts.cleanWebpackBuild(),
    parts.generateSourcemaps('eval-source-map'),
    parts.loadCSS(),
    parts.urlLoader(),
    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: process.env.PORT,
    }),
    parts.lintJavaScript({
      paths: PATHS.app,
      options: {
        // Emit warnings over errors to avoid crashing
        // HMR on error.
        emitWarning: true,
      },
    }),
    parts.minifyJavaScript({ useSourceMap: true }),
  ]);
};
