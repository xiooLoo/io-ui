export const COMMONS_BASE = {
  id: 'YxtBissCommons',
  compName: 'YxtBissCommons',
  compNameContent: 'YxtBissCommonsPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissCommonsPanelExtyle', // 右侧面板-样式Extyle
  title: '常用功能',
  icon: 'icon-Calendar uiicon',
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
          value: '常用功能',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入组件标题', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'minCount',
          type: 'inputNumber',
          inputType: 'inputNumber',
          min: 4,
          max: 20,
          label: '最小显示数量',
          value: 4,
          isAlwaysShow: true,
          rules: [
            { required: false, message: '请设置最小显示数量', trigger: 'blur' }
          ]
        },
        {
          id: 'resource',
          type: 'select',
          label: '数据源',
          multiple: true,
          isAlwaysShow: true,
          value: [],
          rules: [
            { required: false, message: '请选择数据源', trigger: 'blur' }
          ],
          arr: [
            // { label: '办公用房台账', value: '0' },
            // { label: '土地/公物仓', value: '1' },
            // { label: '周转房', value: '2' },
            // { label: '公共节能', value: '3' },
            // { label: '其他', value: '4' }
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
