<template>
  <div id="app">
    <div id="cover"></div>
    <!-- Header 用大写，因为如果用小写，就与 html 自带的 header 冲突了，vue 不会去使用声明的组件 -->
    <Header></Header>
    <div>{{fullName}}</div>
    <!-- <router-link to="/app">app</router-link> -->
    <!-- 传入的是 json 字符串，所以 to 用 v-bind 绑定 -->
    <router-link :to="{name: 'app'}">app</router-link>
    <router-link to="/login">login</router-link>
    <!-- <Todo></Todo> -->
    <!-- 路由过渡动画 -->
    <transition name="fade"> 
      <router-view />
    </transition>
    <Footer></Footer>
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  data () {
    return {
    }
  },
  mounted () {
    let i = 1
    setInterval(() => {
      this.$store.commit('updateCount', i++) // 通过 store 的 commit 方法调用 mutation
    }, 1000)
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    ...mapState(['count']), // 如果同名，可以通过数组的方式传递
    // ...mapState({ // 如果不同名，可以采用对象形式
    //   counter: 'count'
    // }),
    // ...mapState({ // 也可以传一个方法，接收参数为 state 对象
    //   counter: (state) => state.count // 利用这种方式可以对 count 进一步处理
    // }),
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    ...mapGetters(['fullName'])
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