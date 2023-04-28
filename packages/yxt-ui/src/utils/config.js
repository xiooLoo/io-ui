// 组件库基础配置

export default {
  baseURL: 'https://smallpig.site', // 请求基础地址,可根据环境自定义
  useTokenAuthorization: true, // 是否开启 token 认证
  CONST_MIN_WIDTH: '1200px',
  computedRowSpanByWidth: function () {
    let rowSpan = 3
    let w = window.innerWidth;
    if (w <= 1200) {
      rowSpan = 2
    } else {
      rowSpan = 4
    }
    return rowSpan
  }
}
