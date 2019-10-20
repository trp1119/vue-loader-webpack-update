import Vue from 'vue'

// 自定义组件实现双向数据绑定
// // 非 v-model 实现数据双向绑定
// const component = {
//   props: ['value1'],
//   // @input 即 v-on:input，输入字符时触发该事件
//   template: `
//     <div>
//       <input type="text" @input="handleInput" :value="value1" />
//     </div>
//   `,
//   methods: {
//     handleInput (e) {
//       this.$emit('input2', e.target.value)
//     }
//   }
// }

// new Vue({
//   components: {
//     CompOne: component
//   },
//   el: '#root',
//   data () {
//     return {
//       val: '123'
//     }
//   },
//   template: `
//     <div>
//       <div>{{val}}</div>
//       <comp-one :value1="val" @input2="val = arguments[0]"></comp-one>
//     </div>
//   `
//   // arguments 是通过 $emit 传出的参数，所有参数都会放到 arguments 中
// })

// v-model 实现数据双向绑定
// const component = {
//   // v-model 下 props 中必须是 value，不能自定义命名为 value1
//   props: ['value'],
//   // @input 即 v-on:input，输入字符时触发该事件
//   template: `
//     <div>
//       <input type="text" @input="handleInput" :value="value" />
//     </div>
//   `,
//   methods: {
//     handleInput (e) {
//       // v-model 下 事件名必须是 input，不能自定义命名为 input1
//       this.$emit('input', e.target.value)
//     }
//   }
// }

// new Vue({
//   components: {
//     CompOne: component
//   },
//   el: '#root',
//   data () {
//     return {
//       val: '123'
//     }
//   },
//   template: `
//     <div>
//       <div>{{val}}</div>
//       <comp-one v-model="val"></comp-one>
//     </div>
//   `
//   // 使用 v-model 等价于 :value="val" @input="val = arguments[0]"
//   // 注意，使用 v-model 时传递的是 value 和 input，不能像上面一样自定义命名
// })

// 其实变量名称是可以自定义的，需增加 v-model 属性
// v-model 实现数据双向绑定
const component = {
  model: {
    prop: 'value1',
    event: 'input1'
  },
  // v-model 下 props 中必须是 value，不能自定义命名为 value1
  props: ['value1'],
  // @input 即 v-on:input，输入字符时触发该事件
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1" />
    </div>
  `,
  methods: {
    handleInput (e) {
      // v-model 下 事件名必须是 input，不能自定义命名为 input1
      this.$emit('input1', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      val: '123'
    }
  },
  template: `
    <div>
      <div>{{val}}</div>
      <comp-one v-model="val"></comp-one>
    </div>
  `
  // 使用 v-model 等价于 :value="val" @input="val = arguments[0]"
  // 注意，使用 v-model 时传递的是 value 和 input，不能像上面一样自定义命名
})
