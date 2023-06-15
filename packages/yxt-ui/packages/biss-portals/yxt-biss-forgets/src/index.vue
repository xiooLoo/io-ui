<template>
  <div class="yxt-biss-forgets" @click.stop="toClick">
    <to-card class="forgets-card">
      <div slot="header" class="title-flex">
        <div class="title-flex-lf">
          <yxt-svg-icon :icon="getExtyleValue('iconClazz').current" style="width:20px;margin: 0 6px 0 10px"></yxt-svg-icon>
          <span>{{ comp.panel.content.base_rows[0].value }}</span>
        </div>
        <span slot="reference" class="forgets-tabs" style="float: right;">
          <span class="tabs-item" :class="activeTab === 'unfinish' ? 'active-tab' : 'unactive-tab'" @click="toChangeTab('unfinish')">未完成</span>
          <span class="tabs-item" :class="activeTab === 'finished' ? 'active-tab' : 'unactive-tab'" @click="toChangeTab('finished')">已完成</span>
          <yxt-svg-icon icon="common_add" style="font-size:24px;cursor:pointer;" @click.stop="toAdd"></yxt-svg-icon>
        </span>
      </div>
      <div class="forgets-list">
        <template v-for="(item, index) in forgetsArr">
          <div :key="index" class="list-item" @click="toEdit(item)">
              <div class="list-item-link">
                <yxt-svg-icon class="sub-icon" icon="common_time" style="width:16px;margin: 0 6px 0 10px"></yxt-svg-icon>
              </div>
              <div class="list-item-right">
                <div class="list-item-ups">
                  <span>{{ item.deadline || item.updateAt  }}</span>
                  <to-tooltip :content="item.content" placement="top">
                    <span>{{ item.content }}</span>
                  </to-tooltip>
                </div>
                <div class="list-item-sub">
                  <to-tooltip v-if="activeTab === 'unfinish'" content="完成" placement="top">
                    <yxt-svg-icon class="sub-icon" icon="common_ok" @click.stop="toFinish(item.id, '1')"></yxt-svg-icon>
                  </to-tooltip>
                  <to-tooltip v-else content="撤回" placement="top">
                    <yxt-svg-icon class="sub-icon" icon="common_reback"  @click.stop="toFinish(item.id, '0')"></yxt-svg-icon>
                  </to-tooltip>
                </div>
              </div>
          </div>
        </template>
      </div>
    </to-card>
    <yxt-dialog
      ref="yxtDialogRef"
      width="796px"
      :isAppendToBody="true"
      :isModalclose="false"
      :isShowClose="true"
      :isDestroyOnClose="true"
      :dialogInfo="dialogConfig"
      :actions="dialogActions"
      @dialogDidClosed="dialogDidClosed"
    >
      <div class="card-item-next-content">
        <div>
          <YxtForm
            ref="addFormRef"
            label-width="90px"
            :form-items="ADD_FORMS"
            :form-key="addFormKey"
            :isAutoFix="false"
            :rowSpan="1"
            :isShowBtns="false"
            :actions="formActions"
            @getFormValues="addGetFormValues"
            @resetForm="addResetForm"
          />
        </div>
      </div>
    </yxt-dialog>
  </div>
</template>
<script>
import YxtDialog from '../../../yxt-dialog'
import ToCard from '../../../../../element-ui/packages/card'
import { FORGETS_BASE, ADD_FORMS } from './config.js'
import { fetchRemarkList, apiFinishRemark, apiGetByType, apiAddRemark, apiUpdateRemark, apiDetailRemark, apiDeleteRemark } from '@/api/index'
import mixin_requestConfig from '@yxtui/src/mixins/requestConfig'
import Tools from '@yxtui/src/utils/tools'

