<template>
  <div>
    <to-dialog
      :visible.sync="isVisible"
      :width="width"
      :destroy-on-close="isDestroyOnClose"
      :modal-append-to-body="isModalAppendToBody"
      :append-to-body="isAppendToBody"
      :show-close="isShowClose"
      :close-on-click-modal="isModalclose"
      :top="top"
      :custom-class="customClass"
      :z-index="zIndex"
      @close="dialogDidClosed"
    >
      <div class="dialog-title" slot="title">
        <div v-if="dialogInfo.title"  class="promit-title">
          <yxt-icon v-if="dialogInfo.tipIcon && dialogInfo.tipIcon.length" :icon="dialogInfo.tipIcon" :color="dialogInfo.iconColor" v-bind="$attrs"></yxt-icon>
          <!-- <span v-if="dialogInfo.tipIcon && dialogInfo.tipIcon.length" class="promit-title-icon" :class="[dialogInfo.tipIcon, cmpTipColor(dialogInfo.tipIcon)]" /> -->
        </div>
        <div class="dialog-box-i">
          <span class="promit-tip">{{ dialogInfo.title }}</span>
        </div>
      </div>
      <div class="dialog-box">
        <div class="dialog-box-i">
          <slot />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <to-button
          v-for="btn in dialogInfo.btns"
          class="footer-btn"
          :key="btn.value"
          :type="btn.type"
          :size="btn.size || 'mini'"
          :disabled="btn.disabled"
          @click="handleActions(btn)"
        >
          {{ btn.label }}
        </to-button>
      </span>
    </to-dialog>
  </div>
</template>
<script>
import YxtIcon from '../../yxt-icon'

export default {
  name: 'YxtDialog',
  component: {
    YxtIcon
  },
  props: {
    width: {
      type: String,
      default: '480px'
    },
    customClass: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '15vh'
    },
    isDestroyOnClose: {
      type: Boolean,
      default: false
    },
    isModalAppendToBody: {
      type: Boolean,
      default: true
    },
    isAppendToBody: {
      type: Boolean,
      default: false
    },
    isShowClose: {
      type: Boolean,
      default: false
    },
    /**
     *  点击 modal 关闭 Dialog
     */
    isModalclose: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: String,
      default: '1000'
    },
    dialogInfo: {
      type: Object,
      default: function() {
        return {
          btns: [
            { label: '确定', value: 'sure', type: 'primary' },
            { label: '其他', value: 'oth', type: 'bl' },
            { label: '取消', value: 'cancel', type: 'normal' }
          ],
          tipIcon: 'to-icon-warning',
          title: '提示'
        }
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    actions: {
      type: Function
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    openOrClose() {
      this.isVisible = !this.isVisible
    },
    handleActions(btn) {
      this.actions(btn)
    },
    dialogDidClosed() {
      this.$emit('dialogDidClosed')
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .to-dialog__header {
  padding: 32px 32px 4px;
  font-size: 16px;
  color: #14203B;
  font-weight: bold;
}
/deep/ .to-dialog__body {
  padding: 10px 32px 6px;
  max-height: 50vh;
  overflow-y: auto;
}
.dialog-title{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  .dialog-box-i {
    margin-left: 8px;
  }
  .promit-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8px;
    height: 8px;
  }
}
.to-dialog__body {
.dialog-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 80px;
}
.dialog-box-i {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .promit-tip {
    font-size: 16px;
    color: #14203B;
    font-weight: 600;
    margin-bottom: 8px;
  }
}
}
.warning-icon {
  color: #FA9513;
}
.delete-icon {
  color: #F5242C;
}
/deep/.to-textarea {
  margin-top: 20px;
}
</style>
