<template>
  <div class="yxt-collapse-box">
    <to-collapse v-model="confige.activeNames" @change="handleChange" :accordion="confige.accordion">
      <to-collapse-item
        v-for="(v,i) in confige.data"
        :key="i"
        :title="v.title"
        :name="i"
        :disabled="v.disabled"
      >
        <div v-if="v.title" slot="title" v-html="v.title"></div>
        <slot :name="v.slot"></slot>
      </to-collapse-item>
    </to-collapse>
  </div>
</template>
<script>
import ToCollapse from '../../../../element-ui/packages/collapse'
import ToCollapseItem from '../../../../element-ui/packages/collapse-item'

export default {
  name: 'YxtCollapse',
  components: {
    ToCollapse,
    ToCollapseItem
  },
  props: {
    confige: {
      type: Object,
      default: () => {
        return {
          activeNames: ['1'],
          accordion: true,
          data: [
            {
              title: '<i class="header-icon to-icon-info"></i>&nbsp;&nbsp;一致性',
              slot: 'slot1'
            },
            {
              title: '一致性2',
              slot: 'slot2'
            },
            {
              title: '一致性3',
              slot: 'slot3',
              disabled: true
            },
            {
              title: '一致性4',
              slot: 'slot4'
            },
            {
              title: '一致性5',
              slot: 'slot5'
            }
          ]
        };
      }
    },
    actions: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  data() {
    return {
    };
  },
  watch: {

  },
  created() {

  },
  mounted() {
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val);
      let query = {
        key: 'change',
        value: val
      };
      this.actions(query);
    }
  }
};
</script>
<style lang="scss" scoped>
.yxt-collapse-box {
  background: transparent;
}
</style>
