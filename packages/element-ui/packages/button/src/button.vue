<template>
  <button
    class="to-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'to-button--' + type : '',
      buttonSize ? 'to-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-dashed': dashed,
        'is-second': second,
        'is-danger': danger,
      }
    ]"
  >
    <i class="to-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <yxt-icon v-if="yxtIcon && !loading" :icon="yxtIcon"></yxt-icon>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ToButton',

    inject: {
      toForm: {
        default: ''
      },
      toFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      yxtIcon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
      dashed: Boolean,
      second: Boolean,
      danger: Boolean
    },

    computed: {
      _toFormItemSize() {
        return (this.toFormItem || {}).toFormItemSize;
      },
      buttonSize() {
        return this.size || this._toFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled() {
        return this.disabled || (this.toForm || {}).disabled;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
