import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-text="text"></div> <br>
      // v-show 原理是是否添加 display:none <br>
      <div v-show="active">Text: {{text}}</div><br>
      // v-if 如果不显示，不会出现在 DOM 流中  <br>
      // 如果只是显示或隐藏，使用 v-show，因为 v-if 动态增删节点性能比 v-show 的显示隐藏差很多（动态增删节点会导致页面的重绘和重新排版，非常耗时）
      <div v-if="active">Text: {{text}}</div><br>
      // v-else-if 上一个兄弟节点必须是 v-if
      <div v-else-if="text === 0">else if content</div><br>
      <div v-else>esle content</div><br>
      <div v-text="'Text: ' + text"></div><br>
      // 循环出的列表为什么加 key ?
      // key 的目的唯一指定循环出的值，vue 中数据是不断变化的，如果每次变化，vue 重新渲染列表，然后再放入 DOM 中，性能开销会比较大。指定 key 之后，在下一次循环时，如果在缓存中拿到同样的 key，则这一行 DOM 节点会被复用，即不需要生成新的 DOM 节点，直接用缓存过的 DOM 节点，性能开销减小
      // 不建议使用 index 作为 key，因为数组顺序的变化和数组内容的变化是没有什么关系的，使用 index 作为 key 有可能导致错误的缓存
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{index}} : {{item}}</li>
      </ul>
      // 在 js 中的逻辑就是通过 Object.keys 将对象中的 key 读出，得到的顺序就是传给 index 的顺序
      <ul>
        <li v-for="(val, key, index) in obj">{{index}} : {{key}} : {{val}}</li>
      </ul>
      // 默认情况下，v-model 只能用在 inpiut 节点上，因为只有 input 可以去改变数据<br>
      <input type="text" v-model="text"><br>
      <input type="checkbox" v-model="active"><br>
      <div>
        // value="1" 中，1 是字符串 :value="1" 中，1 是数值，默认情况下 DOM 节点上的 value 都是字符串<br>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
        <br>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked"> // 点击后 picked 会变为 value 值
        // v-model 的 .number 修饰符
        // 会自动将输入值转化为合法数值，例如输入 01 会变为 1，输入 1abc 会变为 1
        <input type="text" v-model.number="text"><br>
        // v-model 的 .trim 修饰符
        // 去除表单内值的前后空格
        <input type="text" v-model.trim="text"><br>
        // v-model 的 .lazy 修饰符
        // 默认情况下，v-model 给 input 绑定的事件是 input 事件，就是每一次有输入，就会重新触发这个事件，加上 .lazy 之后，就变为绑定的 onChange 事件。即在 input 框中输入很多值，虽然 input 框内的值变了，但绑定的 text 仍然显示为原值，只有当点击 input 框外的时候，onChange 事件被触发，外部 text 值发生变化。
        <input type="text" v-model.lazy="text"><br>
        // v-pre 不会去解析表达式，标签里写的什么，就显示什么
        <p v-pre>Text: {{text}}</p>
        // v-cloak 在 webpack 开发的项目中基本用不到。唯一使用的场景是直接在页面上引入了 vue 的库代码（vue.js），在 html 页面中写 vue 代码，模板写在 body 内。在 body 内写了很多 vue 的模板代码，如 {{}}，这些在 html 加载的时候浏览器是不知道的，会直接显示在页面上，待 vue 代码加载完毕，再显示正确数据，用户体验差。
        // v-cloak 的作用是在 vue 代码加载完毕前，给 v-cloak 添加样式 display:none 是这一部分隐藏，待 vue 代码加载完毕，再去除 display:none。
        <p v-cloak>Text: {{text}}</p>
        // v-once 数据绑定的内容只执行一次，数据变化时 v-once 中的模板不会再重新编译。
        // v-once 使用场景是节点下面写的都是静态内容，没有动态数据，作用是节省性能开销（v-once 下的数据 vue 认为其不需要更新，不会再去检查，不会再进行虚拟 DOM 对比）
        <p v-cloak>Text: {{text}}</p>
      </div>
    </div>
  `,
  data: {
    text: 0,
    html: '<span>this is html</span>',
    active: false,
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: ''
  }
})
