const { VueLoaderPlugin } = require('vue-loader');

//in package.json
//"serve": "webpack --config webpack/dev.config.js"

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'webpack.bundle.js'
  },
  module: {
    rules: [{
        test: /\.vue/,
        loader: 'vue-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}