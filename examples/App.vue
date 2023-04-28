<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';

export default {
  components: {
    HelloWorld
  },

  data() {
    return {};
  },
  methods: {
    handleAction() {
      this.$alert('asd');
    }
  }
};
</script>

<style lang="scss">
</style>
