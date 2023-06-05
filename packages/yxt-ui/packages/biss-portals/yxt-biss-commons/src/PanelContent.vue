<template>
  <div class="yxt-biss-commones-content">
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
        <div class="range-slot">
          <div>
            <div class="active-arr" v-for="i in cmpActiveArr" :key="i.value">
              <to-tag size="small">{{ i.label }}</to-tag>
              <to-button size="mini" type="text" @click.prevent="toDelete(i)">删除</to-button>
            </div>
          </div>
        </div>
      </div>
    </yxt-collapse>
  </div>
</template>
<script>
import { getAllCommonFunc, addUserCommonFunc, findCommonFuncByUserId } from '@/api/index'
import Tools from '@yxtui/src/utils/tools'

export default {
  name: 'YxtBissCommonsPanelContent',
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
        minCount: this.getExecFormValue('minCount', this.panelInfo),
        resource: this.getExecFormValue('resource', this.panelInfo)
      },
      arrs: []
    }
  },
  computed: {
    cmpActiveArr() {
      return this.panelInfo.panel.content.exec_rows.find(j => j.id === 'resource').arr.filter(item => this.execFormKey.resource.includes(item.value))
    }
  },
  watch: {
    panelInfo: {
      handler(nval) {
        this.baseFormKey = {
          title: this.getBaseFormValue('title', nval)
        }
        this.execFormKey = {
          minCount: this.getExecFormValue('minCount', nval),
          resource: this.getExecFormValue('resource', nval)
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
  created() {
    this._fetchAllCommonsList()
    this.$eventBus.$on('refresh_commons_panel', () => {
      this._fetchAllCommonsList()
    })
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
    execActions(key, obj) {
      if (key === 'uploadSuccess') {
        // console.log('上传成功：', obj)
      } else if (key === 'uploadError') {
        // console.log('上传异常：', key)
      } else if (key === 'handleSelectChange') {
        if (obj.item.id === 'resource') {
          this.toAddCommons(obj.value)
        }
      }
    },
    toDelete(item) {
      this.execFormKey.resource.remove(item.value)
      this.toAddCommons(this.execFormKey.resource)
    },
    _submit(btn) {
      this.$refs.baseFormRef.handleTransferAction(btn)
      this.$refs.execFormRef.handleTransferAction(btn)
    },
    async _fetchAllCommonsList() {
      const config = { ...this.panelInfo.requestConfig }
      await getAllCommonFunc(config).then(res => {
        if (res && res.code == '0') {
          const resData = res.data.map(v => ({ ...v, isEnable: false }))
          this.exec_rows = Tools.formatArrObject(
            {
              dataList: resData || [],
              labelKey: 'name',
              valueKkey: 'id'
            },
            {
              formItems: this.exec_rows,
              formItemId: 'id',
              formItemKey: 'resource'
            }
          )
          this.fetchCommons()
        }
      })
    },
    async fetchCommons() {
      const config = { ...this.panelInfo.requestConfig }
      await findCommonFuncByUserId(config).then(res => {
        const resData = res.data || []
        resData.map(v => {
          v.isEnable = true
        })
        this.exec_rows.find(r => r.id === 'resource').value = resData.map(i => i.id)
      })
    },
    async toAddCommons(ids) {
      const config = { ...this.panelInfo.requestConfig }
      await addUserCommonFunc(config, ids).then(res => {
        if (res && res.data == 'ok') {
          this.$eventBus.$emit('refresh_commons')
        } else {
          this.$yxtmessage.createElement({ type: 'error', message: '操作异常，请联系管理员' })
        }
      })
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
            let minCount = temp.comp.panel.content.exec_rows.find(j => j.id === 'minCount')
            let resource = temp.comp.panel.content.exec_rows.find(j => j.id === 'resource')
            minCount.value = query.minCount
            resource.value = query.resource
            resource.arr = this.exec_rows.find(r => r.id === 'resource').arr
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
.yxt-biss-commones-content {
  .panel-info-title {
    padding: 12px;
  }
  .active-arr {
    width: 100%;
    height: 30px;
    padding: 2px 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
