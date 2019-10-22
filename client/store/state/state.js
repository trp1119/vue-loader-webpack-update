export default {
  // state 是一个初始的 js 对象，数据是在此基础上进行修改的，在声明 state 的过程中，即使是页面中暂时没不到的字段或对象，也要提前声明一个值，否则就像 vue 组件中的 data 一样，如果一开始没有声明一个值，导致后续去改变这个数据的时候，这个数据不是 reactived，不会去更新视图。（这里写法和 data 中一样）
  count: 0,
  firstName: 'Jokcy',
  lastName: 'Lou'
}
