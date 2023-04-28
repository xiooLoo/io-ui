<template>
  <div class="to-card-box">
    <div
      v-for="card in cards.length > comp.sliceIndex ? cards.slice(0,comp.sliceIndex) : cards"
      :key="card.id"
      class="card-item"
      :style="{ backgroundImage: `url(${card.icon})` }"
      @click="handleCard(card)"
    >
      <span v-show="card.name" class="card-name">{{ card.name }}</span>
    </div>
    <yxt-dialog
      ref="yxtDialogRef"
      width="796px"
      :isAppendToBody="true"
      :isModalclose="true"
      :isShowClose="true"
      :btns="[]"
      :dialogConfig="comp.dialogConfig"
      :actions="handleDialogAction"
    >
      <div slot="content" class="card-item-next-content">
        <div
          v-for="card in cardsNext"
          :key="card.id"
          class="card-item-next"
          :style="{ backgroundImage: `url(${card.icon})` }"
          @click="handleCard(card)"
        >
          <span v-show="card.name" class="card-name">{{ card.name }}</span>
        </div>
      </div>
    </yxt-dialog>
  </div>
</template>

<script>
import YxtDialog from '../../../yxt-dialog'
import { fetchSystemList } from '@/api/index'
import requestConfig from '@yxtui/src/mixins/requestConfig'

const icons = {
  公共节能: 'https://pic1.imgdb.cn/item/636c97ab16f2c2beb1d92a8d.png',
  公务用车: 'https://pic1.imgdb.cn/item/636c97b216f2c2beb1d931a6.png',
  土地公物仓: 'https://pic1.imgdb.cn/item/636c97ab16f2c2beb1d92a83.png',
  经营性资产: 'https://pic1.imgdb.cn/item/636c97b216f2c2beb1d9319f.png',
  办公用房: 'https://pic1.imgdb.cn/item/636c97ab16f2c2beb1d92a9f.png',
  周转房: 'https://pic1.imgdb.cn/item/636c97ab16f2c2beb1d92a96.png',
  房产地产统一管理: 'https://pic1.imgdb.cn/item/636c97ab16f2c2beb1d92a86.png',
  监管中心: 'https://pic.imgdb.cn/item/636c97b216f2c2beb1d931be.png',
  办公门户: 'https://pic.imgdb.cn/item/636c97ab16f2c2beb1d92a96.png',
  标准仓: 'https://pic.imgdb.cn/item/636c97ab16f2c2beb1d92a83.png',
  固定资产: 'https://pic.imgdb.cn/item/636c97b216f2c2beb1d9319f.png'
}

export default {
  name: 'YxtBissApps',
  components: {
    YxtDialog
  },
  mixins: [requestConfig],
  props: {
    comp: {
      type: Object,
      default: () => {
        return {
          compId: '0',
          compName: 'YxtBissApps',
          sliceIndex: 5,
          dialogConfig: {
            title: '提示'
          },
          requestConfig: {
            accessToken: '请设置accessToken'
          }
        }
      }
    },
    action: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      cards: [],
      cardsNext: []
    }
  },
  created() {
    this.toFetchSystemList()
  },
  methods: {
    handleCard(card) {
      this.action('handleCard', card)
      switch (card.code) {
      case 'isNext':
        this.$refs.yxtDialogRef.openOrClose()
        break
      default:
        window.open(card.additionalUrl)
        break
      }
    },
    handleDialogAction(btn) {
      this.action('handleDialogAction', btn)
    },

    async toFetchSystemList() {
      const config = { ...this.requestConfig }
      await fetchSystemList(config).then(res => {
        this.loadingEl.close()
        if (res && res.code == 0) {
          const otherCards = ['004', '0014', '003', '015']
          res.data.push({
            code: 'isNext',
            id: '',
            name: '房产地产统一管理',
            sort: 0,
            url: ''
          })
          const tempCards = res.data
          this.cards = tempCards.filter(obj => {
            obj.icon = icons[obj.name]
            return !otherCards.includes(obj.code) && obj.code != '001'
          })
          this.cardsNext = tempCards.filter(obj => {
            obj.icon = icons[obj.name]
            return otherCards.includes(obj.code)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.to-card-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .card-item {
    width: calc((100% - 72px)/5);
    min-width: 120px;
    max-width: 180px;
    border-radius: 8px;
    min-height: 90px;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    flex: 1;
    cursor: pointer;
  }
  .card-item:nth-child(1) {
    margin: 0 12px;
  }
  .card-item:not(:first-child) {
    margin-right: 12px;
  }
}
.card-item-next-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  .card-item-next {
    width: calc((100% - 72px)/4);
    min-width: 120px;
    max-width: 180px;
    border-radius: 8px;
    min-height: 90px;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    flex: 1;
    cursor: pointer;
  }
  .card-item-next:nth-child(1) {
    margin: 0 12px 0 0;
  }
  .card-item-next:not(:last-child) {
    margin: 0 12px 0 0;
  }
}
.card-name {
  color: $yxt-color-white;
  position: relative;
  top: 24px;
  left: 16px;
}
</style>
