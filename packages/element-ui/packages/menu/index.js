import ToMenu from './src/menu';

/* istanbul ignore next */
ToMenu.install = function(Vue) {
  Vue.component(ToMenu.name, ToMenu);
};

export default ToMenu;
