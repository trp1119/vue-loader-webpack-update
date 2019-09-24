import Vue from 'vue'

const div = document.createElement('div')
document.body.appendChild(div)

// 将内容挂载到页面
// 方法1：通过 el #root
// new Vue({
//   el: '#root',
//   template: '<div>this is content</div>'
// })
// 方法2：
const app = new Vue({
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: { // 同下面写的 app.$watch，如果写在这里，watch 会在 vue 对象即 app 注销的时候自动注销，无需手动
  //   text (newText, oldText) {
  //     console.log(newText, oldText)
  //   }
  // }
})
app.$mount('#root')

let i = 1
setInterval(() => {
  // 使用 app.text 赋值
  // app.text += 1 // 可用，自加
  // app.$options.data.text += 1 // 无用，不会自加，说明这里传入的 $options 里面的 data 是 Vue 在 init 这个对象的时候做过修改的，而不是直接引用 $options.data
  // app.$data.text += 1 // 可用，可变化。说明挂载在 Vue 实例根对象上的 text 和 $data  的 text 是同一个属性。即直接通过 instance(实例，app) 调用的 data 的相关数据，其实就是代理到 app.$data 上的属性。

  // vue 是响应式框架，如果使用的值没有声明（如 obj.a）,那么这个属性就是非响应式的，不会引起 vue instance (app) 重新渲染的过程，所以 html 内容不会有任何变化，console.log 可以发现其在变化
  i++

  // app.obj.a = i
  // 响应式方法1
  // app.$forceUpdate() // 强制组件重新渲染，不过一般不会采用这种方式，
  // 响应式方法2 如果某个值在以后会用到，可以在 data 里设置个默认值

  // 响应式方法3
  app.$set(app.obj, 'a', i)
  // 直接删除某个属性，但其 active 还存在，会导致内存溢出，真正删除使用 app.$delect

  // app.$set(app.obj, 'a', i)
  console.log(app.obj.a)
}, 1000)

// Vue实例 app 上的属性
console.log(app.$data) // text
console.log(app.$props) // undefined
console.log(app.$el) // 挂载的节点，即 <div>0</div>
console.log(app.$options) // Vue 中整个对象（包括我们传入的及默认的）
// app.$options.render = (h) => { // 给 $options 重新赋值 render 方法
//   // 效果：初始时界面显示为 0，然后当 text变化时，页面渲染为 new render function
//   // 即当页面数据发生变化时再进行渲染
//   return h('div', {}, 'new render function')
// }
console.log(app.$root) // 打印为 vue 的实例
console.log(app.$root === app) // true
console.log(app.$children) // [] 例如组件 <item><div></div></item>，app.$children 就是 <div></div>
console.log(app.$slots) //
console.log(app.$scopedSlots) //
console.log(app.$refs) // 快速定位到节点，如果是 html 节点，则返回 html 对象，如果是组件，则返回组件实例
console.log(app.$isServer) // 有些代码在客户端渲染，有些代码在服务端渲染，使用 $isServer 进行判断

// Vue实例 app 上的方法

// 当一个页面跳转到另一个页面时，老页面的 watch 就无用了，watch 无用的时候要注销掉，以免内存溢出
// 使用 $watch 的时候，会返回一个 unwatchFn () 方法，用于停止监听
// const unWatch = app.$watch('text', (newText, oldText) => { // 和组件内声明 watch 是一样的
// // 监听 text 变化，当 text 变化时拿到新值和旧值
//   console.log(newText, oldText)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)

// // 事件监听
// app.$on('test', (a, b) => {
//   // 触发 test 事件的时候，执行 console.log
//   console.log(`test emited ${a} ${b}`)
// })
// // 触发事件
// app.$emit('test', 1, 2)

// 只被触发一次
// app.$once('test', (a, b) => {
//   // 触发 test 事件的时候，执行 console.log
//   console.log(`test emited ${a} ${b}`)
// })
// // 触发事件
// setInterval(() => {
//   app.$emit('test', 3, 4)
// }, 1000)

// 强制组件重新渲染
// app.$forceUpdate()

// 在 vue 下一次 DOM 节点更新前执行此方法。在更新值但 DOM 节点没有变化时，可用此方法调试。
app.$nextTick()
