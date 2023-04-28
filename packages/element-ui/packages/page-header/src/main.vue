<template>
  <div class="to-page-header">
    <div class="to-page-header__left" @click="$emit('back')">
      <i class="to-icon-back"></i>
      <div class="to-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="to-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from '../../../src/locale';
export default {
  name: 'ToPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title');
      }
    },
    content: String
  }
};
</script>
