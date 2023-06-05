export default {
  /**
   *
   * @param {随机数最小值} min
   * @param {随机数最大值} max
   * @param {生成随机数个数} countNum
   * @returns
   */
  getRandomNum(min, max, countNum) {
    let arr = []
    // 在此处补全代码
    function produceNum() {
      let num = Math.floor((Math.random() * (max - min)) + min)
      if (arr.indexOf(num) == -1) { // 判断不存在就push
        arr.push(num)
      } else {
        produceNum() // 存在了重新调用
      }
      if (arr.length < countNum) { // 判断数组长度是否小于所需长度
        produceNum()
      }
    }
    produceNum()
    return arr
  },
  getFileType(fileName) {
    const surfix = fileName.split('.')[1]
    switch (surfix) {
    case 'xlsx':
      return 'office_xlsx'
    case 'docx':
      return 'office_docx'
    case 'pdf':
      return 'office_pdf'
    default:
      return 'todo_xpEnergySaving_icon_1'
    }
  },
  /**
   * 格式化表单中 label 、 value，构造arr对象数组
   * dataList 接口数据源列表
   * labelKey： 接口数据Key
   * valueKkey： 接口数据value
   * formItems：表单对象数组[]
   * formItemId: 表单需要自定义设置arr[]数组数据的id
   * formItemKey：数组遍历判断需要修改哪个arr的源
   * @formItems   最终结果数据
   */
  formatArrObject(dataConfig, formItemConfig) {
    if (!dataConfig.dataList || !dataConfig.dataList.length) {
      formItemConfig.formItems.map(item => {
        if (item[formItemConfig.formItemId] === formItemConfig.formItemKey) {
          item.arr = []
        }
        return item
      })
    } else {
      dataConfig.dataList.map(item => {
        item.label = item[dataConfig.labelKey]
        item.value = item[dataConfig.valueKkey]
        return item
      })
      formItemConfig.formItems.map(item => {
        if (item[formItemConfig.formItemId] === formItemConfig.formItemKey) {
          item.arr = dataConfig.dataList
        }
        return item
      })
    }
    return formItemConfig.formItems
  }
}
