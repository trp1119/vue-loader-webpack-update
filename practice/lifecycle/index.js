import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  // beforeCreate 和 created 拿不到 DOM 节点，无法在此阶段进行DOM操作
  // 与节点有关的操作放到 mounted 中，数据有关的方法 created 或 mounted 中均可
  // beforeCreate created beforeMount mounted 在组件生命周期中只会被加载一次， beforeMount mounted 在服务端渲染时不会被调用，服务端渲染过程中被调用的只有 beforeCreate created。因为 beforeMount mounted 是与 DOM 操作有关的，在服务端没有 DOM 执行环境，所有没有这些操作。
  beforeCreate () {
    console.log(this.$el, 'beforeCreate') // undefined
  },
  created () {
    console.log(this.$el, 'created') // undefined
  },
  // beforeMount 节点已加载，但数据未渲染
  beforeMount () {
    console.log(this.$el, 'beforeMount') // <div id="#root"></div>
  },
  mounted () {
    console.log(this.$el, 'mounted') // <div>0</div>
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () { // 在组件章节讲解
    console.log(this, 'activated')
  },
  deactivated () { // 在组件章节讲解
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    throw new TypeError('render error')
    // console.log('render function invoked') // render 在 beforeMount 和 mounted 之间执行
    // return h('div', {}, this.text) // ('标签', {props、事件等}, 标签中的内容)
  },
  renderError (h, err) { // 开发的时候被调用，打包上线后不会被调用
    return h('div', {}, err.stack)
  },
  errorCaptured (h, err) { // 可用在线上环境中，用于捕捉错误，如果在根组件使用这个方法，在任意子组件发生的错误都会捕捉到（但如果子组件把向上冒泡的事件阻止掉，则无法捕获）
    return h('div', {}, err.stack)
  }
  // 在使用 .vue 开发过程中，是都没有 template 的，所有文件中的 template，都经过了 vue-loader 处理，变成了 render function 放到了 vue-loader 处理过的文件中。因为解析 template 变为 render function 是个比较耗时的过程，vue-loader 帮助处理了这些过程后，页面执行代码时效率更高。
})

app.$mount('#root')
// setInterval(() => {
//   app.text = app.text += 1
// }, 1000)

setTimeout(() => {
  app.$destroy()
}, 3000)
