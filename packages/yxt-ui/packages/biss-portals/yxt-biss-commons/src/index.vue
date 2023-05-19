<template>
  <div class="yxt-biss-commons">
    <to-card>
      <div slot="header">
        <span class="card-perfix-border">{{ comp.title }}</span>
        <to-popover
          v-model="isShowPopover"
          placement="bottom"
          width="400"
          trigger="click"
        >
          <to-button slot="reference" type="text" style="float: right; padding: 3px 0">自定义</to-button>
          <PopCard :comp="comp" :pops="commons" :actions="popActions" />
        </to-popover>
      </div>
      <div class="commons-list">
        <template v-for="(item, index) in commons">
          <div v-if="item.isEnable" :key="index" class="list-item" @click="toLink(item)">
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
import ToButton from '../../../../../element-ui/packages/button'
import PopCard from '../components/PopCard.vue'

const base = {
  id: 'YxtBissCommons',
  compName: 'YxtBissCommons',
  title: '常用功能',
  icon: 'icon-Calendar uiicon',
  type: 'biss'
}

export default {
  base,
  name: 'YxtBissCommons',
  components: {
    PopCard,
    ToCard,
    ToPopover,
    ToButton
  },
  props: {
    comp: {
      type: Object,
      default: () => {
        return base
      }
    }
  },
  data() {
    let commons = [
      {
        desc: '',
        icon: 'http://202.100.247.175:32568/easted/b1f4e5bb309540aed0f1b62861b8e5dc.png',
        id: 1,
        isEnable: true,
        name: '局主页',
        orgCode: '',
        sort: 2,
        systemCode: '',
        url: 'https://jgsw.hainan.gov.cn/'
      },
      {
        desc: '',
        icon: 'http://202.100.247.175:32568/easted/a07de8f721479b19322f26f6f010c2d2.png',
        id: 2,
        isEnable: true,
        name: '通知公告',
        orgCode: '',
        sort: 1,
        systemCode: '',
        url: 'https://jgsw.hainan.gov.cn/'
      },
      {
        desc: '',
        icon: 'http://202.100.247.175:32568/easted/9c2193770b5a072f5d3f626c20cacbce.png',
        id: 3,
        isEnable: true,
        name: '办公用房台账',
        orgCode: '',
        sort: 3,
        systemCode: '',
        url: 'http://202.100.247.175:32569/officespace/#/dataShowBoard'
      },
      {
        desc: '',
        icon: 'http://202.100.247.175:32568/easted/bf0731a1dfdf90e477cd0fd857ca594a.png',
        id: 4,
        isEnable: true,
        name: '公务用车',
        orgCode: '',
        sort: 4,
        systemCode: '',
        url: 'http://202.100.247.175:32569/gcyhpt/#/home'
      },
      {
        desc: '',
        icon: 'http://202.100.247.175:32568/easted/94395979ff299ab6651ef7b39058e233.png',
        id: 5,
        isEnable: false,
        name: '经营性资产',
        orgCode: '',
        sort: 5,
        systemCode: '',
        url: 'http://202.100.247.175:32569/operateAssets/#/'
      }
    ]
    return {
      commons,
      isShowPopover: false
    }
  },
  methods: {
    toLink(item) {
      window.open(item.url)
    },
    popActions(key, pops) {
      if (key === 'to-sure') {
        this.commons = pops
        this.isShowPopover = false
      }
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
  .card-perfix-border {
    border-left: 4px solid $yxt-color-primary;
    padding-left: 8px;
  }
  /deep/ .to-card {
    height: 100%;
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
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .list-item {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 50%;
      padding-bottom: 12px;
      & > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .commons-name {
        font-weight: 600;
        font-size: 14px;
        padding-left: 12px;
      }
    }
  }
}
</style>
