import YxtGridViewer from './src/index.vue';

YxtGridViewer.install = function(Vue) {
  Vue.component(YxtGridViewer.name, YxtGridViewer);
};

export default YxtGridViewer;
