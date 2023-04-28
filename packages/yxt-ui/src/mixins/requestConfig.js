export default {
  data() {
    return {
      requestConfig: {
        accessToken: this.comp.requestConfig?.accessToken,
        requestUrl: this.comp.requestConfig?.requestUrl
      },
      loadingEl: this.$loading({ text: 'Loading...' })
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadingEl.close()
    }, 5000);
  }
}
