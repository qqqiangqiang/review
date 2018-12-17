const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const base_config = {
  entry: './src/index.js',
  output: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: path.resolve('./src'),
        exclude: /node_modules/ // 不要解析node_modules
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../example/hash'),
    host: 'localhost',
    port: 8080,
    compress: true //服务器返回给浏览器的时候是否启动gzip压缩
  },
  plugins: []
}

const everyConfig = [
  {
    output: {
      path: path.resolve(__dirname, '../example/hash'),
      filename: '[name].[hash:8].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(__dirname, '../example/hash/template.html'), // 指定产出的html模板
        filename: path.resolve(__dirname, '../example/hash/index.html'), // 产出的html文件名
        title: 'index',
        chunks: ['main'], // 在产出的html文件里引入哪些代码块
        hash: true // 会在引入的js里加入查询字符串，避免缓存
      })
    ]
  },
  {
    output: {
      path: path.resolve(__dirname, '../example/history'),
      filename: '[name].[hash:8].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(__dirname, '../example/history/template.html'), // 指定产出的html模板
        filename: path.resolve(__dirname, '../example/history/index.html'), // 产出的html文件名
        title: 'index',
        chunks: ['main'], // 在产出的html文件里引入哪些代码块
        hash: true // 会在引入的js里加入查询字符串，避免缓存
      })
    ]
  }
]

const final_config = everyConfig.map((item) => {
  return {...base_config, ...item};
})

module.exports = final_config;
