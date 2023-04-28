import ToDropdownMenu from '../dropdown/src/dropdown-menu';

/* istanbul ignore next */
ToDropdownMenu.install = function(Vue) {
  Vue.component(ToDropdownMenu.name, ToDropdownMenu);
};

export default ToDropdownMenu;
