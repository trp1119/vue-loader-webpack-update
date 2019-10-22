export default {
  // 可以理解为组件内的 computed
  // 后端返回的数据在组件 computed 中组装后再展示，但是如果多个页面都使用了这个组装的数据，重复写 computed 是浪费的，可以在 getters 中统一写然后组件引用即可
  fullName (state) { // 参数为 state
    return `${state.firstName} ${state.lastName}`
  }

}
