// import Vue from 'vue'
import Vuex from 'vuex'

// 1
// Vue.use(Vuex) // 改变 export default 书写方式后，是在外层创建 store，所以 Vue.use(Vuex) 不必写在这里

// const store = new Vuex.Store({
//   state: {
//     count: 0,
//   },
//   mutations: { // 用 mutations 修改 state 内的值
//     updateCount (state, num) { // 第一个参数是 state，第二个参数是调用这个函数时传的值
//       state.count = num
//     }
//   }
// })

// 2
// export default store // 同 router，要 export 一个方法来创建 store，每次服务端渲染都重新生成一个 store，不能每次都用一个 store，每次都用一个 store 会导致内存溢出

// export default () => {
//   return  new Vuex.Store({
//     state: {
//       count: 0,
//     },
//     mutations: { // 用 mutations 修改 state 内的值
//       updateCount (state, num) { // 第一个参数是 state，第二个参数是调用这个函数时传的值
//         state.count = num
//       }
//     }
//   })
// }

// 3
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

export default () => {
  return new Vuex.Store({
    state: defaultState, // 为什么这里叫 defaultState 而不叫 state？因为有服务端渲染的过程，服务端渲染时，会有服务端返回的数据覆盖 defaultState 数据，所以它只是默认数据，不是真正的状态。
    mutations, // mutations 是操作数据，不管数据如何变化，它的操作是一样的，所以用了 mutations: mutations
    getters
  })
}
