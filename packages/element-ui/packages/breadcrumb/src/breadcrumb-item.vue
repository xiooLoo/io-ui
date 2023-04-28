<template>
  <span class="to-breadcrumb__item">
    <span
      :class="['to-breadcrumb__inner', to ? 'is-link' : '']"
      ref="link"
      role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="to-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="to-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>
<script>
  export default {
    name: 'ToBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean
    },
    data() {
      return {
        separator: '',
        separatorClass: ''
      };
    },

    inject: ['toBreadcrumb'],

    mounted() {
      this.separator = this.toBreadcrumb.separator;
      this.separatorClass = this.toBreadcrumb.separatorClass;
      const link = this.$refs.link;
      link.setAttribute('role', 'link');
      link.addEventListener('click', _ => {
        const { to, $router } = this;
        if (!to || !$router) return;
        this.replace ? $router.replace(to) : $router.push(to);
      });
    }
  };
</script>
