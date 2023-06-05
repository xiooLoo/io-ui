<template>
  <div>
    <component v-bind:is="whichcomp" :url="cururl"></component>
  </div>
</template>
<script>
import YxtPdf from './pdf.vue'
import YxtOffice from './office.vue'
import YxtAudio from './audio.vue'
import YxtImg from './img.vue'
import YxtUnablePreview from './unablePreview'

export default {
  components: { YxtPdf, YxtOffice, YxtAudio, YxtImg, YxtUnablePreview },
  name: 'YxtViewer',
  props: {
    file: Object,
    url: String,
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  created() {
    this.cururl = this.url
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
  computed: {
    whichcomp() {
      let prefix = ''
      if (this.file) {
        prefix = this.file.name.split('.')[this.file.name.split('.').length - 1]
        if (prefix.indexOf('pdf') > -1) {
          return 'yxt-pdf'
        }
        if (
          prefix.indexOf('ppt') > -1 || prefix.indexOf('pptx') > -1 ||
            prefix.indexOf('doc') > -1 || prefix.indexOf('docx') > -1 ||
            prefix.indexOf('xls') > -1 || prefix.indexOf('xlsx') > -1
        ) {
          if (this.file.size < 5 * 1000 * 1000) {
            return 'yxt-office'
          }
        }
        if (
          prefix.indexOf('jpg') > -1 || prefix.indexOf('jpeg') > -1 ||
            prefix.indexOf('bmp') > -1 || prefix.indexOf('png') > -1
        ) {
          return 'yxt-img'
        }
        if (
          prefix.indexOf('avi') > -1 ||
            prefix.indexOf('mp4') > -1
        ) {
          return 'yxt-video'
        }
        if (
          prefix.indexOf('mp3') > -1
        ) {
          return 'yxt-audio'
        }
      }
      return 'yxt-unable-preview'
    }
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {}
}
</script>
