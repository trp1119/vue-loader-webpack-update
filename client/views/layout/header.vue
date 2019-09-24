<template>
  <header class="$style.mainHeader">
    <!-- $style.mainHeader 生成了文件唯一对应的 class 名 -->
    <h1>JTodo</h1>
  </header>
</template>

<script>
export default {
  // 实际上 style 编译出的是下面对象，给 vue 组件添加 computed
  computed: {
    $style () {
      return {
        mainHeader: '文件名'
      }
    }
  }

}
</script>

<style lang="stylus" module>
// 因为 module 生成的类名是唯一的，所以不必再加 scoped
// 加上 module 后，会使用 vue-loader.config.js 中 cssModules 配置的方式编译 style 中样式，会自动给组件添加变量，即 $style.mainHeader(小驼峰样式)
.main-header{
  text-align center
  h1{
    font-size 100px
    color: rgba(175, 47, 47, 0.4)
    font-weight 100
    margin 20px
  }
}
</style>
