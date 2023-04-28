<template>
  <div class="yxt-seperator-tab-box">
    <to-tabs
      v-model="currentTab"
      class="seperator-tab"
      :type="type"
      :tab-position="tabPosition"
      @tab-click="changeTab"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="item in arr">
        <to-tab-pane
          v-if="item.code"
          :key="item.id"
          :label="item.label"
          :name="item.value"
          :disabled="item.disabled"
        >
          <span slot="label">
            <to-badge
              :value="item.badgeValue"
              :max="item.max || max"
              :hidden="item.badgeValue <= 0"
              :is-dot="item.badgeIsDot || badgeIsDot"
              :type="item.badgeType || badgeType"
              >
              <i :class="item.icon" /> {{ item.label }}
            </to-badge>
          </span>
          <slot name="content" :item="item" />
        </to-tab-pane>
      </template>
    </to-tabs>
  </div>
</template>
<script>
import ToTabs from '../../../../element-ui/packages/tabs'
import ToTabPane from '../../../../element-ui/packages/tab-pane'
import ToBadge from '../../../../element-ui/packages/badge'

export default {
  name: 'YxtTabs',
  components: {
    ToTabs,
    ToTabPane,
    ToBadge
  },
  props: {
    arr: {
      type: Array,
      default: () => [
        { id: '0',
          label: '全部',
          value: 'all',
          badgeValue: 0,
          icon: 'to-icon-date',
          max: 99
        },
        { id: '1',
          label: '本单位',
          value: 'currentUnit',
          badgeValue: 5,
          icon: 'to-icon-date',
          badgeIsDot: true
        }
      ]
    },
    max: {
      type: Number,
      default: 99
    },
    actions: {
      type: Function,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    badgeType: {
      type: String,
      default: 'danger'
    },
    badgeIsDot: {
      type: Boolean,
      default: false
    },
    tabPosition: {
      type: String,
      default: 'top'
    },
    current: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    };
  },
  computed: {
    currentTab: {
      get() {
        return this.current || this.arr[0].value;
      },
      set(nval) {
        return nval;
      }
    }
  },
  methods: {
    changeTab(element) {
      let value = element.name;
      let params = {
        key: 'changeTab',
        obj: { ...element, value }
      }
      this.actions(params);
    }
  }
};
</script>
