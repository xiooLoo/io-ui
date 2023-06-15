<template>
  <div class="yxt-biss-commons" @click.stop="toClick">
    <to-card class="commons-card">
      <div slot="header" class="title-flex">
        <div class="title-flex-lf">
          <yxt-svg-icon :icon="getExtyleValue('iconClazz').current" style="width:20px;margin: 0 6px 0 10px"></yxt-svg-icon>
          <span>{{ comp.panel.content.base_rows[0].value }}</span>
        </div>
        <to-popover
          v-model="isShowPopover"
          placement="bottom"
          width="400"
          trigger="click"
          @show="popoverShow"
        >
          <span slot="reference" style="cursor:pointer; float: right; padding: 0px 0;font-size:14px">自定义</span>
          <PopCard ref="popCardRef" :comp="comp" :commons="commons" :actions="popActions" />
        </to-popover>
      </div>
      <div class="commons-list">
        <template v-for="(item, index) in commons">
          <div v-if="item.isEnable" :key="index" class="list-item" @click.prevent="toLink(item)">
              <img :src="item.icon" alt>
              <span class="commons-name">{{ item.name }}</span>
          </div>
        </template>
      </div>
    </to-card>
  </div>
</template>
<script>
import ToCard from '../../../../../element-ui/packages/card'
import ToPopover from '../../../../../element-ui/packages/popover'
import PopCard from '../components/PopCard.vue'
import mixin_requestConfig from '@yxtui/src/mixins/requestConfig'
import { findCommonFuncByUserId } from '@/api/index'
import { COMMONS_BASE } from './config.js'

export default {
  base: COMMONS_BASE,
  name: 'YxtBissCommons',
  components: {
    PopCard,
    ToCard,
    ToPopover
  },
  mixins: [mixin_requestConfig],
  props: {
    comp: {
      type: Object,
      default: () => {
        return COMMONS_BASE
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      commons: [],
      isShowPopover: false
    }
  },
  created() {
    this.fetchCommons()
  },
  mounted() {
    this.$eventBus.$on('refresh_commons', () => {
      this.fetchCommons()
    })
  },
  methods: {
    toClick() {
      this.actions({
        key: 'toClick',
        obj: this.comp
      })
    },
    toLink(item) {
      window.open(item.url)
    },
    popoverShow() {
      this.$refs.popCardRef._fetchAllCommonsList()
    },
    popActions(key) {
      if (key === 'to-sure') {
        this.fetchCommons()
        this.$eventBus.$emit('refresh_commons_panel')
      }
      this.isShowPopover = false
    },
    getExtyleValue(key) {
      let value = this.comp.panel.extyle[key]
      return value
    },
    async fetchCommons() {
      const config = { ...this.requestConfig }
      await findCommonFuncByUserId(config).then(res => {
        const resData = res.data || []
        resData.map(v => {
          v.isEnable = true
        })
        this.commons = resData
      })
    }
  }
}
</script>
<style>
.to-popper[x-placement^="bottom"] {
  padding: 0;
}
</style>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.yxt-biss-commons {
  height: 100%;
  .commons-card {
    background: url('https://pic.imgdb.cn/item/647effe21ddac507ccce5324.png');
    background-size: 110% 115%;
    background-repeat: no-repeat;
    background-position: -40px -50px;
  }
  .title-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-lf {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
  /deep/ .to-card {
    height: 100%;
    border: none;
    .to-card__body {
      height: calc(100% - 48px);
    }
  }
  .commons-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    height: inherit;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .list-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(50% - 50px);
      margin: 12px;
      padding: 12px;
      border-radius: 4px;
      background: rgba(255,255,255,0.8);
      border: 1px solid;
      border-image: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)) 1 1;
      & > img {
        width: 50px;
        height: 50px;
      }
      .commons-name {
        font-weight: 400;
        font-size: 14px;
        padding-top: 8px;
      }
    }
    .list-item:hover {
      border-radius: 4px;
      box-shadow: 0px 1px 14px 0px rgba(20,32,59,0.1);
    }
  }
}
</style>
