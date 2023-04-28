import YxtProgress from './src/index.vue';

YxtProgress.install = function(Vue) {
  Vue.component(YxtProgress.name, YxtProgress);
};

export default YxtProgress;
