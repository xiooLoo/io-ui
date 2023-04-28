export default {
  props: ['checked'],
  model: {
    prop: 'checked',
    event: 'change'
  },
  computed: {
    // 绑定值
    value: {
      get() {
        return this.checked || null;
      },
      set(e) {
        return e;
      }
    }
  }
};
