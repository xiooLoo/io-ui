export const TODOS_BASE = {
  id: 'YxtBissTodos',
  compName: 'YxtBissTodos',
  compNameContent: 'YxtBissTodosPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissTodosPanelExtyle', // 右侧面板-样式Extyle
  title: '待办事项',
  icon: 'icon-Sort uiicon',
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
          value: '待办事项',
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
          value: ['0'],
          rules: [
            { required: false, message: '请选择内容字段', trigger: 'blur' }
          ],
          arr: [
            { label: '业务分类', value: '0' }
          ]
        },
        {
          id: 'resource',
          type: 'select',
          label: '数据源',
          multiple: true,
          isAlwaysShow: true,
          value: ['0', '1'],
          rules: [
            { required: false, message: '请选择数据源', trigger: 'blur' }
          ],
          arr: [
            { label: '周转房', value: '0' },
            { label: '经营性资产', value: '1' },
            { label: '办公用房', value: '2' },
            { label: '固定资产', value: '3' },
            { label: '公共节能', value: '4' }
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

export function matchBgName(bizGroup) {
  switch (bizGroup) {
  case 'officespace':
    return 'todo_bg_1'
  case 'xpEnergySaving':
    return 'todo_bg_2'
  case 'turnover':
    return 'todo_bg_4'
  case 'immovable':
    return 'todo_bg_1'
  case 'operateAssets':
    return 'todo_bg_5'
  default:
    return 'todo_bg_1'
  }
}

export function matchBgIconName(bizGroup) {
  switch (bizGroup) {
  case 'officespace':
    return 'todo_bgicon_1'
  case 'xpEnergySaving':
    return 'todo_bgicon_2'
  case 'turnover':
    return 'todo_bgicon_4'
  case 'immovable':
    return 'todo_bgicon_1'
  case 'operateAssets':
    return 'todo_bgicon_5'
  default:
    return 'todo_bgicon_1'
  }
}


export function matchCategoryIconName(bizCode) {
  switch (bizCode) {
  case 'OFFICE_SPACE_MAINTAIN_APPLY':
    return 'todo_officespace_icon_1'
  case 'OFFICE_SPACE_DISPOSE_APPLY':
    return 'todo_officespace_icon_2'
  case 'TURNOVER_HOUSE_APPLY':
    return 'todo_immovable_icon_2'
  case 'TURNOVER_HOUSE_RELET':
    return 'todo_immovable_icon_3'
  case 'TURNOVER_HOUSE_THROW_LEASE':
    return 'todo_immovable_icon_4'
  case 'ENERGY_SAVING_PROJECT_APPLY':
    return 'todo_xpEnergySaving_icon_1'
  case 'ENERGY_SAVING_UNIT_APPLY':
    return 'todo_xpEnergySaving_icon_2'
  default:
    return 'todo_xpEnergySaving_icon_1'
  }
}
