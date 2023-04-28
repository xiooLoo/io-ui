<template>
  <div class="yxt-progress">
    <to-progress  :percentage="percentage" v-bind="$attrs"></to-progress>
  </div>
</template>

<script>
import ToProgress from '../../../../element-ui/packages/progress'

export default {
  name: 'yxt-progress',
  components: {
    ToProgress
  },
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    };
  }
};

</script>
