<template>
  <div class="yxt-pop-card">
    <to-card>
      <div slot="header">
        <span class="card-perfix-border">{{ comp.panel.content.base_rows[0].value }}</span>
      </div>
      <div class="pop-list">
        <div v-for="(item, index) in allCommons" :key="index" class="list-item">
            <to-switch v-model="item.isEnable" :active-text="item.name"></to-switch>
        </div>
      </div>
      <to-row :gutters="24" class="pop-card-btns">
          <to-button type="normal" @click="toCancel">取消</to-button>
          <to-button type="primary" @click="toAddCommons">确定</to-button>
      </to-row>
    </to-card>
  </div>
</template>
<script>
import ToCard from '../../../../../element-ui/packages/card'
import ToSwitch from '../../../../../element-ui/packages/switch'
import ToButton from '../../../../../element-ui/packages/button'
import { getAllCommonFunc, addUserCommonFunc } from '@/api/index'
import mixin_requestConfig from '@yxtui/src/mixins/requestConfig'

export default {
  name: 'PopCard',
  components: {
    ToCard,
    ToSwitch,
    ToButton
  },
  mixins: [mixin_requestConfig],
  props: {
    /**
     * 基础配置项{}
     */
    comp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 常用功能数组[]
     */
    commons: {
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
      allCommons: []
    }
  },
  mounted() {
    this.$eventBus.$on('refresh_commons', () => {
      this._fetchAllCommonsList()
    })
  },
  computed: {
    cmpCommons: {
      get() {
        return this.commons
      },
      set(nval) {
        this.commons = nval
      }
    }
  },
  methods: {
    async _fetchAllCommonsList() {
      const config = { ...this.requestConfig }
      await getAllCommonFunc(config).then(res => {
        if (res && res.code == '0') {
          const resData = res.data.map(v => ({ ...v, isEnable: false }))
          resData.map(v => {
            this.cmpCommons.forEach(co => {
              if (v.id == co.id) {
                v.isEnable = true
              }
            })
            return v
          })
          this.allCommons = resData
        }
      })
    },
    toCancel() {
      this.actions('to-cancel')
    },
    async toAddCommons() {
      const ids = this.allCommons.filter(v => v.isEnable).map(v => v.id)
      const minCount = Number(this.comp.panel.content.exec_rows.find(j => j.id === 'minCount').value)
      if (ids.length < minCount) {
        this.$yxtmessage.createElement({ type: 'error', message: `常用功能不能少于${minCount}个` })
        return
      }
      const config = { ...this.requestConfig }
      await addUserCommonFunc(config, ids).then(res => {
        if (res && res.data == 'ok') {
          this.$yxtmessage.createElement({ type: 'success', message: '自定义成功' })
          this.actions('to-sure', this.allCommons)
        } else {
          this.$yxtmessage.createElement({ type: 'error', message: '操作异常，请联系管理员' })
        }
      })
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
