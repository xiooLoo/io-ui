<template>
  <i :class="'to-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'ToIcon',

    props: {
      name: String
    }
  };
</script>
