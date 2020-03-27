const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle2.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader',
        options: {}
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1024 * 8,
        name: 'static/images/[name].[ext]?[hash:10]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1024 * 8,
        name: 'static/fonts/[name].[ext]?[hash:10]'
      }
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }, {
      test: /\.js$/,
      // exclude: path.resolve(__dirname, 'utils.js'),
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            [
              "component",
              {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
              }
            ]
          ]
        }
      }
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}