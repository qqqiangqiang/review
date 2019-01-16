const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './src'),
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '.js', '.vue', '.json', 'scss', '.ts'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=./babel_cache',
        include: [
          resolve('src'), resolve('test'), resolve('static')
        ],
        exclude: [resolve('node_modules')]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ],
  watch: true
}