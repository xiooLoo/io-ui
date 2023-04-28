import ToTag from './src/tag';

/* istanbul ignore next */
ToTag.install = function(Vue) {
  Vue.component(ToTag.name, ToTag);
};

export default ToTag;
