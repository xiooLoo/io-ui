import YxtBissNotices from './src/index.vue';
import YxtBissNoticesPanelContent from './src/PanelContent.vue';
import YxtBissNoticesPanelExtyle from './src/PanelExtyle.vue';

YxtBissNotices.install = function(Vue) {
  Vue.component(YxtBissNotices.name, YxtBissNotices);
};

YxtBissNoticesPanelContent.install = function(Vue) {
  Vue.component(YxtBissNoticesPanelContent.name, YxtBissNoticesPanelContent);
};

YxtBissNoticesPanelExtyle.install = function(Vue) {
  Vue.component(YxtBissNoticesPanelExtyle.name, YxtBissNoticesPanelExtyle);
};

export default {
  YxtBissNotices,
  YxtBissNoticesPanelContent,
  YxtBissNoticesPanelExtyle
}
