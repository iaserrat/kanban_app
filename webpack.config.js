'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
}

process.env.BABEL_ENV = TARGET;

const common = {
    entry: PATHS.app,
    resolve: {
      extensions: ['','.js','.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: 'Kanban App',
            appMountId: 'app'
        })
    ],
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
    {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: PATHS.app
    }]
    }
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
