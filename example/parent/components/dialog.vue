<template>
  <dao-dialog :class="{hide: !showContent}" :visible="visible"
    :config="config">
    <iframe ref="iframe"
      :style="{height: `${height}px`}"
      :src="source"
      frameborder="0"
      id="testIframe"
      class="dialog"
      @load="handleOpen">
    </iframe>
  </dao-dialog>
</template>
<script>
export default {
  name: 'PluginDialog',
  props: {
    source: String,
    visible: Boolean,
    showContent: Boolean
  },
  data () {
    return {
      config: {
        type: 'normal',
        showHeader: false,
        showFooter: false,
        closeOnClickOutside: false,
        closeOnPressEscape: false
        // size: 'resize'
      },
      height: 300
    }
  },
  methods: {
    handleOpen () {
      const height = this.$refs.iframe.contentWindow.document.body.scrollHeight
      this.height = height
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialog {
    width: 100%;
    height: 100%;
    margin-bottom: -6px;
  }
  .hide {
    display: none;
  }
</style>
