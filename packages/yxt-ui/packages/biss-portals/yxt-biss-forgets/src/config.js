export const FORGETS_BASE = {
  id: 'YxtBissForgets',
  compName: 'YxtBissForgets',
  compNameContent: 'YxtBissForgetsPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissForgetsPanelExtyle', // 右侧面板-样式Extyle
  title: '备忘清单',
  icon: 'icon-Time uiicon',
  type: 'biss',
  // requestConfig: {
  //   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU3NTc5ODMsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiMDU3NTMyZWEtNmZkMi00MGU4LWFiMjUtMjMyNzcxZGMwNzMyIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.IMKUo08N03icTOQkN0d1dZFZkeUjvYMRW7k_UkF7bVOZKIqbI6LtCBqrvgcR3KxCxBK8iZKLmic3JOw2gR7dMsWQoJptRU6pgGkMr99TIHfBRyx5QUMFwx3UZjjozmKCuFGH-j8D0TnQILAKCGKHEeSRNGLxJZHZPF7_bI4wA1vRnJLsc5yUrgIKcy7lajtdIAcZgrmXVhE7Azwh8DNMxRNwLFXmfnhfcEsj0FuiWg8t3L8S6J7dH6uMOCO6mGY8RO2pnXFf5KNpnHzvKa4Yly2v-_kXPVVyoxxH0Zi0PjeNrOZDZW5zqCq4Mbq-x4IFNK4XFusUfgH9aSSMckScWw',
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
          value: '备忘清单',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入组件标题', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'lineCount',
          type: 'inputNumber',
          inputType: 'inputNumber',
          min: 4,
          max: 20,
          label: '显示行数',
          value: 4,
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

export const ADD_FORMS = [
  {
    id: 'content',
    type: 'input',
    isAlwaysShow: true,
    inputType: 'input',
    label: '备忘内容',
    value: '',
    maxlength: 20,
    rules: [
      { required: true, message: '请输入备忘内容', trigger: 'blur' }
    ]
  },
  {
    id: 'deadline',
    type: 'datetime',
    isAlwaysShow: true,
    label: '截止日期',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm',
    placeholder: '请选择日期时间',
    pickerOptions: {
      disabledDate(time) {
        return time.getTime() < Date.now()
      }
    },
    rules: [
      { required: false, message: '请选择日期时间', trigger: 'change' }
    ]
  },
  {
    id: 'memoReminderType',
    type: 'select',
    isAlwaysShow: true,
    label: '备忘提醒',
    value: '0',
    hidden: true,
    rules: [
      { required: false, message: '请选择提醒模式', trigger: 'change' }
    ],
    arr: []
  }
]
