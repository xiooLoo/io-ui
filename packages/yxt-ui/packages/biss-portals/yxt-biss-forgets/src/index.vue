<template>
  <div class="yxt-biss-forgets">
    <to-card>
      <div slot="header">
        <span class="card-perfix-border">{{ comp.title }}</span>
        <span slot="reference" class="forgets-tabs" style="float: right;">
          <span class="tabs-item" :class="activeTab === 'unfinish' ? 'active-tab' : 'unactive-tab'" @click="activeTab = 'unfinish'">未完成</span>
          <span class="tabs-item" :class="activeTab === 'finished' ? 'active-tab' : 'unactive-tab'" @click="activeTab = 'finished'">已完成</span>
          <span class="to-icon-circle-plus-outline forgets-tab-add"></span>
        </span>
      </div>
      <div class="forgets-list">
        <template v-for="(item, index) in forgetsArr">
          <div :key="index" class="list-item" @click="toPreview(item)">
              <div class="list-item-link">
                <span class="to-icon-link"></span>
              </div>
              <div class="list-item-right">
                <div class="list-item-ups">
                  <span>{{ item.fileName }}</span>
                </div>
                <div class="list-item-sub" @click.stop="toDownload(item)">
                  <span class="forgets-type-name to-icon-check"></span>
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
        <span>{{ currentFile.fileName }} - {{ currentFile.createAt }}</span>
        <br>
        <br>
        <span>详细预览内容，略......</span>
      </div>
    </yxt-dialog>
  </div>
</template>
<script>
import YxtDialog from '../../../yxt-dialog'
import ToCard from '../../../../../element-ui/packages/card'

const base = {
  id: 'YxtBissForgets',
  compName: 'YxtBissForgets',
  title: '备忘清单',
  icon: 'icon-Time uiicon',
  type: 'biss'
}

export default {
  base,
  name: 'YxtBissForgets',
  components: {
    YxtDialog,
    ToCard
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
    let forgetsArr = [
      {
        createAt: '2022-07-13 09:15:17',
        deleteFlag: 0,
        fileId: '996706374955044864',
        fileName: '公务仓申请入库 (5).xlsx',
        fileSize: '9156',
        folderName: '',
        id: '996706375034736640',
        parentId: '0',
        tenantId: '1',
        type: 1,
        updateAt: '2022-07-13 09:15:17',
        userId: '1'
      },
      {
        createAt: '2022-07-12 16:18:24',
        deleteFlag: 0,
        fileId: '996450467172061184',
        fileName: 'Dingtalk_20220629165919.jpg',
        fileSize: '25687',
        folderName: '',
        id: '996450467230781440',
        parentId: '0',
        tenantId: '1',
        type: 1,
        updateAt: '2022-07-12 16:18:24',
        userId: '1'
      },
      {
        createAt: '2022-07-12 16:15:36',
        deleteFlag: 0,
        fileId: '996449761727877120',
        fileName: '车辆档案.xlsx',
        fileSize: '9929',
        folderName: '',
        id: '996449761778208768',
        parentId: '996449710599311360',
        tenantId: '1',
        type: 1,
        updateAt: '2022-07-12 16:15:36',
        userId: '1'
      },
      {
        createAt: '2022-07-12 16:15:36',
        deleteFlag: 0,
        fileId: '996449761677545472',
        fileName: '车辆档案错误记录 (1).xlsx',
        fileSize: '3900',
        folderName: '',
        id: '996449761753042944',
        parentId: '996449710599311360',
        tenantId: '1',
        type: 1,
        updateAt: '2022-07-12 16:15:36',
        userId: '1'
      },
      {
        createAt: '2022-07-12 16:15:36',
        deleteFlag: 0,
        fileId: '996449761706905600',
        fileName: '车辆档案错误记录 (2).xlsx',
        fileSize: '3901',
        folderName: '',
        id: '996449761769820160',
        parentId: '996449710599311360',
        tenantId: '1',
        type: 1,
        updateAt: '2022-07-12 16:15:36',
        userId: '1'
      },
      {
        createAt: '2022-07-12 16:15:36',
        deleteFlag: 0,
        fileId: '996449761681739776',
        fileName: '车辆档案错误记录.xlsx',
        fileSize: '3901',
        folderName: '',
        id: '996449761753042945',
        parentId: '996449710599311360',
        tenantId: '1',
        type: 1,
        updateAt: '2022-07-12 16:15:36',
        userId: '1'
      }
    ]
    return {
      forgetsArr,
      currentFile: {},
      activeTab: 'unfinish'
    }
  },
  methods: {
    toPreview(item) {
      this.currentFile = item
      this.$refs.yxtDialogRef.openOrClose()
    },
    toDownload(item) {
      this.$message({ type: 'warning', message: `下载功能开发中...${item.fileName}` })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.yxt-biss-forgets {
  height: 100%;
  .forgets-tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .active-tab {
      color: $yxt-color-primary;
    }
    .unactive-tab {
      color: $yxt-color-info;
    }
    .forgets-tab-add {
      cursor: pointer;
      font-size: 20px;
      color: $yxt-color-primary;
    }
    .tabs-item {
      cursor: pointer;
      margin-right: 24px;
    }
  }
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
  .forgets-list {
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
      height: 32px;
      padding: 8px;
      border-bottom: 1px dashed $yxt-color-info-hex-d8dade;
      .list-item-link {
        font-size: 16px;
        color: $yxt-color-primary;
      }
      .list-item-right {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 12px;
        .list-item-ups {
          font-size: 14px;
        }
        .list-item-sub {
          .forgets-type-name {
            font-size: 16px;
            color: $yxt-color-info;
            visibility: hidden;
          }
        }
      }
    }
    .list-item:hover .forgets-type-name {
      visibility: visible;
      color: red;
      font-weight: 600;
    }
  }
}
</style>
