<template>
  <div>
    <to-timeline :reverse="reverse"  :class="[isShowLeft ? 'yxt-timeline-left':'' ]">
      <to-timeline-item
        v-for="(item, index) in timeLines"
        :key="index"
        :icon="item.icon"
        :type="item.type"
        :color="item.color"
        :size="item.size"
        :hide-timestamp="item.hideTimestamp"
        :placement="item.placement"
        :timestamp="item.timestamp"
        :class="[ classRowType(item && item.rowType) , classNew(item &&item.class) , classUItype(item && item.UItype) ]"
        >
        <div v-if="hasDefaultContent" >{{item.defaultContent}}</div>
        <div v-if="item.isDot" slot="dot">
          <slot name="dot" :dot="item"></slot>
        </div>
        <slot name="line" :line="item"></slot>
      </to-timeline-item>
    </to-timeline>
  </div>
</template>
<script>
import ToTimeline from '../../../../element-ui/packages/timeline'
import ToTimelineItem from '../../../../element-ui/packages/timeline-item'

export default {
  name: 'YxtTimeLine',
  components: {
    ToTimeline,
    ToTimelineItem
  },
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    isShowLeft: {
      type: Boolean,
      default: false
    },
    hasDefaultContent: {
      type: Boolean,
      default: true
    },
    timeLines: {
      type: Array,
      default: () => []
      // {
      //   defaultContent: '支持使用图标',
      //   timestamp: '2018-04-12 20:46',
      //   size: 'large',
      //   type: 'primary',
      //   icon: 'to-icon-more',
      //   hideTimestamp: true,
      //   rowType: 'left',
      //   isDot: false
      // }, {
      //   defaultContent: '支持自定义颜色',
      //   timestamp: '2018-04-03 20:46',
      //   color: '#0bbd87',
      //   placement: 'top',
      //   class: 'myclass'
      // }, {
      //   defaultContent: '支持自定义尺寸',
      //   timestamp: '2018-04-03 20:46',
      //   size: 'large',
      //   UItype: 'Gw'
      // }, {
      //   defaultContent: '默认样式的节点',
      //   timestamp: '2018-04-03 20:46'
      // }
    }
  },
  computed: {
    classRowType() {
      return function (type = 'right') {
        return `yxt-timeline-item-${type}`;
      };
    },
    classUItype() {
      return function (UItype = '') {
        return UItype ? `yxt-timeline-${UItype}` : '';
      };
    },
    classNew() {
      return function (newType = '') {
        return newType ? `yxt-timeline-${newType}` : '';
      };
    }
  }
};
</script>
<style lang="scss">
.yxt-timeline-left {
  margin-left: 150px;

  .yxt-timeline-item-left {
    .to-timeline-item__timestamp.is-top {
      margin-left: -150px;
    }
  }
}
.yxt-timeline-GW {
  .to-timeline-item__wrapper {
    margin-left: 15px;
  }
  .to-timeline-item__node--large {
    width: 32px;
    height: 32px;
    left: -10px;
  }
}
</style>
