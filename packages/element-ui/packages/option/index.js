import ToOption from '../select/src/option';

/* istanbul ignore next */
ToOption.install = function(Vue) {
  Vue.component(ToOption.name, ToOption);
};

export default ToOption;
