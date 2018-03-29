<template>
  <div class="hello">
    <h2>Child page</h2>
    <div class="btns">
      <button class="dao-btn ghost btn-sm" @click="sendMessage">Send Message to Parent</button>
      <button class="dao-btn ghost btn-sm" @click="openAlert">Open Alert dialog from Parent</button>
      <button class="dao-btn ghost btn-sm" @click="openDialog">Open Complicated dialog from Parent</button>
    </div>
    <br>
    <div>
      Feedback:
      <span :style="{color: (
        this.feedback === 'Confirm!' && 'green' ||
        this.feedback === 'Cancel!' && 'red' ||
        this.feedback === 'recieved!' && 'orange'
      )}">{{ this.feedback }}</span>
    </div>
    <div>
      The Input in Dialog is:
      <span style="color: orange">{{ this.input }}</span>
    </div>
  </div>
</template>

<script>
import PostMessage from '@'

const { request, setTarget } = PostMessage
setTarget(window.parent)

export default {
  name: 'Plugin',
  data () {
    return {
      msg: 'This is a message from Plugin page',
      feedback: '',
      input: 'initial input'
    }
  },
  methods: {
    // 发送请求到 DCE
    sendMessage () {
      request('message', { msg: this.msg }, res => {
        console.log(res)
        this.feedback = res.msg
      })
    },
    openAlert () {
      request('alert', { msg: '你确定要做这种事吗？' }, res => {
        console.log(res)
        this.feedback = res.msg
      })
    },
    openDialog () {
      request('dialog', {
        url: 'http://localhost:9999/child/#/dialog',
        input: this.input
      }, res => {
        this.input = res.input
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h2, .btns .dao-btn {
    margin-bottom: 10px;
  }
</style>
