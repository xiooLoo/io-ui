import YxtImmovableApp from './src/YxtImmovableApp.vue';
import YxtVehicleApp from './src/YxtVehicleApp.vue';
import YxtEnergyApp from './src/YxtEnergyApp.vue';
import YxtStandardApp from './src/YxtStandardApp.vue';
import YxtSuperviseApp from './src/YxtSuperviseApp.vue';
import YxtBissAppPanelContent from './src/PanelContent.vue'
import YxtBissAppPanelExtyle from './src/PanelExtyle.vue'

YxtImmovableApp.install = function (Vue) {
  Vue.component(YxtImmovableApp.name, YxtImmovableApp);
};
YxtVehicleApp.install = function (Vue) {
  Vue.component(YxtVehicleApp.name, YxtVehicleApp);
};
YxtEnergyApp.install = function (Vue) {
  Vue.component(YxtEnergyApp.name, YxtEnergyApp);
};
YxtStandardApp.install = function (Vue) {
  Vue.component(YxtStandardApp.name, YxtStandardApp);
};
YxtSuperviseApp.install = function (Vue) {
  Vue.component(YxtSuperviseApp.name, YxtSuperviseApp);
};
YxtBissAppPanelContent.install = function (Vue) {
  Vue.component(YxtBissAppPanelContent.name, YxtBissAppPanelContent);
};
YxtBissAppPanelExtyle.install = function (Vue) {
  Vue.component(YxtBissAppPanelExtyle.name, YxtBissAppPanelExtyle);
};

export default {
  YxtImmovableApp,
  YxtVehicleApp,
  YxtEnergyApp,
  YxtStandardApp,
  YxtSuperviseApp,
  YxtBissAppPanelContent,
  YxtBissAppPanelExtyle
}
