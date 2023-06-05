<template>
  <iframe
    v-if="!canPreivew"
    :src="'https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(cururl)"
    width='100%'
    height='100%'
    frameborder='1'
  >
  </iframe>
  <yxt-unable-preview
    v-else
  ></yxt-unable-preview>


</template>

<script>
import YxtUnablePreview from './unablePreview'

export default {
  name: 'YxtOffice',
  components: { YxtUnablePreview },
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
  computed: {
    canPreivew() {
      let ipExg = /(2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2}/
      return ipExg.test(this.cururl)
    }
  },
  filters: {
    formatMeetingTime(item) {
      return `${item.startTime.substr(5, 5)} ${item.startTime.substr(11, 5)}~${item.endTime.substr(11, 5)}`
    },
    arrayToStr(val) {
      return val.join(',')
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
