// 引入 path 方法，以处理绝对路径。path 是 node.js 中的基本包，用来处理路径
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
// 将非 js 代码 单独打包为一个文件
const ExtractPlugin = require('extract-text-webpack-plugin')

// 判断编译环境
// 启动脚本时，package.json 中设置的环境变量都存在于 process.env 对象中
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 入口
  // 入口文件是 .js 文件，不是 .vue 文件
  target: 'web', // webpack 编译目标
  entry: path.join(__dirname, 'src/index.js'), // path.join 拼接路径，__dirname 当前路径
  // 输出
  output: {
    // filename 正式环境和开发环境是不一样的，开发环境使用 hash，正式环境使用 chunkhash 重新命名。在开发环境使用 chunkhash 会报错。
    filename: 'bundle.[hash:8].js', // 输出文件名
    path: path.join(__dirname, 'dist'), // 输出路径
  },
  module: {
    // 配置解析各类文件的 loader
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          { // 写在对象中，可以配置 loader
            // url-loader 依赖于 file-loader，所以安装的时候也要安装 file-loader
            loader: 'url-loader',
            options: {
              limit: 1024, // 图片小于1024，转为base64代码
              name: '[name].[ext]' // 输出文件名，[原名].[原图片格式]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push(
    // 开发环境下的打包方式
    {
      test: /\.styl/,
      use: [
        // style-loader 是将 css-loader 处理出来的 css 内容加了一层 js 代码，这段 js 代码将 css 写入到 html 的 style 中。
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true // stylus-loader 会生成 sourceMap，postcss-loader 也会生成 sourceMap，这里设置 sourceMap = true 可以使用前面的 sourceMap，不用重新生成，增加编译速度
          }
        },
        'stylus-loader',
      ]
    },
  )
  config.devtool = '#cheap=module-eval-source-map'
  config.devServer = {
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
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 启动 webpack 的 HotModuleReplacement 功能
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    // 将类库文件 vue 单独打包，缓存到本地减少加载，优化用户体验
    vendor: ['vue']
  }
  // hash 与 chunkhash 的区别
  // hash 是整个应用的 hash
  // chunkhash 使用 chunkhash 会为每个 chunk 单独使用一个哈希，会有不同的哈希值，一但使用不同的 entry 或使用 vendor 对不同的类库文件打包时，必须使用 chunkhash，不然没有单独打包的意义（使用 hash 时，每次打包都会变，即 vendor 也会变，这样就没有缓存的意义了）
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract(
        {
          fallback: 'style-loader',
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
  )
  config.plugins.push(
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
  )
}

module.exports = config