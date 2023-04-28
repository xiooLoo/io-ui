/**
 * @author xiooLoo
 * Date: 21/08/12
 */
import YxtCodemirror from './src/index.vue';

YxtCodemirror.install = function (Vue) {
  Vue.component(YxtCodemirror.name, YxtCodemirror);
};

export default YxtCodemirror;

