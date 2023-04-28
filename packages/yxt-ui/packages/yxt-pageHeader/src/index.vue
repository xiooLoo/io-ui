<!--
 *  功能：  头部
 *  入参：
  message:       [必传]标题
 *  用法：
  <template>
    <YxtPageHeader :message="message"  />
  </template>
-->
<template>
  <div class="yxt-page-header">
    <div class="yxt-page-header-top">
      <div class="left-content">
        <span :class="isShowColor? 'left-cut': ''" />
        <p>{{ message }}</p>
      </div>
      <to-button
        v-if="hasBack"
        :type="backType"
        class="botton-class"
        size="small"
        @click="goback"
      >
        {{ backText }}
      </to-button>
    </div>
    <div class="yxt-page-header-content">
      <slot name="settingTabs" />
    </div>
  </div>
</template>
<script>
import ToButton from '../../../../element-ui/packages/button'

export default {
  name: 'YxtPageHeader',
  components: {
    ToButton
  },
  props: {
    /**
     * 页面标题
     * 【必传】
     */
    message: {
      type: String,
      default: '标题'
    },
    /*
    * 是否有返回按钮
    */
    hasBack: {
      type: Boolean,
      default: true
    },
    /**
     *  按钮名称
     * 【非必传】
     */
    backText: {
      type: String,
      default: '返回'
    },
    /*
    * 按钮类型
    */
    backType: {
      type: String,
      default: 'text'
    },
    /**
     *  需特殊处理返回
     * 【非必传】
     */
    isHandle: {
      type: Boolean,
      default: false
    },
    /**
     *  是否显示左侧样式
     * 【非必传】
     */
    isShowColor: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 返回
    goback() {
      if (this.isHandle) {
        this.$emit('goback')
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
