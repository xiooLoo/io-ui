<template>
  <div class="yxt-biss-notices">
    <to-card>
      <div slot="header">
        <span class="card-perfix-border">{{ comp.todoTitle }}</span>
        <to-button slot="reference" type="text" style="float: right; padding: 3px 0">更多</to-button>
      </div>
      <div class="notices-list">
        <template v-for="(item, index) in notices">
          <div :key="index" class="list-item" @click="toDetail(item)">
              <div class="list-item-time">
                <div>{{ item.day }}</div>
                <div>{{ item.month }}月</div>
              </div>
              <div class="list-item-right">
                <div class="list-item-ups">
                  <to-tag v-if="item.topNotice" class="notices-tag" type="warning" size="mini">置顶</to-tag>
                  <span>{{ item.noticeName }}</span>
                </div>
                <div class="list-item-sub">
                  <span class="notices-type-name">{{ item.noticeTypeName }}</span>
                </div>
              </div>
          </div>
        </template>
      </div>
    </to-card>
    <yxt-dialog
      ref="yxtDialogRef"
      width="796px"
      :isAppendToBody="true"
      :isModalclose="true"
      :isShowClose="true"
      :btns="[]"
      :dialogConfig="comp.dialogConfig"
    >
      <div slot="content" class="card-item-next-content">
        <span>{{ currentNotice.noticeName }} - {{ currentNotice.createAt }}</span>
        <br>
        <br>
        <span>详细详情，略......</span>
      </div>
    </yxt-dialog>
  </div>
</template>
<script>
import YxtDialog from '../../../yxt-dialog'
import ToCard from '../../../../../element-ui/packages/card'
import ToButton from '../../../../../element-ui/packages/button'
import ToTag from '../../../../../element-ui/packages/tag'

export default {
  name: 'YxtBissNotices',
  components: {
    YxtDialog,
    ToCard,
    ToButton,
    ToTag
  },
  props: {
    comp: {
      type: Object,
      default: () => {
        return {
          id: 'yxt-biss-notices',
          compName: 'YxtBissNotices',
          todoTitle: '通知公告'
        }
      }
    }
  },
  data() {
    let notices = [
      {
        createAt: '2022-10-26 11:51:41',
        createUserId: '1',
        createUserName: '省局管理员',
        id: '1034796459345317888',
        isCurrentUser: 1,
        messageRemind: [
          'system'
        ],
        noticeName: '测试通知公告',
        noticeType: '8',
        noticeTypeName: '通知公告',
        orgCode: '',
        receiveRange: 0,
        tenantId: '1',
        topNotice: 1,
        visitsNum: 16
      },
      {
        createAt: '2022-07-12 16:21:46',
        createUserId: '1',
        createUserName: '',
        id: '996451312198488064',
        isCurrentUser: 1,
        messageRemind: [
          'no'
        ],
        noticeName: '固定资产处置',
        noticeType: '33',
        noticeTypeName: '固定资产',
        orgCode: '',
        receiveRange: 0,
        tenantId: '1',
        topNotice: 1,
        visitsNum: 37
      },
      {
        createAt: '2022-07-12 11:51:35',
        createUserId: '1',
        createUserName: '',
        id: '996383319837904896',
        isCurrentUser: 1,
        messageRemind: [
          'no'
        ],
        noticeName: '办公用房处理',
        noticeType: '8',
        noticeTypeName: '通知公告',
        orgCode: '',
        receiveRange: 0,
        tenantId: '1',
        topNotice: 0,
        visitsNum: 21
      },
      {
        createAt: '2022-07-11 15:29:22',
        createUserId: '1',
        createUserName: '',
        id: '996075738456133632',
        isCurrentUser: 1,
        messageRemind: [
          'no'
        ],
        noticeName: '资产统一盘点',
        noticeType: '33',
        noticeTypeName: '固定资产',
        orgCode: '',
        receiveRange: 0,
        tenantId: '1',
        topNotice: 0,
        visitsNum: 15
      },
      {
        createAt: '2022-07-07 16:13:01',
        createUserId: '1',
        createUserName: '',
        id: '994637171972378624',
        isCurrentUser: 1,
        messageRemind: [
          'system'
        ],
        noticeName: '56',
        noticeType: '7',
        noticeTypeName: '公务用车',
        orgCode: '',
        receiveRange: 0,
        tenantId: '1',
        topNotice: 0,
        visitsNum: 18
      }
    ].map(v => ({
      ...v,
      month: new Date(v.createAt).getMonth() + 1,
      day: new Date(v.createAt).getDate()
    }))
    return {
      notices,
      currentNotice: {}
    }
  },
  methods: {
    toDetail(item) {
      this.currentNotice = item
      this.$refs.yxtDialogRef.openOrClose()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.yxt-biss-notices {
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
  .notices-list {
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
      width: 100%;
      height: 62px;
      padding: 8px;
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
      }
      .list-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        padding-left: 12px;
        .list-item-ups {
          font-size: 14px;
          & > .notices-tag {
            padding: 0 12px;
            margin-right: 12px;
          }
        }
        .list-item-sub {
          .notices-type-name {
            font-size: 12px;
            color: $yxt-color-info;
          }
        }
      }
    }
  }
}
</style>
