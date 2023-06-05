import YxtBissDataCenter from './src/index.vue';
import YxtBissDataCenterPanelContent from './src/PanelContent.vue';
import YxtBissDataCenterPanelExtyle from './src/PanelExtyle.vue';

YxtBissDataCenter.install = function(Vue) {
  Vue.component(YxtBissDataCenter.name, YxtBissDataCenter);
};
YxtBissDataCenterPanelContent.install = function(Vue) {
  Vue.component(YxtBissDataCenterPanelContent.name, YxtBissDataCenterPanelContent);
};
YxtBissDataCenterPanelExtyle.install = function(Vue) {
  Vue.component(YxtBissDataCenterPanelExtyle.name, YxtBissDataCenterPanelExtyle);
};

export default {
  YxtBissDataCenter,
  YxtBissDataCenterPanelContent,
  YxtBissDataCenterPanelExtyle
};
