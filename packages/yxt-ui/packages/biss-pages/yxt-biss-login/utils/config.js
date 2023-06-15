const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码至少6位'))
  } else {
    callback()
  }
}
export const queryFormItems = [
  {
    id: 'username',
    type: 'input',
    inputType: 'input',
    label: '',
    isSurfixLabel: true,
    isAlwaysShow: true,
    placeholder: '用户名/账号',
    rules: [
      { required: true, message: '请输入用户名/账号', trigger: 'blur' }
    ]
  },
  {
    id: 'password',
    type: 'input',
    inputType: 'password',
    clearable: false,
    label: '',
    password: true,
    isSurfixLabel: true,
    isAlwaysShow: true,
    placeholder: '密码',
    rules: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { required: true, trigger: 'blur', validator: validatePassword }
    ]
  }
]
