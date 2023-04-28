<template>
  <div>
    <to-transfer
      ref="transfer"
      v-model="value"
      :data="sourceData"
      :titles="titles"
      @change="handleChange"
      @left-check-change="leftCheckChange"
      @right-check-change="rightCheckChange"
      v-bind="$attrs"
    >
      <template slot="left-footer">
        <slot name="left-footer"></slot>
      </template>
      <template slot="right-footer">
        <slot name="right-footer"></slot>
      </template>
    </to-transfer>
  </div>
</template>

<script>
import ToTransfer from '../../../../element-ui/packages/transfer'

import mixBindModel from '../../../src/mixins/mixBindModel';
export default {
  name: 'YxtTransfer',
  components: {
    ToTransfer
  },
  mixins: [mixBindModel],
  props: {
    sourceData: {
      type: Array,
      default: () => []
    },
    titles: {
      type: Array,
      default: () => ['源列表', '目的列表']
    }
    /**
     * 扩展属性见ElementUI官网文档
     * ...
     */
  },
  data() {
    return {};
  },
  // 计算属性用于回显
  computed: {
  },
  methods: {
    clearQuery(val) {
      this.$refs.transfer.clearQuery(val);
    },
    handleChange(val, direction, moveArr) {
      let targetArr = [];
      if (val.length > 0) {
        targetArr = this.sourceData.filter(item => val.indexOf(item.key) > -1);
      }
      this.$emit('change', val, targetArr, direction, moveArr);
    },
    leftCheckChange(checkedKeyArr, changeKeyArr) {
      this.$emit('left-check-change', checkedKeyArr, changeKeyArr);
    },
    rightCheckChange(checkedKeyArr, changeKeyArr) {
      this.$emit('right-check-change', checkedKeyArr, changeKeyArr);
    }
  }
};
</script>