export default {
  base: FORGETS_BASE,
  name: 'YxtBissForgets',
  components: {
    YxtDialog,
    ToCard
  },
  mixins: [mixin_requestConfig],
  props: {
    comp: {
      type: Object,
      default: () => {
        return FORGETS_BASE
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      ADD_FORMS,
      forgetsArr: [],
      unfinishList: [],
      finishedList: [],
      currentFile: {},
      activeTab: 'unfinish',
      tag: 'add', // 'add' | 'edit'
      addFormKey: {},
      dialogConfig: {
        coxbtn: { label: '删除', value: 'delete', type: 'danger', size: 'medium' },
        btns: [
          { label: '取消', value: 'reset', type: 'normal', size: 'medium' },
          { label: '确定', value: 'fetch', type: 'primary', size: 'medium' }
        ],
        tipIcon: 'uiicon icon-Time',
        iconColor: '#2E78FF',
        title: '新建备忘'
      }
    }
  },
  created() {
    this.getRemarkList()
    this.fetchType()
  },
  methods: {
    toClick() {
      this.actions({
        key: 'toClick',
        obj: this.comp
      })
    },
    toDownload(item) {
      this.$message({ type: 'warning', message: `下载功能开发中...${item.fileName}` })
    },
    getExtyleValue(key) {
      let value = this.comp.panel.extyle[key]
      return value
    },
    toChangeTab(tag) {
      this.activeTab = tag
      this.getRemarkList()
    },
    toAdd() {
      this.tag = 'add'
      this.dialogConfig.title = '新建备忘'
      const obj = this.dialogConfig.btns.find(o => o.value === 'delete')
      obj ? this.dialogConfig.btns.remove(obj) : null
      this.$refs.yxtDialogRef.openOrClose()
    },
    toEdit(item) {
      this.tag = 'edit'
      this.dialogConfig.title = '编辑备忘'
      this.dialogConfig.btns.push(this.dialogConfig.coxbtn)
      this.$refs.yxtDialogRef.openOrClose()
      this.fetchDetail(item.id, dt => {
        this.addFormKey = dt
        this.ADD_FORMS.map(i => {
          if (i.id === 'memoReminderType') {
            if (this.addFormKey.deadline) {
              i.hidden = false
            } else {
              i.hidden = true
            }
          }
          return i
        })
      })
    },
    formActions(key) {
      if (key === 'changeDatePicker') {
        this.ADD_FORMS.map(i => {
          if (i.id === 'memoReminderType') {
            if (this.addFormKey.deadline) {
              i.hidden = false
            } else {
              i.hidden = true
            }
          }
          return i
        })
      }
    },
    dialogActions(btn) {
      this.$refs.addFormRef.handleTransferAction(btn)
      if (btn.value === 'delete') {
        const h = this.$createElement
        this.$msgbox({
          title: '操作确认',
          message: h('p', null, [
            h('h3', null, '确认删除该备忘吗？'),
            h('p', {
              style: 'color: #666666'
            }, '该操作不可恢复')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const config = { ...this.requestConfig }
          apiDeleteRemark(config, this.addFormKey.id).then(res => {
            if (res && res.code == '0') {
              this.$message({ type: 'success', message: '已删除' })
              this.$refs.yxtDialogRef.openOrClose()
              this.getRemarkList()
            } else {
              this.$message({ type: 'error', message: `操作异常：${res.msg}` })
            }
          })
        })
      } else if (btn.value === 'reset') {
        this.$refs.yxtDialogRef.openOrClose()
      }
    },
    dialogDidClosed() {
      const obj = this.dialogConfig.btns.find(o => o.value === 'delete')
      obj ? this.dialogConfig.btns.remove(obj) : null
    },
    addGetFormValues(e) {
      if (this.tag === 'add') {
        this.fetchAdd(e)
      } else {
        this.fetchEdit(e)
      }
    },
    addResetForm() {
      this.addFormKey = {}
    },
    async fetchAdd(params) {
      const config = { ...this.requestConfig }
      if (!params.memoReminderType) {
        params.memoReminderType = 'none'
      }
      await apiAddRemark(config, params).then(res => {
        if (res && res.code == '0') {
          this.$message({ type: 'success', message: '新增成功' })
          this.$refs.yxtDialogRef.openOrClose()
          this.getRemarkList()
        } else {
          this.$message({ type: 'error', message: `操作异常：${res.msg}` })
        }
      })
    },
    async fetchDetail(id, callback) {
      const config = { ...this.requestConfig }
      await apiDetailRemark(config, id).then(res => {
        if (res && res.code == '0') {
          callback(res.data)
        }
      })
    },
    async fetchEdit(params) {
      const config = { ...this.requestConfig }
      if (!params.memoReminderType) {
        params.memoReminderType = 'none'
      }
      await apiUpdateRemark(config, params).then(res => {
        if (res && res.code == '0') {
          this.$message({ type: 'success', message: '编辑成功' })
          this.$refs.yxtDialogRef.openOrClose()
          this.getRemarkList()
        } else {
          this.$message({ type: 'error', message: `操作异常：${res.msg}` })
        }
      })
    },
    // 获取备忘清单列表
    async getRemarkList() {
      const config = { ...this.requestConfig }
      await fetchRemarkList(config).then(res => {
        if (res && res.code == '0') {
          const unfinishList = res.data.find(i => i.status == 0).value || []
          const finishedList = res.data.find(i => i.status == 1).value || []
          if (this.activeTab === 'unfinish') {
            this.forgetsArr = unfinishList
          } else {
            this.forgetsArr = finishedList
          }
        }
      })
    },
    async toFinish(id, status) {
      const config = { ...this.requestConfig }
      await apiFinishRemark(config, { id, status }).then(res => {
        if (res && res.code == '0') {
          this.$message({ type: 'success', message: '操作成功' })
          this.getRemarkList()
        } else {
          this.$message({ type: 'error', message: `操作异常：${res.msg}` })
        }
      })
    },
    async fetchType() {
      const config = { ...this.requestConfig }
      await apiGetByType(config, 'memo_reminder_type').then(res => {
        if (res && res.code == '0') {
          this.ADD_FORMS = Tools.formatArrObject(
            {
              dataList: res.data || [],
              labelKey: 'dictKey',
              valueKkey: 'dictCode'
            },
            {
              formItems: ADD_FORMS,
              formItemId: 'id',
              formItemKey: 'memoReminderType'
            }
          )
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';
@import '../../../../../assets/scss/yxt-mixin.scss';

.yxt-biss-forgets {
  height: 100%;
  .forgets-card {
    background-color: rgba(255,255,255,0.6);
  }
  .title-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-height: 24px;
    &-lf {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .forgets-tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .active-tab {
      color: $yxt-color-primary;
    }
    .unactive-tab {
      color: $yxt-color-info;
    }
    .forgets-tab-add {
      cursor: pointer;
      font-size: 20px;
      color: $yxt-color-primary;
    }
    .tabs-item {
      cursor: pointer;
      margin-right: 24px;
      font-size: 14px;
    }
  }
  /deep/ .to-card {
    height: 100%;
    border: none;
    .to-card__body {
      height: calc(100% - 48px);
    }
  }
  .forgets-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: inherit;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .list-item {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 50px;
      padding: 12px 0;
      border-bottom: 1px dashed $yxt-color-info-hex-d8dade;
      .list-item-link {
        font-size: 16px;
        color: $yxt-color-primary;
      }
      .list-item-right {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 12px;
        .list-item-ups {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          & > span:nth-child(1) {
            padding-right: 8px;
            white-space: nowrap;
            color: $yxt-color-grey-50;
            font-size: 14px;
          }
          & > span:nth-child(2) {
            @include mixin_ellipsis_more();
          }
        }
        .list-item-sub {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          .sub-icon {
            display: none;
            width:20px;
            margin: 0 6px 0 10px;
          }
        }
      }
      .list-item-right:hover {
        .sub-icon {
          display: block;
          width:20px;
          margin: 0 6px 0 10px;
        }
      }
    }
  }
}
</style>
