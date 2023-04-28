/**
 * @author xiooLoo
 * Date: 21/07/03
 */
import yxtPageTitle from './src/index.vue';

yxtPageTitle.install = function (Vue) {
  Vue.component(yxtPageTitle.name, yxtPageTitle);
};

export default yxtPageTitle;

