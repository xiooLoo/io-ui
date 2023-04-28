/**
 * @author leizhe
 * Date: 21/08/23
 */
import YxtDrawer from './src/index.vue';

YxtDrawer.install = function(Vue) {
  Vue.component(YxtDrawer.name, YxtDrawer);
};

export default YxtDrawer;
