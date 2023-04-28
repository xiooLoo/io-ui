<template>
  <div class="yxt-error-plc-content">
    <p v-show="hasTitle" class="title">{{ title }}</p>
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
  name: 'ContentError',
  props: {
    hasTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '403'
    },
    titleSub: {
      type: String,
      default: '抱歉，你无权访问该页面!'
    },
    hasTitleSub: {
      type: Boolean,
      default: true
    },
    rowBtns: {
      type: Array,
      default: () => [
        { label: '返回首页', value: 'home', type: 'primary', code: true }
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
.yxt-error-plc-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 46px;
  .title {
    font-size: 60px;
  }
  .title-sub {
    color: #5A6275;
    padding: 8px 0 24px;
    font-size: 20px;
    white-space: nowrap;
  }
}
</style>
