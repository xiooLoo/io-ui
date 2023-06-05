import YxtBissCommons from './src/index.vue';
import YxtBissCommonsPanelContent from './src/PanelContent.vue';
import YxtBissCommonsPanelExtyle from './src/PanelExtyle.vue';

YxtBissCommons.install = function(Vue) {
  Vue.component(YxtBissCommons.name, YxtBissCommons);
};
YxtBissCommonsPanelContent.install = function (Vue) {
  Vue.component(YxtBissCommonsPanelContent.name, YxtBissCommonsPanelContent);
};
YxtBissCommonsPanelExtyle.install = function (Vue) {
  Vue.component(YxtBissCommonsPanelExtyle.name, YxtBissCommonsPanelExtyle);
};

export default {
  YxtBissCommons,
  YxtBissCommonsPanelContent,
  YxtBissCommonsPanelExtyle
}
