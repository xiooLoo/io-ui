<template>
  <YxtEmpty
    v-bind="$attrs"
    v-on="$listeners"
  >
  </YxtEmpty>
</template>

<script>
import YxtEmpty from '../../yxt-empty'

export default {
  name: 'YxtResult',
  components: {
    YxtEmpty
  },
  data() {
    return {
    };
  }
};
</script>
