import YxtBissTodos from './src/index.vue';
import YxtBissTodosPanelContent from './src/PanelContent.vue';
import YxtBissTodosPanelExtyle from './src/PanelExtyle.vue';

YxtBissTodos.install = function(Vue) {
  Vue.component(YxtBissTodos.name, YxtBissTodos);
};
YxtBissTodosPanelContent.install = function(Vue) {
  Vue.component(YxtBissTodosPanelContent.name, YxtBissTodosPanelContent);
};
YxtBissTodosPanelExtyle.install = function(Vue) {
  Vue.component(YxtBissTodosPanelExtyle.name, YxtBissTodosPanelExtyle);
};

export default {
  YxtBissTodos,
  YxtBissTodosPanelContent,
  YxtBissTodosPanelExtyle
};
