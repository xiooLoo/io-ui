/**
 * YXT-UI组件
 */
import './theme-default/index.scss';
import { customComponents } from '../../yxt-index';
import YxtMessage from '../../yxt-ui/packages/yxt-message/index';
import { YxtGridItem, YxtGridLayout } from '../../yxt-ui/packages/yxt-grid-layout/index';
import YxtGridViewer from '../../yxt-ui/packages/yxt-grid-viewer/index';

const components = [
  /** ********************************************/
  /*            以下为自定义组件部分                */
  /** ********************************************/
  ...customComponents
];


const install = function (Vue, opts = {}) {
  if (install.installed) {
    return
  }

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.component('YxtGridLayout', YxtGridLayout);
  Vue.component('YxtGridItem', YxtGridItem);
  Vue.component('YxtGridViewer', YxtGridViewer);

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  Vue.prototype.$yxtmessage = YxtMessage;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  /** ********************************************/
  /*            以下为自定义组件部分                */
  /** ********************************************/
  ...customComponents,
  YxtMessage,
  YxtGridItem,
  YxtGridLayout,
  YxtGridViewer
};
