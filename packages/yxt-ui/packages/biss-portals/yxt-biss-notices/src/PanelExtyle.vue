<template>
  <div class="yxt-biss-notices-extyle">
    <div class="panel-extyle-mode">
      <to-button
        type="primary"
        icon="uiicon icon-doubleright"
        size="mini"
        second
        class="mode-show"
        @click="toChangeMode"
      > 更换样式</to-button>
      <img class="preview-img" :src="currentCssModeSrc" :style="{ objectFit: extyleFormKey.imgMode }" alt="当前组件模式" />
    </div>
    <yxt-collapse :confige="extyleConfig">
      <div slot="titleSlot">
        <!-- <to-row>
          <span class="tip-label">图片显示</span>
          <to-radio-group v-model="extyleFormKey.imgMode">
            <to-radio v-for="im in imgModeArr" :key="im.id" :label="im.value">{{ im.label }}</to-radio>
          </to-radio-group>
        </to-row> -->
        <to-row>
          <span class="tip-label">图标</span>
          <yxt-icon :icon="extyleFormKey.iconClazz"></yxt-icon>
          <to-button type="text" @click="toChangeIcon">选择</to-button>
        </to-row>
      </div>
    </yxt-collapse>
  </div>
</template>
<script>
export default {
  name: 'YxtBissNoticesPanelExtyle',
  props: {
    panelInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      extyleConfig: {
        activeNames: 0,
        data: [
          {
            title: '<p style="padding: 0 12px;">显示</p>',
            slot: 'titleSlot'
          }
        ]
      },
      cssModeArr: this.panelInfo.panel.extyle.cssMode.arr,
      imgModeArr: this.panelInfo.panel.extyle.imgMode.arr,
      iconClazzArr: this.panelInfo.panel.extyle.iconClazz.arr,
      extyleFormKey: {
        cssMode: this.getExtyleValue('cssMode', this.panelInfo).current,
        imgMode: this.getExtyleValue('imgMode', this.panelInfo).current,
        iconClazz: this.getExtyleValue('iconClazz', this.panelInfo).current
      }
    }
  },
  watch: {
    panelInfo: {
      handler(nval) {
        this.extyleFormKey = {
          cssMode: this.getExtyleValue('cssMode', nval).current,
          imgMode: this.getExtyleValue('imgMode', nval).current,
          iconClazz: this.getExtyleValue('iconClazz', nval).current
        }
      },
      deep: true
    },
    extyleFormKey: {
      handler(nval) {
        // console.log('extyleFormKey表单变动：', nval)
        this.actions({ key: 'watchExtyleFormKey', obj: nval })
      },
      deep: true
    }
  },
  computed: {
    currentCssModeSrc() {
      return this.cssModeArr.find(i => i.value === this.extyleFormKey.cssMode).src
    }
  },
  methods: {
    getExtyleValue(key, newPageInfo) {
      let value = newPageInfo.panel.extyle[key]
      return value
    },
    toChangeMode() {
      this.$yxtmessage.createElement({ type: 'warning', message: '研发中...' })
    },
    toChangeIcon() {
      this.$yxtmessage.createElement({ type: 'warning', message: '可选择图标库，待UI提供后替换！' })
    },
    /**
     * 配置工作台【当前comp】中的右侧属性面板
     * @param Array arr 布局配置数组，如： LAYOUT_MODE_1()
     * @param Object currentGrid 正在编辑的单个组件，如：LAYOUT_MODE_1().0.comp
     * @param String key 事件key，如：watchBaseFormKey，watchExecFormKey， watchExtyleFormKey
     * @param query 右侧Form表单，如：{ interval: 5, title: '测试标题' }
     */
    _setFormKeys(arr, currentGrid, key, query) {
      const tempArr = this._.cloneDeep(arr)
      let resArr = []
      tempArr.forEach(i => {
        let temp = this._.cloneDeep(i)
        if (temp.comp && temp.comp.xyz && temp.comp.xyz.i === currentGrid.xyz.i) {
          switch (key) {
          case 'watchExtyleFormKey': {
            temp.comp.panel.extyle.cssMode.current = query.cssMode
            temp.comp.panel.extyle.imgMode.current = query.imgMode
            temp.comp.panel.extyle.iconClazz.current = query.iconClazz
            break
          }
          default:
            break
          }
        }
        resArr.push(temp)
      })
      return resArr
    }
  }
}
</script>
<style lang="scss" scoped>
.yxt-biss-notices-extyle {
  .panel-extyle-mode{
    padding: 12px;
    .mode-show{
      z-index: 9999;
      cursor: pointer;
    }
    .preview-img {
      width: 100%;
      height: 100%;
    }
  }
  .tip-label {
    line-height: 40px;
    padding: 12px;
  }
}
</style>
