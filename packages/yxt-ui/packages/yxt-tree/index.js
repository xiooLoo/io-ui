import YxtTree from './src/index.vue';

YxtTree.install = function (Vue) {
  Vue.component(YxtTree.name, YxtTree);
};

export default YxtTree;
