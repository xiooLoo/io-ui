
<template>
   <to-carousel
     ref="carousel"
     v-bind="$attrs"
     @change="change"
     @click="setActiveItem"
     @prev="prev"
    >
      <to-carousel-item v-for="(item,index) in carouselList" :key="index" :name='item.name' :label="item.label">
         <slot :content="item"></slot>
      </to-carousel-item>
  </to-carousel>
</template>
<script>
import ToCarousel from '../../../../element-ui/packages/carousel'
import ToCarouselItem from '../../../../element-ui/packages/carousel-item'

export default {
  name: 'YxtCarousel',
  components: {
    ToCarousel,
    ToCarouselItem
  },
  props: {
    actions: {
      type: Function,
      default: () => ({})
    },
    carouselList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    change(curIndex, oldIndex) {
      let query = {
        key: 'change',
        curIndex,
        oldIndex
      };
      this.actions(query);
    },
    setActiveItem() {
      this.$refs.carousel.setActiveItem();
    },
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    }
  }
};
</script>
