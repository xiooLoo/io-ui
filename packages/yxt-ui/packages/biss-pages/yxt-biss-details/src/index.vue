<template>
<div class="super-details-container">
  <section class="card-box" v-for="(item, index) in sectionProps" :key="index">
    <template v-if="item.type === 'text'" >
        <to-descriptions :title="item.title" v-bind="item">
          <template v-for="(slot, index) in $slots" :slot="index.split('-')[1]">
            <slot :name="index"></slot>
          </template>
        <to-descriptions-item v-for="(item2, index2) in item.textItems" :key="index2" :label="item2.label" :span="item2.span" >
          <template v-if="item2.labelSlot">
            <template slot="label">
              <slot :name="item.type+'-'+item2.labelSlot"></slot>
            </template>
            {{item2.value}}
          </template>
          <template v-else>
            {{item2.value}}
          </template>
        </to-descriptions-item>
      </to-descriptions>
    </template>
    <template v-if="item.type === 'tabel'">
        <YxtBissBaseTable
          cardStyle
          :boder="false"
          v-bind="item"
          v-on="$listeners"
          :tableHeadTitle="item.title"
          :actions="handleTableActions"
        >
          <template v-for="(name, index) in slotNames" v-slot:[name]="item">
            <div :key="index">
              <slot :name="name" :data="item"></slot>
            </div>
          </template>
        </YxtBissBaseTable>
    </template>
    <template v-if="item.type === 'flow'" >
      <div class="card-head">
      <div class="title">{{item.title}} </div>
    </div>
    <div class="card-body " >
       <to-timeline>
        <to-timeline-item
          v-for="(activity, index) in item.flowItems"
          :key="index"
          v-bind="activity">
          {{activity.content}}
        </to-timeline-item>
      </to-timeline>
    </div>
    </template>
  </section>
</div>
</template>
<script>
import ToDescriptions from '../../../../../element-ui/packages/descriptions'
import ToDescriptionsItem from '../../../../../element-ui/packages/descriptions-item'
import YxtBissBaseTable from '../../../biss/yxt-biss-baseTable'
import ToTimeline from '../../../../../element-ui/packages/timeline'
import ToTimelineItem from '../../../../../element-ui/packages/timeline-item'

export default {
  name: 'YxtBissDetails',
  components: {
    ToDescriptions,
    ToDescriptionsItem,
    YxtBissBaseTable,
    ToTimeline,
    ToTimelineItem
  },
  props: {
    actions: {
      type: Function,
      default: () => ({})
    },
    sectionProps: {
      type: Array,
      required: true
    },
    activities: {
      type: Array,
      default: () => [{
        content: '住房申请-王三天-发起',
        timestamp: '2018-04-12 20:46',
        color: '#0bbd87'
      }, {
        content: '材料审核-张科长，王科长，李科长-审批中',
        timestamp: '2018-04-03 20:46',
        color: '#2E78FF'
      }, {
        content: '材料审核-王处长-审批中',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },
  data() {
    return {
      slotNames: ['empty-amend', 'expand', 'isscope', 'default', 'customTableColHead']
    }
  },
  watch: {},
  computed: {
    sumSpan() {
      return 24 / this.rowSpan
    }
  },
  created() {},
  methods: {
    handlePagination(data) {
      let query = {
        key: 'handlePagination',
        data
      };
      this.actions(query);
    },
    handleTableActions(data) {
      this.actions(data);
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .to-descriptions__header {
  // background: red;
  padding: 16px 24px;
  border-bottom: 1px solid #EDEEF0;
  .to-descriptions__title {
    font-weight: 500 ;
  }
}
/deep/ .to-descriptions__body {
  padding: 0 24px 24px 24px;
  // background: red;
}
.card-box{
  border-radius: 2px;
  background-color: #fff;
  margin-bottom: 24px;
  .card-head {
    height: 56px;
    line-height: 56px;
    padding: 0 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #EDEEF0;
    .title {
      font-size: 16px;
      color: #14203B;
    }
  }
  .card-body {
    color: #2B364E;
    font-size: 14px;
    padding: 24px;
    .item-wrapper {
      display: flex;
      margin-bottom: 16px;
      .item-label{
        color: #5A6275;
      }
      .item-value {
        color: #2B364E;
      }
    }
  }
  .extra {
    padding-bottom: 24px;
  }
}
.card-box:last-child{
  margin-bottom: 0px;
}
</style>
