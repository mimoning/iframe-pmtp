<template>
  <div>
    <h1>Parent page</h1>
    <br>
    <div>{{ msg }}</div>
    <br>
    <iframe id="child" class="child-page" sandBox="allow-scripts" src="http://localhost:9999/child"></iframe>
    <dialog-iframe :visible="visible" :show-content="show" :source="source"></dialog-iframe>
  </div>
</template>

<script>
import PostMessage from '@'
import DialogIframe from '@parent/components/dialog'

const { addListener } = PostMessage

export default {
  name: 'HelloWorld',
  components: {
    DialogIframe
  },
  data () {
    return {
      msg: 'This is before text',
      visible: false,
      show: false,
      source: ''
    }
  },
  created () {
    // 添加监听到 postmessage
    addListener('message', this.changeText.bind(this))
    addListener('alert', this.openAlert.bind(this))
    addListener('dialog', this.openDialog.bind(this))
  },
  methods: {
    // open a alert
    openAlert (data, res) {
      this.msg = data.msg
      this.$daoAlert(data.msg, 'Title')
        // .delay(3000)
        .show()
        .then(() => {
          res({ msg: 'Confirm!' })
        }, () => {
          res({ msg: 'Cancel!' })
        })
    },
    // change text
    changeText (data, res) {
      this.msg = data.msg
      res({ msg: 'recieved!' })
    },
    // open dialog
    openDialog (data, res) {
      this.visible = true
      this.source = data.url

      // 添加一次性监听事件，监听对话框打开时与 dce 的连接，并传递数据给对话框
      addListener('dialog.open', (d, response) => {
        console.log('dialog open')
        this.show = true
        response(data)
      }, true)
      // 添加一次性监听事件，监听对话框关闭，并把数据传递给 plugin
      addListener('dialog.close', (d, response) => {
        this.visible = false
        this.show = false
        res(d)
        response()
      }, true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child-page {
  width: 500px;
  height: 400px;
}
</style>
