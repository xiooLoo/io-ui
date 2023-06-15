import Vue from 'vue';
import App from './App.vue';
import dayjs from 'dayjs';
/**
 * 【本地调试】YXTUI组件
 * */
import YXTUI from '../packages';
Vue.use(YXTUI);


/**
 * 【按需引用】YXTUI组件，如：
 import YxtTabs from '../lib/packages/yxt-tabs'
 import ToInput from '../lib/packages/input'
 import ToSelect from '../lib/packages/select'
 import ToOption from '../lib/packages/option'
 import YxtCard from '../lib/packages/yxt-card'
 import '../lib/packages/index/index.css';
 Vue.use(YxtCard)
 Vue.use(ToSelect)
 Vue.use(YxtTabs)
 Vue.use(ToInput)
 Vue.use(ToSelect)
 Vue.use(ToOption)
 */

/**
 * 【全量引用umd】YXTUI组件
import YXTUI from '../lib/umd/yxt-ui.common.js';
import '../lib/umd/yxt-ui.css';
Vue.use(YXTUI);
*/

const quarterOfYear = require('dayjs/plugin/quarterOfYear')
dayjs.extend(quarterOfYear)
Vue.prototype.dayjs = dayjs
new Vue({
  render: h => h(App)
}).$mount('#app');
