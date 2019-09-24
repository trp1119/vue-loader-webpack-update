// 自定义的 loader
const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    // template 中意外加入空格在编译为 html 时对样式有影响
    // preserveWhitepace 消除此影响
    preserveWhitepace: true,

    // webpack 中 extract-text-webpack-plugin 插件会打包 css 到单独文件，但不会打包 .vue 文件中的 css
    // 设置 extractCss 为 true 可以打包此文件
    // 为什么 vue 默认不会去打包 .vue 文件中的 css?
    // 在 vue 开发中，当使用异步加载模块时，如果使用 extraCSS 把所有的 css样式 都单独提取到一个 css 文件中，则整个应用所有样式都在这个 css 中加载，则加载时一次性将所有的 css 样式加载到页面中。如果使用 vue 的异步加载模块，当使用的页面显示时，其使用的 css 样式才加载到页面中，这样可以提高首屏加载的速度，vue 认为其处理 css 方式（通过 js 把 css 写入到 DOM 中）效率是高的，所以默认不提取到 css 中。但有时我们需要提取出来，所以 vue 提供了 extractCSS 这个配置项。
    extractCSS: !isDev, // 在 dev 开发环境下，不能使用 extract-text-webpack-plugin

    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 编译出的 class 命名方式，采用 文件路径-文件名-哈希值 方式命名
      camelCase: true, // 使用小驼峰命名方式添加变量
    },

    // postcss 一般不直接写在配置项中，因为 外面已经有一个 postcss.config.js 配置，在使用 postcss loader 以及 vue 中 postcss时，都可以直接读取外面写的 postcss.config.js，所以这是一个全局的配置，省去了在不同地方使用 postcss 时需要单独配置的问题。所以这里一般不单独配置 postcss。
    // postcss: {},

    // 热重载，根据传入的 process.env.NODE_ENV 是否等于 production 来判断，在等于 production 的情况下会关闭 hotReload 热重载功能，如果不是 production ，则开启。
    // hotReload 设置为 false 后，会通过刷新页面的方式展示新内容，而不是直接显示。
    // 这里设置为 false 不影响样式的热重载，即 hotReload 修改为 false 后，页面样式修改后仍然会不刷新即可加载显示，因为样式的热重载是通过 vue-style-loader 实现的，
    // 默认情况下不需要设置，会根据环境变量生成
    // hotReload: false,

    // 自定义vue模块，
    // .vue 中的 template script style 都是不同的模块，这些模块在 vue-loader 中去处理这些模块的时候，使用的是不同的 loader（例如处理 script 用的 babel-loader）。
    // loader: {
    //   'docs': docsLoader, // docsLoader 的作用是把 docs 里的内容输出到组件的 options 上
    // }
    // 在使用 vue 原生 loader 解析之前，先用 preLoader 中配置的 loader 解析一遍，再用 vue 原生 loader 解析 preLoader 解析 过的代码
    // preLoader: {
    // }
    // 在使用 vue 原生 loader 解析之后，再用 postLoader 中配置的 loader 解析一遍 vue 原生 loader 解析 过的代码
    // postLoader: {
    // }
  }
}