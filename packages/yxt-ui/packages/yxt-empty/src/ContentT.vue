<template>
  <div class="yxt-result-plc-content">
    <h1 v-show="hasTitle">{{ title }}</h1>
    <p v-show="hasTitleSub" class="title-sub">{{ titleSub }}</p>
    <to-row v-show="hasRowBtns">
      <template v-for="btn in rowBtns">
        <to-button
          v-show="btn.code"
          v-bind="$attrs"
          v-on="$listeners"
          :key="btn.value"
          :type="btn.type"
          @click="handleAction(btn)"
        >
          <slot v-if="btn.slot" :name="btn.slot" :label="btn.label" />
          <template v-else>{{ btn.label }}</template>
        </to-button>
      </template>
    </to-row>
  </div>
</template>
<script>

export default {
  name: 'ContentResult',
  props: {
    hasTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '成功!'
    },
    titleSub: {
      type: String,
      default: '描述具体内容!'
    },
    hasTitleSub: {
      type: Boolean,
      default: true
    },
    rowBtns: {
      type: Array,
      default: () => [
        { label: '返回首页', value: 'home', type: 'primary', code: true },
        { label: '刷新', value: 'refresh', isIcon: true, icon: 'to-icon-warning', code: true }
      ]
    },
    hasRowBtns: {
      type: Boolean,
      default: true
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
    return {
    }
  },
  method: {
    handleAction(btn) {
      let query = {
        key: 'handleAction',
        obj: {
          btn
        }
      };
      this.actions(query);
    }
  }
}
</script>

<style lang='scss' scoped>
.yxt-result-plc-content {
  .title-sub {
    color: #5A6275;
    font-size: 14px;
    padding: 8px 0 24px;
  }
}
</style>
