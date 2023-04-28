<template>
  <footer class="to-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'ToFooter',

    componentName: 'ToFooter',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
