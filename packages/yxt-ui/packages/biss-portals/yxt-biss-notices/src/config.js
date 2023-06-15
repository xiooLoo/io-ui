export const NOTICES_BASE = {
  id: 'YxtBissNotices',
  compName: 'YxtBissNotices',
  compNameContent: 'YxtBissNoticesPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissNoticesPanelExtyle', // 右侧面板-样式Extyle
  title: '通知公告',
  icon: 'icon-User uiicon',
  type: 'biss',
  // requestConfig: {
  //   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYxMzM5ODAsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiNzAxYTdkYjgtY2I2MS00N2Y5LTk1ZmEtMWM4NGM1N2RiY2ZjIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.T4cRo2HXqF3UcuwJvoCi0suCpvdRWj-ta7kGfxnwLeG0Wf10GmKgwVt_KijhlWGH4p1an8OobFJlp3su6r2SjkCFdV9-VSn-WXxNhrBYqnFWKFeE2hxcM-cMJm5VHgrOlAQ-5ur882LYGQerqttlRMs_01N7Sa99e8tGB9zlL-CVMRMZsL1H4qkET2a_fx2CbOoA0qg8C8YBMg_d3ev2eJOTOAya-kFTtt0uU7xVyAt13-ZJ0KnZ6xVz0fVHasNL2pi_HiQfNmEZ3vO7Uaj6EV9iCr7B9p8IvzWBbpNVskf-2G4Cm0RxKCRvVbQQDGu_GGdnMFig8BLPyfKm0C0NNA',
  //   applicationCode: '001',
  //   applicationId: '1',
  //   enterpriseCode: 'GW_202112081112116903',
  //   requestUrl: 'http://10.15.1.220:30082/api',
  //   roleId: '34',
  //   tenantId: '1'
  // },
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '组件标题',
          value: '通知公告',
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
          value: ['2', '3'],
          rules: [
            { required: false, message: '请选择内容字段', trigger: 'blur' }
          ],
          arr: [
            { label: '作者/创建者', value: '0' },
            { label: '时间', value: '1' },
            { label: '分类信息', value: '2', disabled: true },
            { label: '状态信息', value: '3', disabled: true }
          ]
        },
        {
          id: 'lineCount',
          type: 'inputNumber',
          inputType: 'inputNumber',
          min: 1,
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
