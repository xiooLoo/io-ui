import ToTable from './src/table';

/* istanbul ignore next */
ToTable.install = function(Vue) {
  Vue.component(ToTable.name, ToTable);
};

export default ToTable;
