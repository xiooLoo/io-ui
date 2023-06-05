<template>
  <iframe :src="'/platform/pdf/web/viewer.html?file='+encodeURIComponent(cururl)" width='100%' height='800px' frameborder='0'></iframe>
</template>

<script>

export default {
  name: 'YxtPdf',
  components: {},
  props: {
    url: String,
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  created() {
    this.cururl = this.url;
  },
  watch: {
    url: {
      handler(url) {
        this.cururl = url
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {}
}
</script>

<style scoped>

</style>
