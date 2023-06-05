export default {
  data() {
    return {
      requestConfig: {
        accessToken: this.comp.requestConfig?.accessToken,
        requestUrl: this.comp.requestConfig?.requestUrl,
        roleId: this.comp.requestConfig?.roleId,
        tenantId: this.comp.requestConfig?.tenantId,
        enterpriseCode: this.comp.requestConfig?.enterpriseCode,
        applicationCode: this.comp.requestConfig?.applicationCode,
        applicationId: this.comp.requestConfig?.applicationId
      },
      loadingEl: this.$loading()
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadingEl.close()
    }, 5000);
  }
}
