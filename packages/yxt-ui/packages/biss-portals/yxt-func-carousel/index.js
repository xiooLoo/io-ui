import YxtFuncCarousel from './src/index.vue';
import YxtFuncCarouselPanelContent from './src/PanelContent.vue'
import YxtFuncCarouselPanelExtyle from './src/PanelExtyle.vue'

YxtFuncCarousel.install = function (Vue) {
  Vue.component(YxtFuncCarousel.name, YxtFuncCarousel);
};
YxtFuncCarouselPanelContent.install = function (Vue) {
  Vue.component(YxtFuncCarouselPanelContent.name, YxtFuncCarouselPanelContent);
};
YxtFuncCarouselPanelExtyle.install = function (Vue) {
  Vue.component(YxtFuncCarouselPanelExtyle.name, YxtFuncCarouselPanelExtyle);
};

export default {
  YxtFuncCarousel,
  YxtFuncCarouselPanelContent,
  YxtFuncCarouselPanelExtyle
}
