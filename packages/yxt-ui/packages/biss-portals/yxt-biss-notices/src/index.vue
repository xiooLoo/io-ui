<template>
  <div class="yxt-biss-notices" @click.stop="toClick">
    <to-card class="notices-card">
      <div slot="header" class="title-flex">
        <div class="title-flex-lf">
          <yxt-svg-icon :icon="getExtyleValue('iconClazz').current" style="width:20px;margin: 0 6px 0 10px"></yxt-svg-icon>
          <span>{{ comp.panel.content.base_rows[0].value }}</span>
        </div>
        <span slot="reference" style="cursor:pointer; float: right; padding: 0px 0;font-size:14px" @click.stop="toMore">更多</span>
      </div>
      <div class="notices-list">
        <template v-for="(item, index) in sliceNotices">
          <div :key="index" class="list-item" @click="toDetail(item)">
              <div class="list-item-time">
                <div>{{ item.day }}</div>
                <div>{{ item.month }}月</div>
              </div>
              <div class="list-item-right">
                <div class="list-item-ups">
                  <to-tag v-if="item.topNotice" class="notices-tag" type="warning" size="mini">置顶</to-tag>
                  <to-tooltip :content="item.noticeName" placement="top">
                    <span class="notice-name">{{ item.noticeName }}</span>
                  </to-tooltip>
                </div>
                <div class="list-item-sub">
                  <span class="notices-type-name">{{ item.noticeTypeName }}</span>
                  <span v-show="hasValue('0')" class="notices-cuser-name">{{ item.createUserName }}</span>
                  <span v-show="hasValue('1')" class="notices-ctime-name">{{ item.createAt }}</span>
                </div>
              </div>
          </div>
        </template>
      </div>
    </to-card>
    <NoticeDialog
      :notice-val="currentNotice"
      :dialog-visible="noticeDialogVisible"
      :requestConfig="comp.requestConfig"
      @close="closeNotice"
      @refresh="fetchList"
    />
  </div>
</template>
<script>
import ToCard from '../../../../../element-ui/packages/card'
import ToTag from '../../../../../element-ui/packages/tag'
import { NOTICES_BASE } from './config.js'
import { fetchNoticeList } from '@/api/index'
import mixin_requestConfig from '@yxtui/src/mixins/requestConfig'
import NoticeDialog from '../components/NoticeDialog'

export default {
  base: NOTICES_BASE,
  name: 'YxtBissNotices',
  components: {
    ToCard,
    ToTag,
    NoticeDialog
  },
  mixins: [mixin_requestConfig],
  props: {
    comp: {
      type: Object,
      default: () => {
        return NOTICES_BASE
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      notices: [],
      currentNotice: {},
      noticeDialogVisible: false
    }
  },
  created() {
    this.fetchList()
  },
  computed: {
    hasValue() {
      return function(tag) {
        const values = this.comp.panel.content.exec_rows.find(r => r.id === 'field').value
        return values.includes(tag)
      }
    },
    sliceNotices() {
      const lineCount = Number(this.comp.panel.content.exec_rows.find(r => r.id === 'lineCount').value)
      if (this.notices.length >= lineCount) {
        return this.notices.slice(0, lineCount)
      } else {
        return this.notices
      }
    }
  },
  methods: {
    toClick() {
      this.actions({
        key: 'toClick',
        obj: this.comp
      })
    },
    toMore() {
      this.actions({
        key: 'toMore',
        obj: this.comp
      })
    },
    toDetail(item) {
      this.currentNotice = item
      this.noticeDialogVisible = true;
    },
    getExtyleValue(key) {
      let value = this.comp.panel.extyle[key]
      return value
    },
    closeNotice() {
      this.noticeDialogVisible = false;
    },
    async fetchList() {
      const config = { ...this.requestConfig }
      const params = { page: 1, size: 5 }
      await fetchNoticeList(config, params).then(res => {
        if (res && res.code == '0') {
          let arrs = []
          res.data.dataList.forEach(v => {
            arrs.push({
              ...v,
              month: new Date(v.createAt).getMonth() + 1,
              day: new Date(v.createAt).getDate()
            })
          })
          this.notices = arrs || []
        } else {
          this.notices = []
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';
@import '../../../../../assets/scss/yxt-mixin.scss';

.yxt-biss-notices {
  height: 100%;
  .notices-card {
    background-color: rgba(255,255,255,0.6);
  }
  .title-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 24px;
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
  .notices-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: inherit;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .list-item {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 72px;
      padding: 12px 0;
      border-bottom: 1px dashed $yxt-color-info-hex-d8dade;
      .list-item-time {
        font-size: 12px;
        border-top: 4px solid rgba(46, 120, 255, 0.1);
        flex-shrink: 0;
        width: 36px;
        height: 100%;
        background: rgba(46, 120, 255, 0.08);
        border-radius: 2px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        & > div:nth-child(1) {
          font-size: 14px;
          color: $yxt-color-grey;
        }
        & > div:nth-child(2) {
          font-size: 12px;
          color: $yxt-color-grey-70;
        }
      }
      .list-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        width: calc(100% - 48px);
        padding-left: 12px;
        .list-item-ups {
          font-size: 14px;
          width: 100%;
          display: flex;
          & > .notices-tag {
            padding: 0 6px;
            margin-right: 6px;
            border-radius: 2px;
          }
          .notice-name {
            font-size: 14px;
            color: $yxt-color-grey;
            @include mixin_ellipsis_more(2);
            display: inline-block;
          }
        }
        .list-item-sub {
          .notices-type-name {
            font-size: 12px;
            color: $yxt-color-info;
          }
          .notices-cuser-name {
            padding-left: 12px;
            font-size: 12px;
            color: $yxt-color-info;
          }
          .notices-ctime-name {
            padding-left: 12px;
            font-size: 12px;
            color: $yxt-color-info;
          }
        }
      }
    }
  }
}
</style>
