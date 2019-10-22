// 放置所有 webpack 配置中共同用到的配置

// 引入 path 方法，以处理绝对路径。path 是 node.js 中的基本包，用来处理路径
const path = require('path')
// 引入 vue-loader 配置
const createVueLoaderOptions = require('./vue-loader.config.js')

// 判断编译环境
// 启动脚本时，package.json 中设置的环境变量都存在于 process.env 对象中
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 入口
  // 入口文件是 .js 文件，不是 .vue 文件
  target: 'web', // webpack 编译目标
  entry: path.join(__dirname, '../client/index.js'), // path.join 拼接路径，__dirname 当前路径
  // 输出
  output: {
    // filename 正式环境和开发环境是不一样的，开发环境使用 hash，正式环境使用 chunkhash 重新命名。在开发环境使用 chunkhash 会报错。
    filename: 'bundle.[hash:8].js', // 输出文件名
    path: path.join(__dirname, '../dist'), // 输出路径
    // publicPath: '/public/'
  },
  module: {
    // 配置解析各类文件的 loader
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader', // 只是代码检测，不能处理文件
      //   exclude: /node_modules/, // 排除 node_modules 文件夹是因为 node_modules 中有些 js 文件是经过处理的，特别是 babel 处理过的，是 es5 格式，而安装的 standard 插件是处理 es6/es7格式的，不能处理 es5，所以需要排除 node_modules 文件夹。
      //   enforce: 'pre' // 预处理，对于指定的 vue|js|jsx 文件，在使用真正的 loader 加载之前，先通过 eslint-loader 处理。pre 是预处理， post 是后处理。
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // 使用 vue-loader 的配置
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 忽略 node_modules 中的 js ,因为包在发布的时候已经编译过了
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          { // 写在对象中，可以配置 loader
            // url-loader 依赖于 file-loader，所以安装的时候也要安装 file-loader
            loader: 'url-loader',
            options: {
              limit: 1024, // 图片小于1024，转为base64代码
              name: 'resources/[path][name].[hash:8].[ext]' // 输出文件名，[原名].[原图片格式] 输出到指定目录 [path] 代指原始目录结构
            }
          }
        ]
      }
    ]
  },
}

module.exports = config