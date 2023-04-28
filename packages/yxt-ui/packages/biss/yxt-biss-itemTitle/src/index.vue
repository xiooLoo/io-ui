<!--
  // 使用栗子
  <YxtBissItemTitle :detailItem="{ title: '订单信息', type: '', showFold: true, datas: []}"></YxtBissItemTitle>
-->
<template>
  <div class="main-box">
    <h5 :class="[ 'item-title', detailItem.noBottomColor? '': 'title-bottom' ]">
      <span>
        <span>{{ detailItem.title || '' }}</span>
        <slot name="title" />
      </span>
      <span v-if="detailItem.showFold" class="title-right" @click="handleFold">
        <i :class="isFold?'to-icon-arrow-down':'to-icon-arrow-up'" />{{ isFold? '展开' : '收起' }}
      </span>
      <slot v-else class="title-right" name="titleRight" />
    </h5>
    <div>
      <slot v-if="!isFold" name="content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'YxtBissItemTitle',
  props: {
    detailItem: {
      type: Object,
      default: () => {
        //  { title: '标题', type: '', showFold: '是否显示收起' },
        return {}
      }
    }
  },
  data() {
    return {
      isFold: false
    };
  },
  methods: {
    handleFold() {
      this.isFold = !this.isFold;
    }
  }
}
</script>
<style lang='scss' scoped>
.main-box {
  background: #fff;
  margin-bottom: 24px;
  .item-title {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: 20px;
    background: #FFFFFF;
    padding: 14px 20px;
    .title-right {
      font-size: 0.875em;
      color: #2E78FF;
      cursor: pointer;
    }
  }
  .title-bottom {
    border-bottom: 1px solid #EDEEF0;
  }
}
</style>
