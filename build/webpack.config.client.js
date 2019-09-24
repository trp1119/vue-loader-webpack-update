// 引入 path 方法，以处理绝对路径。path 是 node.js 中的基本包，用来处理路径
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
// 将非 js 代码 单独打包为一个文件
const ExtractPlugin = require('extract-text-webpack-plugin')
// 引入公共配置
const baseConfig = require('./webpack.config.base.js')
// 合并 webpack 配置
const merge = require('webpack-merge')

// 判断编译环境
// 启动脚本时，package.json 中设置的环境变量都存在于 process.env 对象中
const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]

const devServer = {
  port: 8000, // 端口号
  // host: '0.0.0.0', // 设置为 0.0.0.0 后，可以用 localhost 和 172.0.0.1 访问，也可以用本机内网 ip 访问。如果直接设置为 localhost，用内网 ip 是无法访问的。
  overlay: { // webpack编译过程中有错误可直接在网页显示出
    errors: true,
  },
  open: true, // 启动 webpack 时自动的打开浏览器
  // historyFallback: {
  //   // 将错误地址映射到入口（或定义）地址
  // },
  hot: true, // 热加载，修改组件只重新渲染页面当前组件效果，不会重新加载网页，保证页面输入数据不丢失
}

let config

if (isDev) {
  // 开发环境配置
  config = merge(baseConfig, {
    devtool: '#cheap=module-eval-source-map',
    module: {
      // 开发环境下的打包方式
      rules: [
        {
          test: /\.styl/,
          use: [
            // style-loader 是将 css-loader 处理出来的 css 内容加了一层 js 代码，这段 js 代码将 css 写入到 html 的 style 中。
            // 'style-loader',
            // 与 style-loader 相比，vue-style-loader 可以实现 css 样式热加载
            'vue-style-loader',
            'css-loader',
            // 使用 css-loader 时，使用 cssModules 方式
            // {
            //   loader: 'css-loader',
            //   options: {
            //     module: true,
            //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            //   }
            // },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true // stylus-loader 会生成 sourceMap，postcss-loader 也会生成 sourceMap，这里设置 sourceMap = true 可以使用前面的 sourceMap，不用重新生成，增加编译速度
              }
            },
            'stylus-loader',
          ]
        },
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), // 启动 webpack 的 HotModuleReplacement 功能
      new webpack.NoEmitOnErrorsPlugin()
    ]),
  })
} else {
  //正式环境配置
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // 将类库文件 vue 单独打包，缓存到本地减少加载，优化用户体验
      vendor: ['vue']
    },
    // hash 与 chunkhash 的区别
    // hash 是整个应用的 hash
    // chunkhash 使用 chunkhash 会为每个 chunk 单独使用一个哈希，会有不同的哈希值，一但使用不同的 entry 或使用 vendor 对不同的类库文件打包时，必须使用 chunkhash，不然没有单独打包的意义（使用 hash 时，每次打包都会变，即 vendor 也会变，这样就没有缓存的意义了）
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract(
            {
              fallback: 'vue-style-loader',
              use: [
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                  }
                },
                'stylus-loader',
              ]
            }
          )
        },
      ]
    },
    plugins: defaultPlugins.concat([
      // 导出 css 文件的文件名，哈希值根据内容而定，和上面的 [hash:8] 是不一样的
      new ExtractPlugin('styles.[contentHash:8].css'),
      // 单独打包的类库文件命名
      new webpack.optimize.CommonsChunkPlugin({
        // 自定义命名
        name: 'vendor'
      }),
      // webpack 相关代码单独打包到文件中
      // vendor 一定要放在 runtime 前面
      // 作用：有新模块加入的时候，webpack 会给每个模块添加一个 id。有新模块加入的时候，插入位置可能在中间，会导致后面每一个模块的 id 都发生变化，id 变化后会导致打包出内容的 hash 发生变化，就失去使用 hash 使浏览器长存缓存的效果，使用这个方法可以规避在这个问题。
      new webpack.optimize.CommonsChunkPlugin({
        // 自定义命名，不要和前面的重复
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
