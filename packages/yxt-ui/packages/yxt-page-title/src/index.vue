<!--详情-->
<template>
  <div
  class="yxt-page-title"
  style="0px 20px">
    <div class="public-title">
      <p
      :style="{
        'border-left':showleftline?'4px solid #1890ff':'none'
      }">{{title}}</p>
      <div class="public-title_right"   v-if="showBack">
        <slot name='left'></slot>
        <div @click="backTitleClick"  class="backTitle"  >{{backTitle}}</div>
        <slot name='right'></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'YxtPageTitle',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    backTitle: {
      type: String,
      default: '返回'
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showleftline: {
      type: Boolean,
      default: true
    },
    defaultGo: {
      type: String,
      default: ''
    },
    defaultBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    backTitleClick() {
      switch (true) {
      case this.$listeners.backClick instanceof Function:
        this.$listeners.backClick();
        break;
      case this.defaultGo !== '':
        if (window.location.href.indexOf('#') == -1) {
          break;
        }
        let url = `${window.location.href.split('#')[0]}#${this.defaultGo}`;
        window.location.href = url;
        break;
      default:
        window.history.back(-1);
        break;
      }
    }
  }
};
</script>

