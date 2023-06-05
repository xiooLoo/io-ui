<!--详情-->
<template>
  <div>
    <yxt-image-view
      class="yxt-img"
      :key="new Date().getTime()"
      :src="url"
      fit="contain"
      :preview-src-list="[url]"
    />
  </div>
</template>

<script>

export default {
  name: 'YxtImg',
  components: {},
  props: {
    url: String
  },
  data() {
    return {cururl: ''}
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
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {}
}
</script>

<style scoped>
  .yxt-img{max-width:100%;margin: 0 auto;display: block;}
</style>
