<template>
    <yxt-grid-layout
      :layout.sync="compLayouts"
      :col-num="colNum"
      :row-height="rowHeight"
      :is-draggable="false"
      :is-resizable="false"
      :is-mirrored="false"
      :responsive="false"
      :vertical-compact="true"
      :margin="[20, 20]"
      :use-css-transforms="true"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <yxt-grid-item
        v-for="item in compLayouts"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <component :is="item.comp.compName" :comp="item.comp"></component>
      </yxt-grid-item>
    </yxt-grid-layout>
</template>

<script>

export default {
  name: 'YxtGridViewer',
  props: {
    bg: {
      type: String,
      default: 'https://pic1.imgdb.cn/item/646f383bf024cca1739ba4d2.jpg'
    },
    colNum: {
      type: [String, Number],
      default: 20
    },
    rowHeight: {
      type: [String, Number],
      default: 24
    },
    requestConfig: {
      type: Object,
      default: null
    },
    layouts: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    compLayouts: {
      get() {
        if (this.requestConfig !== null) {
          this.layouts.map(i => {
            i.comp.requestConfig = this.requestConfig
            return i
          })
        }
        return this.layouts
      },
      set(nval) {
        return nval
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
