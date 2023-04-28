<script>
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'ToCheckboxGroup',

    componentName: 'ToCheckboxGroup',

    mixins: [Emitter],

    inject: {
      ToFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    computed: {
      _toFormItemSize() {
        return (this.toFormItem || {}).toFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._toFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('ToFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="to-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
