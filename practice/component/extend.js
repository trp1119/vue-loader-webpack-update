import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: {
      type: String,
      required: true
    }
  },
  template: `<div>
    <input type="text" v-model="text">
    <span>{{propOne}}</span>
    <span @click="handleChange">{{propTwo}}</span>
    <span v-show="active">this is active</span>
  </div>`,
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  data () {
    return {
      text: 0
    }
  }
}

// 通过 Vue.extend 得到 Vue 类的子类
// 正常情况下，new Vue 得到的实例里有 Vue 的默认配置，没有 props、data 等，都要通过自己声明配置。而继承者就自动拥有了被继承者的配置
const CompVue = Vue.extend(component)

new CompVue({
  el: '#root'
  // 不需要指定 template，因为在 extend 的时候，component1 中的 template 配置已经继承过来了
})
