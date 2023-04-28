import ToBreadcrumbItem from '../breadcrumb/src/breadcrumb-item';

/* istanbul ignore next */
ToBreadcrumbItem.install = function(Vue) {
  Vue.component(ToBreadcrumbItem.name, ToBreadcrumbItem);
};

export default ToBreadcrumbItem;
