<template>
  <div class="yxt-biss-app" :key="comp.id" @click.stop="toClick">
      <div class="app-box">
        <div class="float-coner">
          <yxt-svg-icon class="coner-ic" icon="todo_cor"></yxt-svg-icon>
        </div>
        <div class="app-box-content">
          <yxt-svg-icon class="app-box-icon" :icon="getExtyleValue('iconClazz').current"></yxt-svg-icon>
          <span class="app-box-title">{{ comp.panel.content.base_rows[0].value }}</span>
        </div>
      </div>
  </div>
</template>
<script>
import requestConfig from '@yxtui/src/mixins/requestConfig'
import { STANDARD_BASE } from './config.js'

export default {
  base: STANDARD_BASE,
  name: 'YxtStandardApp',
  components: {
  },
  mixins: [requestConfig],
  props: {
    /**
     * 组件基础信息
     */
    comp: {
      type: Object,
      default: () => {
        return STANDARD_BASE
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    toClick() {
      this.actions({
        key: 'toClick',
        obj: this.comp
      })
      const application = this.comp.panel.content.exec_rows.find(r => r.id === 'application')
      window.open(application.value)
    },
    getExtyleValue(key) {
      let value = this.comp.panel.extyle[key]
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
@import './biss-app.scss';
</style>
