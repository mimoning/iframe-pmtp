<template>
  <div ref="box" id="test">
    <dao-setting-layout>
      <template slot="layout-title">Test</template>
      <dao-setting-section>
        <dao-setting-item>
          <template slot="label">
            你需要的输入
          </template>
          <template slot="content">
            <dao-input v-model="input"></dao-input>
          </template>
        </dao-setting-item>
      </dao-setting-section>
      <template slot="footer">
        <button class="dao-btn ghost" @click="complete(data.input)">取消</button>
        <button class="dao-btn blue" @click="complete(input)">确定</button>
      </template>
    </dao-setting-layout>
  </div>
</template>
<script>
import PostMessage from '@'

const { request } = PostMessage

export default {
  name: 'Dialog',
  data () {
    return {
      input: '',
      data: {}
    }
  },
  created () {
    this.connectDCE()
  },
  methods: {
    connectDCE () {
      request('dialog.open', '', res => {
        this.data = res
        this.input = res.input
      })
    },
    complete (input) {
      request('dialog.close', {
        input
      }, res => {
        this.data = {}
      })
    }
  }
}
</script>
<style lang="scss">
  .dao-setting-layout-footer {
    text-align: right!important;
  }
</style>
