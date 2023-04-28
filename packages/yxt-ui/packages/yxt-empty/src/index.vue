<template>
  <div class="yxt-empty">
    <div v-if="type === 'T'" class="yxt-empty-t-box">
      <div v-if="isCustom === 'yxtIcon'" class="yxt-empty-img">
        <yxt-icon :icon="icon" v-bind="$attrs" :style="imgStyle"></yxt-icon>
        <ContentT v-show="hasContent" v-bind="$attrs"></ContentT>
      </div>
      <div v-else-if="isCustom === 'svg'" class="yxt-empty-img">
        <yxt-svg-icon :icon="icon" :style="imgStyle"></yxt-svg-icon>
        <ContentT v-show="hasContent" v-bind="$attrs"></ContentT>
      </div>
      <div v-else-if="isCustom === 'img'" class="yxt-empty-img">
        <img :src="icon" :alt="iconAlt" :style="imgStyle"/>
        <ContentT v-show="hasContent" v-bind="$attrs"></ContentT>
      </div>
      <slot v-else></slot>
    </div>
    <div v-else-if="type === 'H'" class="yxt-empty-h-box">
      <div v-if="isCustom === 'yxtIcon'" class="yxt-empty-img">
        <yxt-icon :icon="icon" v-bind="$attrs" :style="imgStyle"></yxt-icon>
        <ContentH v-show="hasContent" v-bind="$attrs"></ContentH>
      </div>
      <div v-else-if="isCustom === 'svg'" class="yxt-empty-img">
        <yxt-svg-icon :icon="icon" :style="imgStyle"></yxt-svg-icon>
        <ContentH v-show="hasContent" v-bind="$attrs"></ContentH>
      </div>
      <div v-else-if="isCustom === 'img'" class="yxt-empty-img">
        <img :src="icon" :alt="iconAlt" :style="imgStyle" />
        <ContentH v-show="hasContent" v-bind="$attrs"></ContentH>
      </div>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import ContentT from './ContentT.vue'
import ContentH from './ContentH.vue'

export default {
  name: 'YxtEmpty',
  components: {
    ContentT,
    ContentH
  },
  props: {
    /**
     * 是否自定义图片
     */
    isCustom: {
      type: String,
      require: true,
      default: 'slot' // yxtIcon || svg || img || slot
    },
    /**
     * @布局类型  上下结构（T）  ||  左右结构（H）
     */
    type: {
      type: String,
      default: 'T' // T || H
    },
    /**
     * @param isCustom === 'yxtIcon'   默认：icon = 403
     * @param isCustom === 'svg'   默认：icon = 403
     * @param isCustom === 'img'   默认：icon = https://pic2.imgdb.cn/item/643e33620d2dde577757401d.png
     * @param isCustom === 'slot'  无默认，外部定义slot
     */
    icon: {
      type: String,
      default: '403'
    },
    /**
     * 图片Alt占位文字
     */
    iconAlt: {
      type: String,
      default: '~提示~'
    },
    hasContent: {
      type: Boolean,
      default: true
    },
    imgStyle: {
      type: String,
      default: 'width:30vh;height:10vh;'
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.yxt-empty {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .yxt-empty-t-box {
    .yxt-empty-img {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .yxt-empty-h-box {
    .yxt-empty-img {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
