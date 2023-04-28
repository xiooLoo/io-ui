/**
 * 短提示
 */

import Message from '../../../../element-ui/packages/message';
import Loading from '../../../../element-ui/packages/loading';
import _ from 'lodash';

/**
   * 短提示
   */
const MESSAGE = {
  SHOW(messageOption) {
    const option = {
      type: 'error',
      message: '请求异常!',
      duration: 3000,
      ...messageOption
    }
    Message(option)
  }
}
/**
   * Loading加载...
   * 如：编辑车辆接口
   * [IS_CUSTOM_LOADING: true]  //需要自定义实现页面Loading
   * [IS_CUSTOM_LOADING: false] 或 [不设置IS_CUSTOM_LOADING:]   // 已在请求拦截器‘全局’实现了Loading...
    export const fetchEdit = data => http.put('official/vehicle', data, {
      IS_CUSTOM_LOADING: true
    })
   */
let loading = null
let needRequestCount = 0
const startLoading = (headers = {}) => {
  loading = Loading.service({
    lock: false,
    text: headers.text || '',
    // customClass: 'custom-to-isLoading',
    background: 'rgb(255, 255, 255, 0.4)',
    target: headers.target || 'body'
  })
}

const endLoading = _.debounce(() => {
  loading && loading.close()
  loading = null
}, 300)

export const showLoading = headers => {
  if (needRequestCount == 0 && !loading) {
    startLoading(headers)
  }
  needRequestCount++
}

export const hideLoading = () => {
  if (needRequestCount <= 0) {
    return
  }
  needRequestCount--
  needRequestCount = Math.max(needRequestCount, 0)
  if (needRequestCount <= 0) {
    endLoading()
  }
}

export default MESSAGE

