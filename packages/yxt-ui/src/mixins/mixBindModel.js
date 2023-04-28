export default {
  props: ['modelValue'],
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  computed: {
    // 绑定值
    value: {
      get() {
        return this.modelValue || null;
      },
      set(e) {
        return e;
      }
    }
  }
};
