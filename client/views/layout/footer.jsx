// jsx 是把 html 代码写到 js 代码中

export default {
  data () {
    return {
      author: 'Bcckl'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
