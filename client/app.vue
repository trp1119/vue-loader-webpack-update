<template>
  <div id="app">
    <div id="cover"></div>
    <!-- Header 用大写，因为如果用小写，就与 html 自带的 header 冲突了，vue 不会去使用声明的组件 -->
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
    #cover {
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      background-color #999
      opacity .9
      z-index -1
    }
</style>