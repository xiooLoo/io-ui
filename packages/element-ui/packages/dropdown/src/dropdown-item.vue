<template>
  <li
    class="to-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'to-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'ToDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean,
      icon: String
    },

    methods: {
      handleClick(e) {
        this.dispatch('ToDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
