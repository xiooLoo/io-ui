import ToButton from './src/button';

/* istanbul ignore next */
ToButton.install = function(Vue) {
  Vue.component(ToButton.name, ToButton);
};

export default ToButton;
