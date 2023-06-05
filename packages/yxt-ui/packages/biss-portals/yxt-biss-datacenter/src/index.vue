<template>
  <div class="yxt-biss-datacenter" @click.stop="toClick">
    <to-card class="datacenter-card">
      <div slot="header" class="title-flex">
        <div class="title-flex-lf">
          <yxt-svg-icon :icon="getExtyleValue('iconClazz').current" style="width:20px;margin: 0 6px 0 10px"></yxt-svg-icon>
          <span>{{ comp.panel.content.base_rows[0].value }}</span>
        </div>
        <span slot="reference" style="cursor:pointer; float: right; padding: 0px 0;font-size:14px" @click.stop="toMore">更多</span>
      </div>
      <div class="datacenter-list">
        <template v-for="(item, index) in dataList">
          <div :key="index" class="list-item" @click="toPreview(item)">
              <div class="list-item-link">
                <yxt-svg-icon :icon="compFileType(item.fileName)" style="width:20px;margin: 0 6px 0 10px"></yxt-svg-icon>
              </div>
              <div class="list-item-right">
                <div class="list-item-ups">
                  <span>{{ item.fileName }}</span>
                </div>
                <div class="list-item-sub" @click.stop="toDownload(item)">
                  <yxt-svg-icon class="datacenter-type-name" icon="common_download"></yxt-svg-icon>
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
      :dialogInfo="comp.dialogConfig"
      :actions="dialogActions"
    >
      <div class="card-item-next-content">
        <YxtViewer :file="currentFile.nextInfo" :url="currentFile.nextUrl"></YxtViewer>
      </div>
    </yxt-dialog>
  </div>
</template>
<script>
import YxtDialog from '../../../yxt-dialog'
import ToCard from '../../../../../element-ui/packages/card'
import { DATACENTER_BASE } from './config.js'
import { fetchDataCenterList } from '@/api/index'
import mixin_requestConfig from '@yxtui/src/mixins/requestConfig'
import tools from '@yxtui/src/utils/tools'
import YxtViewer from '../components/YxtViewer'

export default {
  base: DATACENTER_BASE,
  name: 'YxtBissDataCenter',
  components: {
    YxtDialog,
    ToCard,
    YxtViewer
  },
  mixins: [mixin_requestConfig],
  props: {
    comp: {
      type: Object,
      default: () => {
        return DATACENTER_BASE
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      dataList: [],
      currentFile: {}
    }
  },
  created() {
    this.fetchList()
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
    toPreview(item) {
      let nextUrl = `${this.requestConfig.requestUrl}/portal/pf/notice/downloadFile/${item.fileId}?accessToken=${this.requestConfig.accessToken}`
      if (!nextUrl.startsWith('http://') && !url1.startsWith('https://')) {
        nextUrl = location.origin + nextUrl;
      }
      let nextInfo = {
        name: item.fileName,
        size: parseInt(item.longFileSize),
        url: nextUrl
      }
      this.currentFile = {
        ...item,
        nextUrl,
        nextInfo
      }
      this.$refs.yxtDialogRef.openOrClose()
    },
    toDownload(item) {
      let nextUrl = `${this.requestConfig.requestUrl}/portal/pf/notice/downloadFile/${item.fileId}?accessToken=${this.requestConfig.accessToken}`
      if (!nextUrl.startsWith('http://') && !url1.startsWith('https://')) {
        nextUrl = location.origin + nextUrl;
      }
      window.open(nextUrl, '_blank');
    },
    getExtyleValue(key) {
      let value = this.comp.panel.extyle[key]
      return value
    },
    compFileType(fileName) {
      return tools.getFileType(fileName)
    },
    dialogActions(btn) {
      console.log('操作：', btn)
      this.$refs.yxtDialogRef.openOrClose()
    },
    async fetchList() {
      const config = { ...this.requestConfig }
      const params = { page: 1, size: 5 }
      await fetchDataCenterList(config, params).then(res => {
        if (res && res.code == '0') {
          this.dataList = res.data.dataList
        } else {
          this.dataList = []
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.yxt-biss-datacenter {
  height: 100%;
  .datacenter-card {
    background-color: transparent;
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
  .datacenter-list {
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
      width: calc(100% - 24px);
      height: 46px;
      padding: 12px;
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
          .datacenter-type-name {
            font-size: 12px;
            color: $yxt-color-info;
          }
        }
      }
    }
  }
}
</style>
