module.exports = {
  loaders: {
    css: 'vue-style-loader!css-loader',
    postcss: 'vue-style-loader!css-loader',
    less: 'vue-style-loader!css-loader!less-loader',
    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
    scss: 'vue-style-loader!css-loader!sass-loader?outputStyle=expanded',
    stylus: 'vue-style-loader!css-loader!stylus-loader',
    styl: 'vue-style-loader!css-loader!stylus-loader'
  },
  postcss: [
    require('autoprefixer')
  ]
}
