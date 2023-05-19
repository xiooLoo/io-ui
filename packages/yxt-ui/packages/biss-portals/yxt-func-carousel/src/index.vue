<template>
  <div class="yxt-func-carousel" :key="comp.xyz.i" @click.stop="toClick">
    <to-card>
      <div v-if="getExtyleValue('titleShow').current === 'block'" slot="header">
        <yxt-icon :icon="getExtyleValue('iconClazz').current"></yxt-icon>
        <span class="card-perfix-border">{{ comp.panel.content.base_rows[0].value }}</span>
        <!-- <span class="card-perfix-border">{{ comp.title }}</span> -->
      </div>
      <to-carousel :type="getExtyleValue('type')" :interval="getBaseFormValue('interval') * 1000" v-bind="$attrs" v-on="$listeners">
        <to-carousel-item v-for="item in getExecFormValue('carouoselPic', 'arr')" :key="item.id" @click.prevent="toClickImg(item)">
          <yxt-image-view :src="item.src" :fit="getExtyleValue('imgMode').current" />
        </to-carousel-item>
      </to-carousel>
    </to-card>
  </div>
</template>
<script>
import requestConfig from '@yxtui/src/mixins/requestConfig'
import ToCarousel from '../../../../../element-ui/packages/carousel'
import ToCarouselItem from '../../../../../element-ui/packages/carousel-item'

const base = {
  id: 'YxtFuncCarousel',
  compName: 'YxtFuncCarousel',
  compNameContent: 'YxtFuncCarouselPanelContent', // 右侧面板-内容Content
  compNameExtyle: 'YxtFuncCarouselPanelExtyle', // 右侧面板-样式Extyle
  icon: 'icon-Sort uiicon', // 使用YXTUI组件库iconfont，位置：packages/assets/iconfont/iconfont.css
  title: '轮播图', // 组件标题
  type: 'func', // 组件类型：功能组件‘func’，业务组件‘biss’
  panel: {
    content: {
      base_rows: [
        {
          id: 'title',
          type: 'input',
          inputType: 'input',
          label: '组件标题',
          value: '轮播图',
          maxlength: 20,
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入组件标题', trigger: 'blur' }
          ]
        },
        {
          id: 'interval',
          type: 'inputNumber',
          inputType: 'inputNumber',
          min: 1,
          max: 20,
          label: '轮播间隔(s)',
          value: 6,
          isAlwaysShow: true,
          rules: [
            { required: false, message: '请设置轮播间隔(s)', trigger: 'blur' }
          ]
        }
      ],
      exec_rows: [
        {
          id: 'carouoselPic',
          type: 'upload',
          label: '图片上传',
          value: '',
          isAlwaysShow: true,
          uploadPath: `${'http://localhost:8080'}/report/excel/import/program`,
          headers: {
            accessToken: '临时token:test112233'
          },
          limit: 10,
          multiple: false,
          rules: [
            { required: false, message: '请上传图片', trigger: 'blur' }
          ],
          arr: [ // 图片数组
            { id: '0', src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg', nextSrc: 'https://www.iconfont.cn', dos: 'in', alt: '红色' },
            { id: '1', src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg', nextSrc: 'https://www.baidu.com', dos: 'in', alt: '蓝色' },
            { id: '2', src: 'https://pic2.imgdb.cn/item/63dc6b3307d5ca72061cf764.png', nextSrc: 'https://codesign.qq.com', dos: 'in', alt: '绿色' }
          ]
        },
        {
          id: 'carouoselUrl',
          type: 'input',
          inputType: 'input',
          label: 'URL',
          value: '',
          isAlwaysShow: true,
          rules: [
            { required: true, message: '请输入图片跳转地址', trigger: 'blur' }
          ]
        }
      ]
    },
    extyle: {
      cssMode: {
        current: 'LR',
        arr: [
          { id: '0', label: '样式-1', value: 'LR', src: 'https://pic2.imgdb.cn/item/642a7490a682492fcc0cc8b4.jpg' },
          { id: '1', label: '样式-2', value: 'TB', src: 'https://pic2.imgdb.cn/item/642a7477a682492fcc0c6e6a.jpg' }
        ]
      },
      imgMode: { // 图片显示模式：origin | full
        current: 'none',
        arr: [
          { id: '0', label: '显示原图', value: 'none' },
          { id: '1', label: '等比拉伸', value: 'fill' }
        ]
      },
      titleShow: { // 标题是否显示：show | hide
        current: 'block',
        arr: [
          { id: '0', label: '显示标题', value: 'block' },
          { id: '1', label: '不显示', value: 'none' }
        ]
      },
      type: 'card', // 轮播模式，默认'card'
      iconClazz: { // 图标icon，使用方式一：YXTUI组件库图标 如，'uiicon icon-Sort', 使用方式二：外部系统iconfont图标 如，'iconfont_1 icon-Sort'
        current: 'Warning-Circle-Fill',
        arr: []
      }
    }
  }
}

export default {
  base,
  name: 'YxtFuncCarousel',
  components: {
    ToCarousel,
    ToCarouselItem
  },
  mixins: [requestConfig],
  props: {
    /**
     * 组件基础信息
     */
    comp: {
      type: Object,
      default: () => {
        return base
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    toClick() {
      this.actions({
        key: 'toClick',
        obj: this.comp
      })
    },
    toClickImg(item) {
      if (item.dos === 'in') {
        window.open(item.nextSrc)
      } else {
        this.actions({
          key: 'toClickImg',
          obj: item
        })
      }
    },
    getBaseFormValue(key, sk = 'value') {
      let item = this.comp.panel.content.base_rows.find(i => i.id === key)
      return item[sk]
    },
    getExecFormValue(key, sk = 'value') {
      let item = this.comp.panel.content.exec_rows.find(i => i.id === key)
      return item[sk]
    },
    getExtyleValue(key) {
      let value = this.comp.panel.extyle[key]
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';
.yxt-func-carousel {
  width: 100%;
  height: 100%;
  .card-perfix-border {
    // border-left: 4px solid $yxt-color-primary;
    // padding-left: 8px;
  }
  .os-img-box {
    width: 100%;
    height: 100%;
    .os-img {
      object-fit: fill;
    }
  }
}
</style>
