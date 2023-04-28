<template>
  <div :class="[swtype]">
    <to-card  v-bind="$attrs">
      <template v-slot:header>
        <slot name="header"></slot>
      </template>
      <slot></slot>
    </to-card>
  </div>
</template>

<script>
import ToCard from '../../../../element-ui/packages/card'

export default {
  name: 'yxt-card',
  components: {
    ToCard
  },
  props: {
    /**
     * 设置card样式是否显示边框及shadow
     * 可选值：yxt-card-none || yxt-card-sw
     *
     */
    swtype: {
      type: String,
      default: 'yxt-card-none'
    }
  },
  data() {
    return {
    };
  }
};

</script>
<style lang="scss" scoped>
.yxt-card-none {
  border-radius: 0;
  .to-card {
    border: none;
    box-shadow: none;
  }
}
.yxt-card-sw {
  border-radius: 0;
  ::v-deep .to-card__header {
    border-bottom: none;
  }
}
</style>
