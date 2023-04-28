<script>
export default {
  name: 'yxtSteps',
  functional: true,
  render: function (createElement, context) {
    // 完全透传任何 attribute、事件监听器、子节点等。
    return createElement('to-steps', context.data, context.children);
  }
};
</script>
