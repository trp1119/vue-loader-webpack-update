/* eslint-disable */
import Router from 'vue-router'

import routes from './routes'

// 不推荐这么使用，因为这样每次在全局 import 这个 router 的时候，引入的都是同一个 router，如果需要每次引入的时候新创建一个 router，这种方式是做不到的。(和 return data 一样)
// const router = new Router({
//     routes
// })
// export default router

// 为什么要这么做？
// 因为项目需要服务端渲染，服务端渲染的时候，只 export default router 会导致内存溢出的问题。export default 出去的只有一个 router，每次服务端渲染都会重新生成一个新的 app，由于 router 只有一个对象，导致会缓存新建的 app，在服务端渲染流程结束后，app 没有释放，导致内存没有下降。随着内存逐渐累加，导致内存溢出。（服务端渲染部分再深入讲解）
export default () => {
  return new Router({
    routes,
    mode: 'history', // mode 有两种参数，一个是默认的哈希 # ，一个是 history。默认是哈希路由，但哈希更多情况下是用来做定位的，而不是做路由状态的记录。同时哈希路由不会被搜索引擎解析，影响网站SEO。history路由形式不带 #。
    // base: '/base/', // 在 routes 中所有配置路由的 path 前添加 /base/
    linkActiveClass: 'active-link', // 配置 route-link 链接 class，路径不完全匹配时添加 class 为 linkActiveClass
    linkExactActiveClaee: 'extract-active-link', // 路径完全匹配时添加 class 为 linkExactActiveClaee linkActiveClass
    scrollBehavior (to, from, savePosition) { // 页面跳转时是否需要滚动
      // to 去往路由 from 来时路由 savePosition 记录滚动条位置
      // to from savaPosition 都是对象
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    fallback: true // 默认为 true 可使页面不跳转（单页面应用），正常路由。在不支持 histiory 路由的浏览器中，vue 自动切换为哈希 # 模式。当 fallback 为 false 时，vue 不会去自动处理，在不支持 histiory 路由的浏览器中，单页面应用就变为多页面应用，每次页面跳转都会去后端请求数据，耗时。
    // parseQuery (query) { // query 是路由中 ？后面参数部分，是字符串
    // 	// query 转为 json obj，vue 是默认转的，如果有定制需求，在这里写
    // },
    // stringifyQuery (obj) {
    // 	// json obj 转为字符串
    // }
  })
}
