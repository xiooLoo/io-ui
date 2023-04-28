import YxtBissApps from './src/index.vue';

/* istanbul ignore next */
YxtBissApps.install = function(Vue) {
  Vue.component(YxtBissApps.name, YxtBissApps);
};

export default YxtBissApps;
