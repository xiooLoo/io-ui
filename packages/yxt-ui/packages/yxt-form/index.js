import YxtForm from './src/index.vue';

/* istanbul ignore next */
YxtForm.install = function(Vue) {
  Vue.component(YxtForm.name, YxtForm);
};

export default YxtForm;
