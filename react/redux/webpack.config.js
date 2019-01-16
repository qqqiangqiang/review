const path = require('path');
module.exports = {
  entry: './src/counter/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './src/counter')
  },
  resolve: {
    extensions: ['.js'],
    alias: {}
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [path.resolve(__dirname, './src')],
        exclude: [path.resolve(__dirname, './node_modules')],
        loaders: 'babel-loader',
        options: {
          presets: ['env', 'stage-0', 'react']
        }
      }
    ]
  },
  watch: true
}