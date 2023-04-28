<template>
  <svg :class="svgClass" aria-hidden="true"  v-on="$listeners">
    <use v-bind:xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'YxtSvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${this.className}`;
      } else {
        return 'svg-icon';
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.icon}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.icon}) no-repeat 50% 50%`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
