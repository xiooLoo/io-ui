<template>
  <header class="to-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'ToHeader',

    componentName: 'ToHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
