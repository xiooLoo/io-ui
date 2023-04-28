import ToTabs from './src/tabs';

/* istanbul ignore next */
ToTabs.install = function(Vue) {
  Vue.component(ToTabs.name, ToTabs);
};

export default ToTabs;
