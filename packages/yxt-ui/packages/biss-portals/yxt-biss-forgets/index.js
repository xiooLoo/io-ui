import YxtBissForgets from './src/index.vue';
import YxtBissForgetsPanelContent from './src/PanelContent.vue';
import YxtBissForgetsPanelExtyle from './src/PanelExtyle.vue';

YxtBissForgets.install = function(Vue) {
  Vue.component(YxtBissForgets.name, YxtBissForgets);
};
YxtBissForgetsPanelContent.install = function(Vue) {
  Vue.component(YxtBissForgetsPanelContent.name, YxtBissForgetsPanelContent);
};
YxtBissForgetsPanelExtyle.install = function(Vue) {
  Vue.component(YxtBissForgetsPanelExtyle.name, YxtBissForgetsPanelExtyle);
};

export default {
  YxtBissForgets,
  YxtBissForgetsPanelContent,
  YxtBissForgetsPanelExtyle
};
