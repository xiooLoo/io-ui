import ToProgress from './src/progress';

/* istanbul ignore next */
ToProgress.install = function(Vue) {
  Vue.component(ToProgress.name, ToProgress);
};

export default ToProgress;
