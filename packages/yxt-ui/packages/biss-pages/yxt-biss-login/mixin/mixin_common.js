import { queryFormItems } from '../utils/config'
import { encrypt } from '../utils/encrypt'
import LoginValidator from '../components/LoginValidator.vue'

export default {
  components: {
    LoginValidator
  },
  props: {
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    const tabs = [
      { id: '1', label: '账号登录', value: '1', badgeValue: 0, code: true },
      { id: '2', label: '手机验证码登录', value: '2', badgeValue: 0, disabled: true, code: true }
    ]
    return {
      queryFormItems,
      queryForm: {},
      isLoading: false,
      otherQuery: {},
      loginValidateKey: Date.now().toString(),
      rightItems: [
        { id: 'app', name: '下载App', to: 'http://www.bing.com' },
        { id: 'mini', name: '关注小程序', to: 'https://www.oschina.net' }
      ],
      midIcs: [
        { id: '0', name: '高效便捷', src: 'https://pic.imgdb.cn/item/648a71741ddac507cc92c7c4.png' },
        { id: '1', name: '数据可视', src: 'https://pic.imgdb.cn/item/648a71751ddac507cc92c87b.png' },
        { id: '2', name: '多功能性', src: 'https://pic.imgdb.cn/item/648a71751ddac507cc92c895.png' },
        { id: '3', name: '数据互通', src: 'https://pic.imgdb.cn/item/648a71751ddac507cc92c8a0.png' }
      ],
      formTabs: tabs,
      currentTab: tabs[0].value
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route && route.query) {
          this.otherQuery = this.getOtherQuery(route.query)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleTabsActions(params) {
      console.log('tab切换事件：', params)
      if (params.obj.value == '2') {
        this.$yxtmessage.createElement({ type: 'warning', message: '暂未开放哦' })
        return
      }
      this.currentTab = params.obj.value
    },
    toWechat() {
      this.$yxtmessage.createElement({ type: 'warning', message: '暂未开放哦' })
    },
    toLogin() {
      const fetchBtn = { label: '保存', value: 'fetch', type: 'primary', code: true }
      this.$refs.yxtFormRef.handleTransferAction(fetchBtn)
    },
    toLoginNext(e) {
      if (!this.$refs.loginValidatorRef.isFinish()) {
        this.$message.warning('请完善表单信息或者拖动滑块验证')
        return
      }
      let params = {
        username: e.username,
        mobile: e.username,
        password: encrypt(e.password),
        grant_type: 'captcha'
      }
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
      this.actions({ key: 'toLoginNext', obj: params })
      this.isLoading = false
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
