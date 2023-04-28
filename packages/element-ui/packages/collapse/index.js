import ToCollapse from './src/collapse';

/* istanbul ignore next */
ToCollapse.install = function(Vue) {
  Vue.component(ToCollapse.name, ToCollapse);
};

export default ToCollapse;

