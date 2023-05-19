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
  }
}
