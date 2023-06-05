export const NOTICES_BASE = {
  id: 'YxtBissNotices',
  compName: 'YxtBissNotices',
  compNameContent: 'YxtBissNoticesPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissNoticesPanelExtyle', // 右侧面板-样式Extyle
  title: '通知公告',
  icon: 'icon-User uiicon',
  type: 'biss',
  // requestConfig: {
  //   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODU1ODY1NjcsInVzZXJJZCI6MTAsInVzZXJfbmFtZSI6ImFkbWluIiwianRpIjoiNmRhM2E4OGEtZjQzZC00NjUxLWE3ZDMtNmRhZTZhY2U2ZTVjIiwiY2xpZW50X2lkIjoid2ViX2JhY2siLCJzY29wZSI6WyJiYWNrIl19.PB6vy0mD-JiDU7fczcZtfi0KPA9mK4S6BGfiNr1vpOM2UC5sRsyz1-a6Oa28X4PBn3uw5pudWNQsqJRlDSg04jzDGMfdM2zXTJzhjPFvnfTapqelHkxrRv4ot593jCPFQuYvMPdFL1b1oUmr6rsPqRNcLDHe70gVtz0dLRQWhmHKNYcyq4mlK_s80_xyS1DBwwlyp-tCyBhotQcA2mVc-wcbrCnICftV-iojcAeCXeZU1VbPTqvgF6SSH2VckTy_jEVSHO48FMC85yInDga_L0aE91SBU_dasf9QydDPZZjAhvC-dH6OITkoGr9pG4aCYvTPk3KbA33QuaD2IeRj5w',
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
