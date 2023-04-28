<template>
  <div class="yxt-date-time-picker">
    <component
      :is="name"
      v-model="value"
      v-bind="{ ...attributes, 'picker-options': options }"
      @change="e => handleEvents('change', e)"
      @blur="e => handleEvents('blur', e)"
      @focus="e => handleEvents('focus', e)"
    />
  </div>
</template>
<script>
import mixBindModel from '../../../src/mixins/mixBindModel';
export default {
  name: 'YxtDateTimePicker',
  mixins: [mixBindModel],
  props: {
    name: {
      type: String,
      default: 'to-time-select'
    },
    events: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 数据源
    options() {
      return this.$attrs.options || [];
    },
    attributes() {
      return this.$attrs.attributes || {};
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleEvents(event, e) {
      this.$emit(event, e);
    }
  }
};
</script>
