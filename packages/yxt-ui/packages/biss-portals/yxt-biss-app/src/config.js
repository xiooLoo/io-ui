const apps = [
  { label: '不动产统一管理', value: '0', url: 'http://121.36.17.224:30483/immovable/assets/detail#/assets/detail' },
  { label: '公务用车', value: '1', url: 'http://121.36.17.224:30552/gcyhpt/#/home' },
  { label: '公共机构节能', value: '2', url: 'http://121.36.17.224:30552/xpEnergySaving/#/hnhome' },
  { label: '标准仓', value: '3', url: 'http://121.36.17.224:30552/portal/#/policiesRegulations/2' },
  { label: '监管中心', value: '4', url: 'http://121.36.17.224:30552/monitorCenter/#/hndataboard' }
]

export const IMMOVABLE_BASE = {
  id: 'YxtImmovableApp',
  compName: 'YxtImmovableApp',
  compNameContent: 'YxtBissAppPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissAppPanelExtyle', // 右侧面板-样式Extyle
  icon: 'icon-Sort uiicon', // 使用YXTUI组件库iconfont，位置：packages/assets/iconfont/iconfont.css
  title: '不动产统一管理', // 组件标题
  type: 'biss', // 组件类型：功能组件‘func’，业务组件‘biss’
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '应用名称',
          value: '不动产统一管理',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'application',
          type: 'select',
          label: '选择应用',
          value: '0',
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请选择应用', trigger: 'blur' }
          ],
          arr: apps
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
      iconClazz: { // 图标icon，使用方式一：YXTUI组件库图标 如，'uiicon icon-Sort', 使用方式二：外部系统iconfont图标 如，'iconfont_1 icon-Sort'
        current: 'app_1',
        arr: []
      }
    }
  }
}

export const VEHICLE_BASE = {
  id: 'YxtVehicleApp',
  compName: 'YxtVehicleApp',
  compNameContent: 'YxtBissAppPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissAppPanelExtyle', // 右侧面板-样式Extyle
  icon: 'icon-Sort uiicon', // 使用YXTUI组件库iconfont，位置：packages/assets/iconfont/iconfont.css
  title: '公务用车', // 组件标题
  type: 'biss', // 组件类型：功能组件‘func’，业务组件‘biss’
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '应用名称',
          value: '公务用车',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'application',
          type: 'select',
          label: '选择应用',
          value: '1',
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请选择应用', trigger: 'blur' }
          ],
          arr: apps
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
      iconClazz: { // 图标icon，使用方式一：YXTUI组件库图标 如，'uiicon icon-Sort', 使用方式二：外部系统iconfont图标 如，'iconfont_1 icon-Sort'
        current: 'app_2',
        arr: []
      }
    }
  }
}

export const ENERGY_BASE = {
  id: 'YxtEnergyApp',
  compName: 'YxtEnergyApp',
  compNameContent: 'YxtBissAppPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissAppPanelExtyle', // 右侧面板-样式Extyle
  icon: 'icon-Sort uiicon', // 使用YXTUI组件库iconfont，位置：packages/assets/iconfont/iconfont.css
  title: '公共机构节能', // 组件标题
  type: 'biss', // 组件类型：功能组件‘func’，业务组件‘biss’
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '应用名称',
          value: '公共机构节能',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'application',
          type: 'select',
          label: '选择应用',
          value: '2',
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请选择应用', trigger: 'blur' }
          ],
          arr: apps
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
      iconClazz: { // 图标icon，使用方式一：YXTUI组件库图标 如，'uiicon icon-Sort', 使用方式二：外部系统iconfont图标 如，'iconfont_1 icon-Sort'
        current: 'app_3',
        arr: []
      }
    }
  }
}

export const STANDARD_BASE = {
  id: 'YxtStandardApp',
  compName: 'YxtStandardApp',
  compNameContent: 'YxtBissAppPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissAppPanelExtyle', // 右侧面板-样式Extyle
  icon: 'icon-Sort uiicon', // 使用YXTUI组件库iconfont，位置：packages/assets/iconfont/iconfont.css
  title: '标准仓', // 组件标题
  type: 'biss', // 组件类型：功能组件‘func’，业务组件‘biss’
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '应用名称',
          value: '标准仓',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'application',
          type: 'select',
          label: '选择应用',
          value: '3',
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请选择应用', trigger: 'blur' }
          ],
          arr: apps
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
      iconClazz: { // 图标icon，使用方式一：YXTUI组件库图标 如，'uiicon icon-Sort', 使用方式二：外部系统iconfont图标 如，'iconfont_1 icon-Sort'
        current: 'app_4',
        arr: []
      }
    }
  }
}

export const SUPERVISE_BASE = {
  id: 'YxtSuperviseApp',
  compName: 'YxtSuperviseApp',
  compNameContent: 'YxtBissAppPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtBissAppPanelExtyle', // 右侧面板-样式Extyle
  icon: 'icon-Sort uiicon', // 使用YXTUI组件库iconfont，位置：packages/assets/iconfont/iconfont.css
  title: '监管中心', // 组件标题
  type: 'biss', // 组件类型：功能组件‘func’，业务组件‘biss’
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '应用名称',
          value: '监管中心',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'application',
          type: 'select',
          label: '选择应用',
          value: '4',
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请选择应用', trigger: 'blur' }
          ],
          arr: apps
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
      iconClazz: { // 图标icon，使用方式一：YXTUI组件库图标 如，'uiicon icon-Sort', 使用方式二：外部系统iconfont图标 如，'iconfont_1 icon-Sort'
        current: 'app_5',
        arr: []
      }
    }
  }
}
