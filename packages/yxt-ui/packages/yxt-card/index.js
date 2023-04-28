import YxtCard from './src/index.vue';

YxtCard.install = function(Vue) {
  Vue.component(YxtCard.name, YxtCard);
};

export default YxtCard;
