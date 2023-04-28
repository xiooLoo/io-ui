<template>
  <aside class="to-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'ToAside',

    componentName: 'ToAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
