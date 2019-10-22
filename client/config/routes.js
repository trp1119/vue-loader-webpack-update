/* eslint-disable */
// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app:id', // 传参，类似 /app/xxx ，在页面中通过 this.$route.params 可以拿到键值对
    // props: true, // 定义 props 为 true 后，可以将 :id 作为 props 传入组件 Todo 中，即在组件中，用 props 直接接收即可 props: ['id']，代替父组件传值。这种方式可以实现在组件内不需要写 this.$route 这种写法
    // 如果组件中写了 $route 这种写法，路由与组件耦合在一起，就不能单独拿去复用，可能会存在路由不匹配。如果用 props 声明，在其他地方也可以使用这个组件，因为 依赖的 id 值可以改为通过父组件传入，不再依赖路由读取，实现解耦。
    // 可以自己指定传入值
    // props: {
    // 	id: '456'
    // },
    // 也可以通过 query 传递值
    // props: (route) => ({  // 这里的 route 相当于组件中的 this.$route
    // 	id: route.query.b
    // }),
    // component: Todo,
    // 异步加载组件
    // 路由在非常多的情况下，如果一次性通过 webpack 把所有文件打包，会导致 js 文件非常大，初始加载时间非常长，而且在访问对应页面的时候把其他页面的 js 也加载了过来，造成浪费。通过异步加载，可以对于不同路由加载对应代码和核心代码，实现异步页面加载。
    component: () => import('../views/todo/todo.vue'), // 使用这个语法要安装 babel-plugin-syntax-dynamic-import 插件，然后修改 .babelrc
    // components: { // 一个路由下引入两个组件，通过名字不同在页面 route-view 中区分，route-view 中不写 name 的为 dafault
    // 	default: Todo,
    // 	a: Login
    // },
    name: 'app',
    meta: { // 路由配置 html 中可以配置元信息如 keyword description 等，但 vue 中不方便配置，可在路由中配置
      title: 'this is app',
      description: 'this is description'
    },
    // children: [ // 子路由，进入 app/test 路由后，在 Todo组件下显示 Login 组件
    // 	{
    // 		path: 'test',
    // 		component: Login
    // 	}
    // ],
    // 在路由配置时增加钩子
    // 进入这个路由前调用这个钩子，调用顺序在 beforeEach 和 beforeResolve 之间
    beforeEnter (to, from, next) {
      console.log('beforeEnter')
      next() // 必须执行下 next，否则不会进入这个钩子，console.log('beforeEnter')也不会打印
    }
  },
  {
    path: '/login',
    component: Login
  }
]
