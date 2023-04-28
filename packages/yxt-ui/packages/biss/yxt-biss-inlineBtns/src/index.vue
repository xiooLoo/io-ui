<template>
  <div class="xyt-inline-btns-box">
    <YxtRowBtns class="left-btns-box" :row-btns="leftBtns" :actions="(data) => heandleActions(data, 'left')"></YxtRowBtns>
    <YxtRowBtns class="right-btns-box" :row-btns="rightBtns" :actions="(data) => heandleActions(data, 'right')"></YxtRowBtns>
  </div>
</template>
<script>
import YxtRowBtns from '../../../yxt-rowBtns'

export default {
  name: 'YxtBissInlineBtns',
  components: {
    YxtRowBtns
  },
  props: {
    leftBtns: {
      type: Array,
      default: () => [
        { label: '取消', value: 'cancel', type: 'normal' },
        { label: '确定', value: 'sure', type: 'primary' }
      ]
    },
    rightBtns: {
      type: Array,
      default: () => []
    },
    /**
     * 所有@click 事件，通过key区分事件具体类型
     */
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  methods: {
    heandleActions(data, type) {
      this.actions({ ...data, type});
    }
  }
}
</script>
<style lang="scss" scoped>
.xyt-inline-btns-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .left-btns-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .table-action-icon {
      cursor: pointer;
      color: #2E78FF;
      font-size: 20px;
      margin-left: 10px;
    }
    .single-button-disabled-download {
      background-color: #f3f3f3;
      color: #b8bcc4;
    }
  }
  .right-btns-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
