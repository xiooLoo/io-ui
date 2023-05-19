<template>
  <to-drawer
    :visible.sync="isVisible"
    :size="size"
    :z-index="zIndex"
    :destroy-on-close="isDestroyOnClose"
    :append-to-body="isAppendToBody"
    :show-close="isShowClose"
    :wrapperClosable="isModalclose"
    :with-header="false"
    :close-on-press-escape="false"
    @close="drawerClose"
    @opened="drawerOpen"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="drawer-top">
      <p slot="title" class="single-dialog-title">{{ title }}</p>
      <div class="clone-btn-box"><i class="uiicon iconclose" @click="openOrClose" /></div>
    </div>
    <div class="my-drawer">
      <div class="my-drawer-content">
        <slot name="content" />
      </div>
      <div class="footer-box">
          <div class="footer-box-tip">
            <slot name="tipslot"></slot>
          </div>
        <to-button
          v-for="btn in dialogInfo.btns"
          :key="btn.value"
          :type="btn.type"
          :size="btn.size || 'mini'"
          :class="btn.type === 'primary' ? 'global_button_i' : btn.type === 'normal' ? 'global_button_iii' : btn.type === 'text' ? '' : 'global_button_ii'"
          :disabled="btn.disabled"
          @click="handleActions(btn)"
          v-bind="$attrs"
          v-on="$listeners"
        >
          {{ btn.label }}
        </to-button>
      </div>
    </div>
  </to-drawer>
</template>
<script>
import ToButton from '../../../../element-ui/packages/button'
import ToDrawer from '../../../../element-ui/packages/drawer'

export default {
  name: 'YxtDrawer',
  components: {
    ToButton,
    ToDrawer
  },
  props: {
    zIndex: {
      type: String,
      default: '1010'
    },
    size: {
      type: String,
      default: '30%'
    },
    isDestroyOnClose: {
      type: Boolean,
      default: false
    },
    isAppendToBody: {
      type: Boolean,
      default: true
    },
    isShowClose: {
      type: Boolean,
      default: false
    },
    /**
     *  点击 modal 关闭 Dialog
     */
    isModalClose: {
      type: Boolean,
      default: false
    },
    dialogInfo: {
      type: Object,
      default: function() {
        return {
          btns: [
            { label: '确定',
              value: 'sure',
              type: 'primary' },
            { label: '其他',
              value: 'oth',
              type: 'bl' },
            { label: '取消',
              value: 'cancel',
              type: 'normal' }
          ]
        };
      }
    },
    title: {
      type: String,
      default: '提示'
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    openOrClose() {
      this.isVisible = !this.isVisible;
    },
    handleActions(btn) {
      this.actions(btn);
    },
    drawerClose() {
      this.$emit('drawerClose');
    },
    drawerOpen() {
      this.$emit('opened')
    }
  }
};
</script>
<style lang="scss" scoped>

/deep/ .to-drawer__header {
  margin-bottom: 24px;
}
.my-drawer {
  height: calc(100vh - 113px);
  overflow:auto;
}
.my-drawer-content {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.drawer-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #14203B;
    padding: 0 10px;
    height: 50px;
    border-bottom:solid 1px #EBECEE;
    font-size: 16px;
    p{
      margin: 10px 0;
      padding-left: 14px;
      font-weight:bold;
    }
    .clone-btn-box{
      cursor: pointer;
      i{
        font-size: 16px;
      }
    }
  }
.footer-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 24px;
  bottom: 24px;
  &-tip {
    margin: 0 48px;
  }
}
</style>
