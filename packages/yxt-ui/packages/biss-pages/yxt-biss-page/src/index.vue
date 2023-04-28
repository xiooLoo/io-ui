<template>
  <div class="super-page-container">
    <YxtForm
      class="marin-bottom"
      card-style
      :labelWidth="labelWidth"
      :gutter ="gutter"
      :isAutoFix="isAutoFix"
      :size="formSize"
      :actions="handleTableActions"
      v-bind="$attrs"
      v-on="$listeners"
    >
     <template v-for="(name, index) in slotNames" v-slot:[name]="item">
        <div :key="index">
          <slot :name="name" :data="item"></slot>
        </div>
      </template>
    </YxtForm>
    <YxtBissBaseTable
      card-style
      :size="tableSize"
      :actions="handleTableActions"
      :data="tableData"
      v-bind="$attrs"
      v-on="$listeners"
    >
       <template v-for="(name, index) in slotNames" v-slot:[name]="item">
        <div :key="index">
          <slot :name="name" :data="item"></slot>
        </div>
      </template>
    </YxtBissBaseTable>
  </div>
</template>
<script>
import YxtForm from '../../../yxt-form'
import YxtBissBaseTable from '../../../biss/yxt-biss-baseTable'

export default {
  name: 'YxtBissPage',
  components: {
    YxtForm,
    YxtBissBaseTable
  },
  props: {
    gutter: {
      type: Number,
      default: 48
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    tableData: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Function,
      default: () => ({})
    },
    isAutoFix: {
      type: Boolean,
      default: false
    },
    formSize: {
      type: String
    },
    tableSize: {
      type: String
    }
  },
  data() {
    return {
      slotNames: ['empty-amend', 'expand', 'isscope', 'default', 'customTableColHead']
    }
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    handlePagination(data) {
      let query = {
        key: 'handlePagination',
        data
      };
      this.actions(query);
    },
    handleTableActions(key, data) {
      this.actions(key, data);
    }
  }
}
</script>
<style lang="scss" scoped>
.marin-bottom{
  margin-bottom:24px ;
}
</style>
