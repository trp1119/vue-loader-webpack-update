// .vue 是组件，不能直接挂载到页面中，需先渲染再挂载
/**
 * 入口文件
 */
// 引入 Vue 类库
import Vue from 'vue'
import App from './app.vue'
// 引入 css
import './assets/styles/global.styl'
import './assets/styles/footer.styl'
// // 引入 stylus 样式
// import './assets/styles/test-stylus.styl'
// // 引入图片
// import './assets/images/office.png'

// 创建页面
const root = document.createElement('div')
document.body.appendChild(root)

// render 渲染 App 组件内容
// $mount 挂载到页面,将 vue 内容插入到 root 里

new Vue({
  render: (h) => h(App)
}).$mount(root)
