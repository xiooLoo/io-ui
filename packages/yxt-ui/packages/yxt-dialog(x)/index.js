/**
 * @author leizhe
 * Date: 21/07/06
 */
import YxtDialog from './src/index.vue';

YxtDialog.install = function(Vue) {
  Vue.component(YxtDialog.name, YxtDialog);
};

export default YxtDialog;
