module.exports = {
  mode: 'development',
  entry: './es6.js', // 入口文件路径
  output: {
    filename: "./main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // babel 转换为兼容性的 js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
            // plugins: [
            //   [
            //     "component",
            //     {
            //       "libraryName": "element-ui",
            //       "styleLibraryName": "theme-chalk"
            //     }
            //   ]
            // ]
          }
        }
      }
    ]
  }
}