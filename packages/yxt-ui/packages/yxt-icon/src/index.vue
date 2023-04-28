<template>
  <span :class="'yxt-icon iconfont icon-' + icon" :style="'font-size: ' + size + 'px; color: ' + color + ';'"></span>
</template>

<script>
export default {
  name: 'YxtIcon',
  props: {
    icon: String,
    size: {
      type: String,
      default: '16'
    },
    color: String
  }
};
</script>
