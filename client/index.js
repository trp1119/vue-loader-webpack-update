// .vue 是组件，不能直接挂载到页面中，需先渲染再挂载
/**
 * 入口文件
 */
// 引入 Vue 类库
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
// 引入 css
import './assets/styles/global.styl'
import './assets/styles/footer.styl'
// // 引入 stylus 样式
// import './assets/styles/test-stylus.styl'
// // 引入图片
// import './assets/images/office.png'

// 引入路由
import createRouter from './config/router.js'
// 引入store
// import store from './store/store.js'
import createStore from './store/store.js' // 这里拿到的不再是 store 实例，而是创建 store 实例的方法

// 使用 vue 插件
Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 创建页面
// const root = document.createElement('div')
// document.body.appendChild(root)

// render 渲染 App 组件内容
// $mount 挂载到页面,将 vue 内容插入到 root 里

// 导航守卫（route 的全局钩子）
// 页面中每次路由跳转时，下面三个都会被触发
router.beforeEach((to, from, next) => {
  next()
  // if (to.fullPath === '/app') {
  //   next('/login')  // 执行 next 之后，路由才会跳转
  //   // next({ path: '/login', name="app" replace: false }) // 和 route-link 定义的内容是一样的
  //   // replace 值为布尔值，当为 true时，表示在跳转时不向 history 中推送一条来时路由，这样返回时，返回到的不是上一个页面，而是上上个页面。
  // }else {
  //   next()
  // }
})
router.beforeResolve((to, from, next) => {
  next() //
})
// 跳转完成后执行，已经跳转了，所以不需要 next
router.afterEach((to, from) => {

})

new Vue({
  router,
  store, // 放在入口，其下的所有组件都能拿到这个对象
  render: (h) => h(App)
}).$mount('#root')
