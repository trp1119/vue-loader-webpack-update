<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="destory" @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
  // 父组件通过 props 传入，子组件通过事件的方式告诉父组件进行的操作
  // 方法1 在 props 中声明一个方法，父组件通过 props 把对应的方法传入，在子组件中调用事件的时候触发父组件传入的方法
  // 方法2 使用 this.$emit('') 触发事件，并传参
  props: {
    todo: {
      type: Object,
      require: true
    }
  },
  methods: {
    deleteTodo () {
      // 父组件会监听 $emit 触发的事件
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-item{
  position relative
  background-color #fff
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,0.06)
  &:hover{
    .destory:after{
      content: '×'
    }
  }
  label{
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  &.completed{
    label{
      color: #d9d9d9;
      text-decoration line-through
    }
  }
}
.toggle{
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  outline none
  &:after{
    content url('../../assets/images/round.svg')
  }
  &:checked:after{
    content url('../../assets/images/done.svg')
  }
}
.destory{
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color transparent
  appearance none
  border-width 0
  cursor pointer
  outline none
}
</style>
