/**
 * @author liying
 * Date: 21/09/28
 */
import YxtCarousel from './src/index.vue';

YxtCarousel.install = function(Vue) {
  Vue.component(YxtCarousel.name, YxtCarousel);
};

export default YxtCarousel;
