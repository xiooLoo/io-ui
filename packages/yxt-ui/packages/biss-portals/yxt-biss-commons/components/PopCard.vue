<template>
  <div class="yxt-pop-card">
    <to-card>
      <div slot="header">
        <span class="card-perfix-border">{{ comp.todoTitle }}</span>
      </div>
      <div class="pop-list">
        <div v-for="(item, index) in cmpPops" :key="index" class="list-item">
            <to-switch v-model="item.isEnable" :active-text="item.name"></to-switch>
        </div>
      </div>
      <to-row :gutters="24" class="pop-card-btns">
          <to-button type="primary" @click="toSure">确定</to-button>
      </to-row>
    </to-card>
  </div>
</template>
<script>
import ToCard from '../../../../../element-ui/packages/card'
import ToSwitch from '../../../../../element-ui/packages/switch'
import ToButton from '../../../../../element-ui/packages/button'

export default {
  name: 'PopCard',
  components: {
    ToCard,
    ToSwitch,
    ToButton
  },
  props: {
    /**
     * 基础配置项{}
     */
    comp: {
      type: Object,
      default: () => {
        return {
          id: 'yxt-pop-card',
          compName: 'YxtBissApps',
          todoTitle: '常用功能'
        }
      }
    },
    /**
     * 常用功能数组[]
     */
    pops: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    cmpPops: {
      get() {
        return this.pops
      },
      set(nval) {
        this.pops = nval
      }
    }
  },
  methods: {
    toSure() {
      this.actions('to-sure', this.cmpPops)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.yxt-pop-card {
  height: 100%;
  .card-perfix-border {
    border-left: 4px solid $yxt-color-primary;
    padding-left: 8px;
  }
  /deep/ .to-card {
    height: 100%;
    .to-card__body {
      height: calc(100% - 96px);
    }
  }
  .pop-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .list-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 50%;
      padding-bottom: 12px;
    }
  }
  .pop-card-btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
