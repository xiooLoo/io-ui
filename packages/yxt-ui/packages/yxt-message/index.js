import Message from '../../../element-ui/packages/message';
import Notification from '../../../element-ui/packages/notification';
import Loading from '../../../element-ui/packages/loading';
import _ from 'lodash';

let loading = null;
let needRequestCount = 0;
const startLoading = (headers = {}) => {
  loading = Loading.service({
    lock: false,
    text: headers.text || '',
    customClass: 'custom-to-isLoading',
    background: 'rgb(255, 255, 255, 0.4)',
    target: headers.target || 'body'
  });
};

const endLoading = _.debounce(() => {
  loading && loading.close();
  loading = null;
}, 300);

// 显示Loading...
export const showLoading = headers => {
  if (needRequestCount == 0 && !loading) {
    startLoading(headers);
  }
  needRequestCount++;
};

// 隐藏Loading...
export const hideLoading = () => {
  if (needRequestCount <= 0) {
    return;
  }
  needRequestCount--;
  needRequestCount = Math.max(needRequestCount, 0);
  if (needRequestCount <= 0) {
    endLoading();
  }
};

/**
 * 使用方式，如：
 ****************** Message ***************************
    this.$yxtmessage.createElement({
        message: '测试普通Message提示...'
    });
 ****************** Message render函数渲染 *************
    let h = this.$createElement;
    this.$yxtmessage.createElement({
        message: h('p', null, [
            h('span', null, '内容可以是aaa'),
            h('i', { style: 'color: teal' }, 'VNode')
        ])
    });
 ****************** Loading 加载框 *********************
    this.$yxtmessage.showLoading({ text: '测试属性aaa' });
    this.$yxtmessage.hideLoading();
 ****************** Notification 通知 ******************
    this.$yxtmessage.createNotification();
 */
const YxtMessage = {
  createElement(messageOption) {
    const option = {
      type: 'error', // 可选：success/warning/info/error
      message: '请求异常!',
      duration: 3000,
      ...messageOption
    };
    Message(option);
  },
  createNotification(notificationOption) {
    const option = {
      title: '提示',
      type: 'success', // 可选：success/warning/info/error
      dangerouslyUseHTMLString: false, // 将 dangerouslyUseHTMLString 属性设置为 true，message 就会被当作 HTML 片段处理。
      message: '请传入通知内容...',
      position: 'top-right', // 可选：top-right/top-left/bottom-right/bottom-left
      duration: 6000,
      showClose: true, // 将showClose属性设置为false即可隐藏关闭按钮
      ...notificationOption
    };
    Notification(option);
  },
  showLoading(option) {
    showLoading(option);
  },
  hideLoading() {
    hideLoading();
  }
};

export default YxtMessage;
