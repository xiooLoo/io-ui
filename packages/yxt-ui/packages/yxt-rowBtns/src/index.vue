<template>
  <div v-if="rowBtns.length > 0" :style="extyle">
    <!-- class="actions-btns-box" -->
    <template v-for="btn in rowBtns">
      <template v-if="btn.isIcon">
        <to-tooltip
          v-show="btn.code"
          :key="btn.value"
          :effect="tooltipConfig.effect"
          :content="btn.label"
          :placement="tooltipConfig.placement"
        >
          <span class="table-action-icon" :class="[btn.icon]" @click="handleAction(btn, rowData)" />
        </to-tooltip>
      </template>
      <template v-else-if="btn.isUpload">
        <MyFileUpload
          v-show="btn.code"
          :key="btn.value"
          v-bind="$attrs"
          v-on="$listeners"
          @on-success="handleSuccess">
          <template #btn>
            <slot name="uploadHandle">
              <to-button type="primary" size="mini" class="yxt-base-button-type-lightblue">上传文件</to-button>
            </slot>
          </template>
        </MyFileUpload>
      </template>
      <template v-else>
        <to-button
          v-if="isBtnShowFun(rowData, btn)"
          :key="btn.value"
          :style="{display: btn.code? btn.isshow ? rowData[btn.isshow] : 'block' : 'none'}"
          :type="btn.type"
          :size="btn.size || 'small'"
          :disabled="btn.disabled"
          @click="handleAction(btn, rowData)"
        >
          <slot v-if="btn.diy" name="diy" :label="btn.label" />
          <template v-else>{{ btn.label }}</template>
        </to-button>
      </template>
    </template>
  </div>
</template>
<script>
import ToTooltip from '../../../../element-ui/packages/tooltip'
import ToButton from '../../../../element-ui/packages/button'
import MyFileUpload from './myFileUpload';

export default {
  name: 'YxtRowBtns',
  components: {
    MyFileUpload,
    ToTooltip,
    ToButton
  },
  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
    /**
     * 按钮集合 必填
     */
    rowBtns: {
      required: true,
      type: Array,
      default: () => [
        /* { label: '新增', value: 'add', type: 'normal' },
        { label: '删除', value: 'del', type: 'primary', disabled: false },
        { label: '编辑', value: 'edit', isIcon: true, icon: 'to-icon-warning' }*/
      ]
    },
    /**
     * 按钮flex布局，自定义Style
     */
    extyle: {
      type: Object,
      default: () => {
        return {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }
      }
    },
    /**
     * 所有@click 事件，通过key区分事件具体类型
     */
    actions: {
      type: Function,
      default: () => ({})
    }
  },
  methods: {
    isBtnShowFun(row, btnObj) {
      if (btnObj.btnAuthorityFun) {
        let isShow = true
        this.$emit('isBtnShowFun', row, btnObj, type => {
          isShow = type
        })
        return isShow
      } else {
        return true
      }
    },
    handleAction(btn, row) {
      this.actions({ key: 'handleAction', obj: { btn, row }})
    },
    handleSuccess(res, file, fileList) {
      this.$emit('on-add-file', res, file, fileList)
    }
  }
}
</script>
