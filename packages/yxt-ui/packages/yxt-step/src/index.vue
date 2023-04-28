<template>
  <div>
    <yxt-step/>
  </div>
</template>
<script>
export default {
  name: 'yxtStep',
  functional: true,
  render: function (createElement, context) {
    // 完全透传任何 attribute、事件监听器、子节点等。
    return createElement('to-step', context.data, context.children);
  }
};
</script>
