<template>
  <div class="super-form-container">
      <section class="section-box special-style" v-for="(section, index) in sectionProps" :key="index">
       <div class="section-head" v-if="sectionProps[index].title">
        <div>{{sectionProps[index].title}}</div>
       </div>
       <div class="section-body">
         <YxtForm
            :id="index"
            ref="formRef"
            :isShowBtns="false"
            v-bind="sectionProps[index]"
            v-on="$listeners"
            :actions="handleTableActions"
             @getFormValues="getFormValue"
         ></YxtForm>
       </div>
      </section>
      <section class="form-footer "  :style="footStyle" v-if="isShowBtns">
        <div class="btn-wrapper">
          <to-button @click="handleCancel">取消</to-button>
          <to-button type="primary" @click="handleSubmit">提交</to-button>
        </div>
      </section>
  </div>
</template>
<script>
import YxtForm from '../../../yxt-form'
import ToButton from '../../../../../element-ui/packages/button'

export default {
  name: 'YxtBissForm',
  components: {
    YxtForm,
    ToButton
  },
  props: {
    actions: {
      type: Function,
      default: () => ({})
    },
    sectionProps: {
      type: Array,
      default: () => []
    },
    isShowBtns: {
      type: Boolean,
      default: true
    },
    footStyle: {
      type: Object
    }
  },
  data() {
    return {
      formData: {},
      callNum: 0
    }
  },
  methods: {
    handleTableActions(key, data) {
      this.actions(key, data);
    },
    handleSubmit() {
      this.callNum = 0
      const formRefs = this.$refs.formRef
      const fetchBtn = { label: '保存', value: 'fetch', type: 'primary', code: true }
      formRefs.forEach(comp => {
        comp.handleTransferAction(fetchBtn)
      })
    },
    getFormValue(data, id) {
      this.callNum++
      this.formData[id] = data
      if (this.callNum === this.sectionProps.length && Object.keys(this.formData).length === this.sectionProps.length) {
        // 将数据返回出去
        let resObj = {}
        for (const key in this.formData) {
          for (const key2 in this.formData[key]) {
            resObj[key2] = this.formData[key][key2]
          }
        }
        return resObj
      }
    },
    handleCancel() {
      this.actions('cancel')
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
    /deep/ .yxt-form{
      padding: 0 16px;
    }
    /deep/ .to-form-item__label{
      padding: 0px;
    }
    /deep/ .to-form-item{
      margin-bottom: 8px;
    }
  .section-box {
    background: #fff;
    border-radius: 2px;
    .section-head {
      padding:16px 24px;
      border-bottom: 1px solid #EDEEF0;
      .section-title {
        font-size: 16 px;
        font-weight: 500;
      }
    }
    .section-body {
      padding-bottom: 24px;
    }
  }
  .special-style {
    margin-bottom: 24px;
  }
.form-footer {
  position: fixed;
  bottom: 0px;
  right: 24px;
  height: 56px;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}


</style>
