<!--
ref:https://docs.videojs.com/tutorial-options.html
-->
<template>
  <audio :src="cururl" controls="controls" class="audio-ctner"></audio>
</template>

<script>

export default {
  name: 'YxtAudio',
  components: { },
  props: {
    url: String
  },
  data() {
    return {
      cururl: this.url
    }
  },
  mounted() {
    console.log('this is current player instance object', this.player)
  },
  computed: {
  },
  created() {
  },
  watch: {
    url: {
      handler(url) {
        this.cururl = url;
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
  .audio-ctner{
    display: block;
    margin: 0 auto;
  }
</style>
