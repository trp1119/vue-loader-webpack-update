<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <!-- 监听子组件 -->
    <Item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    ></Item>
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
      ></Tabs>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  // 组件内增加钩子
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter', this) // 这时候 this 是 undefined
    // next(vm => { // 参数为 vm 实例
    //   console.log(vm.id)
    // })
    next()
  },
  // beforeRouteUpdate 在同一个组件在不同路由中显示时被触发，即 params 不同， app/123 转到 app/456时触发，123 切换到 456 时是不会触发上面的 beforeRouteEnter 的
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
  // beforeRouteLeave 在 beforeEach 前执行
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    if (global.confirm('are you sure?')) {
      next()
    }
  },
  // 先是 beforeEach 被触发，然后是路由配置中的 beforeEnter，然后是组件中的 beforeRouteEnter，然后触发 beforeResolve，前面任何地方阻止操作，beforeResolve 都不会被触发，fterEach 最后被触发。
  components: {
    Item,
    Tabs
  },
  data () {
    return {
      todos: [

      ],
      filter: 'all'
    }
  },
  mounted () {
    // 相同组件类似路径间切换时，mounted 不会更新，即 /login 到 /app/123 时会触发mounted，而切换到 /app/456 再切换到 /app/123 时，mounted 不再更新。这时，应该使用 beforeRouteUpdate 或 watch，但 watch 不能控制路由跳转行为。
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    // 子组件传过来的 id
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
