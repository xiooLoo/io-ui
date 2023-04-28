/**
 * @author zhangfeiyang
 * Date: 22/05/17
 */
import YxtPageHeader from './src/index.vue';

YxtPageHeader.install = function(Vue) {
  Vue.component(YxtPageHeader.name, YxtPageHeader);
};

export default YxtPageHeader;
