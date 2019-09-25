import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{firstName + ' ' + lastName}}</p>
      <p>Name: {{name}}</p> // computed 中的 name 方法
      <p>Name: {{getName()}}</p> // methods 中的 getName 方法
      <p>Number: {{number}}</p>
      <p><input type="text" v-model="number"></p> // 改变 number 的时候，页面会重新渲染（因为要把 number 新值显示到 DOM 里面），这时 getName() 方法会被重新调用，而 computed 中的 name 不会重新调用（即打印中，'getName name' 会被不断打印，而 'computed name' 不会）
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>------------------------------------------</p>
      <p>{[name2}}</p>
      <p><input type="text" v-model="name2"></p>
      <p>------------------------------------------</p>
      <p>FullName: {{fullName}}</p>
      <p>FullName: {{fullName2}}</p>
      <p>------------------------------------------</p>
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'zhang',
    lastName: 'san',
    number: 0,
    fullName: '',
    fullName2: '',
    obj: {
      a: '123'
    }
  },
  computed: { // computed 是个对象，里面可以包括很多方法，这些方法返回的数据可以像调用变量一样直接在模板中调用
    // 实际上 computed 就是定义 class 时候的 get 方法，即 get name () {}，就是通过 Object.defineProctice 给它设置 get 和 set 方法，get 方法可以通过变量的名字去调用，实际上调用的是这个方法。
    // computed 是有缓存的，每次字符串拼接都是一次计算，如果每次渲染页面都进行一次计算。性能开销会很大，这时 computed 会进行一次缓存，避免这个问题。
    // computed 一般用于拿到的数据并不是直接显示的数据，而是经过一系列计算再显示的数据
    name () {
      console.log('computed name')
      return `${this.firstName} ${this.lastName}`
    },
    // computed 也可以进行设置操作
    name2: {
      // get 是获取 computed 时进行的操作
      get () {
        console.log('computed name')
        return `${this.firstName} ${this.lastName}`
      },
      // set 是设置 computed 时进行的操作
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  mounted () {
    this.obj = {
      a: '345'
    }
  },
  watch: {
    // watch 常用于监听到某个数据的变化，然后值执行某个指定的操作，如向后台传输数据。
    // watch 中方法刚绑定的时候是不会执行的，只有监听的值发生变化才会执行。
    // firstName (newName, oldName) {
    //   this.fullName = newName + ' ' + this.lastName
    // },
    // 要想在页面加载完成的时候就执行，可以采用下面写法
    firstName: {
      handler (newName, oldName) { // 像上面默认写方法的时候，其实写的就是 handler
        this.fullName = newName + ' ' + this.lastName
      },
      // 配置项
      immediate: true, // 设置为 true 后，页面中声明 firstName 的监听后，会立即执行一次 handler，不声明这个配置项，绑定的时候不会去执行，只有监听值发生变化时才执行。
      deep: true // 默认是 false
    },
    obj: { // 直接改 Obj （如给 Obj 重新赋值，见 mounted），会监听到变化
      handler (newName, oldName) {
        console.log('obj.a changed')
      },
      // 配置项
      immediate: true
      // deep: true // 默认是 false 添加 deep: true 配置项后，会遍历对象为每个值都添加监听事件，虽然可以监听到内部变化，但性能开销增大。
    },
    // 不使性能开销过大，又能监听内部变化，可以采用字符串
    'obj.a': { // 在字符串中写深入的属性调用，vue 会一层层解析下去，直到最后一个 .属性 才去真正监听想要监听的属性
      handler (newName, oldName) {
        console.log('obj.a changed')
      },
      immediate: true
    }
  },
  methods: {
    getName () {
      console.log('getName name')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
