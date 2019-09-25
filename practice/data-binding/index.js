import Vue from 'vue'

var globalVar = '111' // eslint-disable-line

new Vue({
  el: '#root',
  // {{ var a = 1 }} 不支持，报错
  // {{ arr.join(' ') }} 这种元运算是支持的，if else 这种不支持
  // {{ globalVar }} 访问不到
  // vue 模板中能访问的，首先是对象上绑定到 this 的所有值，其次是默认的 js 全局对象，但自己定义在外层的全局变量不能访问
  // {{ html }} 这样 <span>123</span> 都会显示出来，因为 vue 默认会转义字符串，为的是防止注入、攻击
  // <p v-html="html"></p> 输出为 <p><span>123</span></p>
  // template: `
  //   <div v-bind:id="a" v-on:click="handleClick">
  //     {{ isActive ? 'active' : 'not active' }} <br />
  //     {{ Date.now() }} <br />
  //     {{ globalVar }} <br />
  //     {{ html }} <br />
  //     <p v-html="html"></p>
  //   </div>
  // `,
  // class 属性写法
  // 写法1：对象写法 :class="{ active: !isActive }"
  // 写法2：数组写法 :class="[ isActive ? 'active' : '' ]"
  // 写法3：数组对象合并写法：:class="[{ active: !isActive }]"
  // 写法4：computed 中返回
  // <p>{{ arr }}</p>  渲染出 [1 2 3]
  // {{ getJoineArr(arr) }} 渲染出 1 2 3
  template: `
    <div
      :class="[{ active: !isActive }]"
      :style="styles"
      :style="[styles, styles2]"
    >
      <p v-html="html"></p>
      <p>{{ arr }}</p>
    </div>
  `,
  data: {
    isActive: false,
    html: '<span>123</span>',
    a: 'main',
    arr: [1, 2, 3],
    styles: {
      color: 'red',
      appearance: 'none' // 清除浏览器默认样式，vue 会自动加前缀
    },
    styles2: {
      color: 'black'
    }
  },
  computed: {
    classNames () {
      // 根据变量 return 完整的 object，返回 class
    },
    getJoineArr (arr) {
      return arr.join(' ')
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    }
  }
})
