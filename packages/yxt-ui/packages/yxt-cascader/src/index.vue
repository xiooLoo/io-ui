<template>
  <div>
    <to-cascader
      ref="cascader"
      v-model="value"
      v-bind="$attrs"
      :options="options"
      :clearable="clearable"
      :filterable="filterable"
      @change="handleChange"
      @expand-change="handleEvent('expand-change', $event)"
      @blur="handleEvent('blur', $event)"
      @focus="handleEvent('focus', $event)"
      @visible-change="handleEvent('visible-change', $event)"
      @remove-tag="handleEvent('remove-tag', $event)"
    >
      <template slot-scope="{ node, data }">
        <slot :node="node" :data="data"></slot>
      </template>
    </to-cascader>
  </div>
</template>

<script>
import ToCascader from '../../../../element-ui/packages/cascader'
import mixBindModel from '../../../src/mixins/mixBindModel';

export default {
  name: 'YxtCascader',
  components: {
    ToCascader
  },
  mixins: [mixBindModel],
  data() {
    return {};
  },
  // 计算属性用于回显
  computed: {
    // 数据源
    options() {
      return this.$attrs.options || [];
    },
    // 可禁用
    disable() {
      return this.$attrs.disable || false;
    },
    // 可清除
    clearable() {
      if (this.$attrs.clearable == false) {
        return false;
      } else {
        return true;
      }
    },
    // 可过滤
    filterable() {
      if (this.$attrs.filterable == false) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val);
    },
    handleEvent(key, val) {
      this.$emit(key, val);
    },
    getCheckedNodes(val) {
      return this.$refs.cascader.getCheckedNodes(val);
    }
  }
};
</script>
