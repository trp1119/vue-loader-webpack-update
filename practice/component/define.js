import Vue from 'vue'

// 定义全局 data
// const data = { // eslint-disable-line
//   text: 0
// }

// 定义组件
// 1. 自定义定义组件对象
const component1 = {
  // props: ['active', 'propOne', 'propTwo'] // 简洁写法，但不如下面严谨
  props: { // props 定义组件在被外部使用的时候的可变行为
    active: {
      type: Boolean, // Vue 在接收 props 中 active 的时候去判断是否是 boolean，不是虽然仍可使用，但会报警告
      required: true,
      default: false // default 和 require 一般不会同时使用
      // 如果 props 接收的是对象，那么 default 的时候，像 data 里一样，采用
      // default () {
      //   return {}
      // }
      // 形式，不然，如果采用 default: {} 形式，如果多个组件里都使用了这个 default 值，一个组件中改变 defult 值的时候，其他组件也会受影响

      // 如果想更严格的校验，可以采用 validator 方法
      // validator (value) { // 真正验证类型就是走的这个方法
      //   return typeof value === 'boolean'
      // }
    },
    propOne: String,
    propTwo: String
    // onChange: Function
  },
  template: `<div>
    <input type="text" v-model="text">
    <span>{{propOne}}</span>
    <span @click="handleChange">{{propTwo}}</span>
    <span v-show="active">this is active</span>
  </div>`,
  methods: {
    handleChange () {
      // this.onChange() // 复杂写法
      this.$emit('change') // 使用 this.$emit('事件') 后 props 就不用 onChange: Function 了，父组件内使用 @change
      // this.$emit 就是 vue 实例上的 $emit， @change 就是绑定了 v-on 即 this.$on
    }
  },
  mounted () {
    // this.propOne = 'inner content' // 不推荐这种在子组件中修改父组件传递过来的值（可以修改成功，但 vue 会给警告）。为什么 vue 会限制这么做？在组件内部去修改 props 是不对的，如果要主动改一个值，这个值应该定义在 data 中，props 是外部组件用来约束这个组件行为的，作为子节点，应该不能去主动修改父节点的定义。如果要改 props，可以在子组件内触发事件，告诉外部组件调用组件的地方需求修改，由外部组件自行修改。即在子组件内定义方法，在方法内调用父组件传递过来的方法，这个父组件的方法可以在父组件内改变需求改变的值。虽然有些绕，但这就是 props 单向数据流概念，如果子组件可以随便改父组件内容，会导致逻辑混乱。
  },
  data () { // 在使用 data 定义组件内数据的时候，如果组件不是通过 new Vue 方式生成出的，而是注册到全局或注册到某个 Vue 实例中使用，要采用 data 是 function ，return 新建对象（不能是全局对象）的方式写。
  // 为什么 vue 会限制这么做？因为需要为每个组件传递的 data 值不相互影响，即每次使用 return 的都是一个新对象。像上面定义了一个全局的 data 对象，有一个组件去改变其值的时候，另一个组件中它的值也会变。
  // return data // 不能这样 return 全局对象，影响组件复用，要 return 新对象
    return {
      text: 0
    }
  }
}
// 2. 全局注组件：使用 Vue 类的 component 方法，把组件定义到全局使用
// Vue.component('CompOne', component1) // ('自定义组件名（大驼峰）', 前面自定义定义的组件对象)

// new 一个 Vue 的时候就是定义一个组件，只不过看上去像函数式写法，组件的 template 就是 template 中的内容
new Vue({
  // 2. 局部注册组件，使用 配置项 components 中 keyvalue
  components: {
    CompOne: component1 // 自定义组件名（大驼峰）, 前面自定义定义的组件对象
  },
  data: {
    prop2: 'text2'
  },
  methods: {
    handleChange () {
      this.prop2 += 1
    }
  },
  el: '#root',
  template: `<div>
    <comp-one :active="true" prop-one="text1" :prop-two="prop2" :on-change="handleChange"></comp-one> // 不加 ：传递的是字符串，加 ： 即变量的写法
    <comp-one :active="true" prop-one="text1" :prop-two="prop2" @change="handleChange"></comp-one>
    <comp-one :active="false"></comp-one> // 使用二级组件，小写，用 - 连接
  </div>`
})
