<template>
  <div class="yxt-carousel-panel-content">
    <div class="panel-info-title"><span>{{ panelInfo.title }}</span></div>
    <yxt-collapse :confige="baseConfig">
      <div slot="titleSlot">
         <YxtForm
          ref="baseFormRef"
          label-width="90px"
          :form-items="base_rows"
          :form-key="baseFormKey"
          :isAutoFix="false"
          :rowSpan="1"
          :isShowBtns="false"
          @getFormValues="baseGetFormValues"
          @resetForm="baseResetForm"
        />
      </div>
    </yxt-collapse>
    <yxt-collapse :confige="execConfig">
      <div slot="titleSlot">
         <YxtForm
          ref="execFormRef"
          label-width="90px"
          :form-items="exec_rows"
          :form-key="execFormKey"
          :isAutoFix="false"
          :rowSpan="1"
          :isShowBtns="false"
          :actions="execActions"
          @getFormValues="execGetFormValues"
          @resetForm="execResetForm"
        />
      </div>
    </yxt-collapse>
  </div>
</template>
<script>
export default {
  name: 'YxtBissAppPanelContent',
  props: {
    panelInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      baseConfig: {
        activeNames: 0,
        data: [
          {
            title: '<p style="padding: 0 12px;">基本信息</p>',
            slot: 'titleSlot'
          }
        ]
      },
      execConfig: {
        activeNames: 0,
        data: [
          {
            title: '<p style="padding: 0 12px;">内容</p>',
            slot: 'titleSlot'
          }
        ]
      },
      base_rows: this.panelInfo.panel.content.base_rows,
      exec_rows: this.panelInfo.panel.content.exec_rows,
      baseFormKey: {
        title: this.getBaseFormValue('title', this.panelInfo)
      },
      execFormKey: {
        application: this.getExecFormValue('application', this.panelInfo)
      }
    }
  },
  watch: {
    panelInfo: {
      handler(nval) {
        this.baseFormKey = {
          title: this.getBaseFormValue('title', nval)
        }
        this.execFormKey = {
          application: this.getExecFormValue('application', nval)
        }
      },
      deep: true
    },
    baseFormKey: {
      handler(nval) {
        // console.log('baseFormKey表单变动：', nval)
        this.actions({ key: 'watchBaseFormKey', obj: nval })
      },
      deep: true
    },
    execFormKey: {
      handler(nval) {
        // console.log('execFormKey表单变动：', nval)
        this.actions({ key: 'watchExecFormKey', obj: nval })
      },
      deep: true
    }
  },
  methods: {
    getBaseFormValue(key, newPageInfo, sk = 'value') {
      let item = newPageInfo.panel.content.base_rows.find(i => i.id === key)
      return item[sk]
    },
    getExecFormValue(key, newPageInfo, sk = 'value') {
      let item = newPageInfo.panel.content.exec_rows.find(i => i.id === key)
      return item[sk]
    },
    baseGetFormValues(e) {
      // console.log('base表单内容：', e)
      this.actions({ key: 'baseGetFormValues', obj: e })
    },
    baseResetForm() {
      // console.log('base重置表单')
    },
    execGetFormValues(e) {
      // console.log('exec表单内容：', e)
      this.actions({ key: 'execGetFormValues', obj: e })
    },
    execResetForm() {
      // console.log('exec重置表单')
    },
    execActions(/* key, obj*/) {
      if (key === 'uploadSuccess') {
        // console.log('上传成功：', obj)
      } else if (key === 'uploadError') {
        // console.log('上传异常：', key)
      }
    },
    _submit(btn) {
      this.$refs.baseFormRef.handleTransferAction(btn)
      this.$refs.execFormRef.handleTransferAction(btn)
    },
    /**
     * 配置工作台【当前comp】中的右侧属性面板
     * @param Array arr 布局配置数组，如： LAYOUT_MODE_1()
     * @param Object currentGrid 正在编辑的单个组件，如：LAYOUT_MODE_1().0.comp
     * @param String key 事件key，如：watchBaseFormKey，watchExecFormKey， watchExtyleFormKey
     * @param query 右侧Form表单，如：{ interval: 5, title: '测试标题' }
     */
    _setFormKeys(arr, currentGrid, key, query) {
      const tempArr = this._.cloneDeep(arr)
      let resArr = []
      tempArr.forEach(i => {
        let temp = this._.cloneDeep(i)
        if (temp.comp && temp.comp.xyz && temp.comp.xyz.i === currentGrid.xyz.i) {
          switch (key) {
          case 'watchBaseFormKey': {
            let title = temp.comp.panel.content.base_rows.find(j => j.id === 'title')
            title.value = query.title
            break
          }
          case 'watchExecFormKey': {
            let application = temp.comp.panel.content.exec_rows.find(j => j.id === 'application')
            application.value = query.application
            break
          }
          default:
            break
          }
        }
        resArr.push(temp)
      })
      return resArr
    }
  }
}
</script>
<style lang="scss" scoped>
.yxt-carousel-panel-content {
  .panel-info-title {
    padding: 12px;
  }
}
</style>
