const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const merge = require('webpack-merge')

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin()
]

const devServer = {
  port: 8080,
  overlay: {
    errors: true
  },
  open: true,
  hot: true
}

let config

// 开发环境配置
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap=module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
