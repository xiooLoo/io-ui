import ToOptionGroup from '../select/src/option-group';

/* istanbul ignore next */
ToOptionGroup.install = function(Vue) {
  Vue.component(ToOptionGroup.name, ToOptionGroup);
};

export default ToOptionGroup;
