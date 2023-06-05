<template>
  <div class="yxt-func-carousel" :key="comp.xyz.i" @click.stop="toClick">
    <to-card class="carousel-card">
      <div v-if="getExtyleValue('titleShow').current === 'block'" slot="header">
        <yxt-icon :icon="getExtyleValue('iconClazz').current"></yxt-icon>
        <span>{{ comp.panel.content.base_rows[0].value }}</span>
        <!-- <span class="card-perfix-border">{{ comp.title }}</span> -->
      </div>
      <to-carousel :type="getExtyleValue('type')" :interval="getBaseFormValue('interval') * 1000" v-bind="$attrs" v-on="$listeners">
        <to-carousel-item v-for="item in getExecFormValue('carouoselPic', 'arr')" :key="item.id" @click.prevent="toClickImg(item)">
          <yxt-image-view :src="item.src" :fit="getExtyleValue('imgMode').current" />
        </to-carousel-item>
      </to-carousel>
    </to-card>
  </div>
</template>
<script>
import requestConfig from '@yxtui/src/mixins/requestConfig'
import ToCarousel from '../../../../../element-ui/packages/carousel'
import ToCarouselItem from '../../../../../element-ui/packages/carousel-item'
import { CAROUSEL_BASE } from './config.js'

export default {
  base: CAROUSEL_BASE,
  name: 'YxtFuncCarousel',
  components: {
    ToCarousel,
    ToCarouselItem
  },
  mixins: [requestConfig],
  props: {
    /**
     * 组件基础信息
     */
    comp: {
      type: Object,
      default: () => {
        return CAROUSEL_BASE
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    toClick() {
      this.actions({
        key: 'toClick',
        obj: this.comp
      })
    },
    toClickImg(item) {
      if (item.dos === 'in') {
        window.open(item.nextSrc)
      } else {
        this.actions({
          key: 'toClickImg',
          obj: item
        })
      }
    },
    getBaseFormValue(key, sk = 'value') {
      let item = this.comp.panel.content.base_rows.find(i => i.id === key)
      return item[sk]
    },
    getExecFormValue(key, sk = 'value') {
      let item = this.comp.panel.content.exec_rows.find(i => i.id === key)
      return item[sk]
    },
    getExtyleValue(key) {
      let value = this.comp.panel.extyle[key]
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';
.yxt-func-carousel {
  width: 100%;
  height: 100%;
  .carousel-card {
    background-color: transparent;
  }
  .os-img-box {
    width: 100%;
    height: 100%;
    .os-img {
      object-fit: fill;
    }
  }
  /deep/ .to-card {
    height: 100%;
    border: none;
    .to-card__body {
      height: calc(100% - 48px);
    }
  }
}
</style>
