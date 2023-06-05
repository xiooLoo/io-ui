export const DATACENTER_BASE = {
  id: 'YxtBissDataCenter',
  compName: 'YxtBissDataCenter',
  compNameContent: 'YxtBissDataCenterPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissDataCenterPanelExtyle', // 右侧面板-样式Extyle
  title: '资料中心',
  icon: 'icon-Attachment uiicon',
  type: 'biss',
  // requestConfig: {
  //   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU0NDExMzIsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiN2FkN2I1MzAtYjlmMS00ZTYxLWJiMDEtNjJhMzU3ZDg0NjAwIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.OKxZW0BHYQ1gLLx__xD-34wB_VFXN4TVhkN0WkSJsB_3xt_K_ufxqm6DLgdyo6gptIIHporTlbMWzzVSBgU3rKDsnBHIZwcZH6TkV5-3tV36DxW13_SVja3tzrVPSIH2BVhK5BZyluHfaBO-93pp_zpGlBJbMUKYrBpSN7KidoWiqQOCirV41TKiZeDhN8Mo9ANu5zBo4XSBW_IAoGkm3-1C71p-MqVqUvYummz1wG36DUqO8SxKDQiKKTR0bnGwpCH3z1OO0H9D5MufZ_wrn_NACh36XInXYj8rZyB5zb9Bq8dEr3zJTeDsDzPwBRs0v2aAHq_ITyuPUJwEj1fM4Q',
  //   applicationCode: '001',
  //   applicationId: '1',
  //   enterpriseCode: 'GW_202112081112116903',
  //   requestUrl: 'http://10.15.1.220:30082/api',
  //   roleId: '34',
  //   tenantId: '1'
  // },
  dialogConfig: {
    btns: [
      { label: '确定', value: 'reset', type: 'primary' }
    ],
    tipIcon: 'uiicon icon-Calendar',
    iconColor: '#2E78FF',
    title: '预览'
  },
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '组件标题',
          value: '资料中心',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入组件标题', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'field',
          type: 'checkbox',
          label: '内容字段',
          isAlwaysShow: true,
          value: ['1'],
          rules: [
            { required: false, message: '请选择内容字段', trigger: 'blur' }
          ],
          arr: [
            { label: '作者/创建者', value: '0' },
            { label: '时间', value: '1' }
          ]
        },
        {
          id: 'lineCount',
          type: 'inputNumber',
          inputType: 'inputNumber',
          min: 5,
          max: 20,
          label: '显示行数',
          value: 5,
          isAlwaysShow: true,
          rules: [
            { required: false, message: '请设置显示行数', trigger: 'blur' }
          ]
        }
      ]
    },
    extyle: {
      cssMode: {
        current: 'LR',
        arr: [
          { id: '0', label: '样式-1', value: 'LR', src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg' },
          { id: '1', label: '样式-2', value: 'TB', src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg' }
        ]
      },
      imgMode: { // 图片显示模式：origin | full
        current: 'none',
        arr: [
          { id: '0', label: '显示原图', value: 'none' },
          { id: '1', label: '等比拉伸', value: 'fill' }
        ]
      },
      type: 'card', // 轮播模式，默认'card'
      iconClazz: { // 图标icon，使用方式一：YXTUI组件库图标 如，'uiicon icon-Sort', 使用方式二：外部系统iconfont图标 如，'iconfont_1 icon-Sort'
        current: 'todo_cor',
        arr: []
      }
    }
  }
}
