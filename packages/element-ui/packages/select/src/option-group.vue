<template>
  <ul class="to-select-group__wrap" v-show="visible">
    <li class="to-select-group__title">{{ label }}</li>
    <li>
      <ul class="to-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from '../../../src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'ToOptionGroup',

    componentName: 'ToOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('ToOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('ToOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
