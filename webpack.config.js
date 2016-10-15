const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [path.resolve('src/index.js')],
  output: {
    path: path.resolve('www'),
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve('www'),
    port: 3000,
    hot: false,
    inline: true,
    colors: true
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders:[
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ]
  }
};
