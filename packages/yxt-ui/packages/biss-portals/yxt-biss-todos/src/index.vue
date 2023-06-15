<template>
  <div class="yxt-biss-todos" @click.stop="toClick">
    <to-card class="todos-card">
      <div slot="header" class="title-flex">
        <yxt-svg-icon :icon="getExtyleValue('iconClazz').current" style="width:20px;height:20px;margin: 0 6px 0 10px"></yxt-svg-icon>
        <span>{{ comp.panel.content.base_rows[0].value }}</span>
      </div>
      <div class="todos-list">
          <div v-for="(item, index) in todos" :key="index" class="todo-list">
            <div class="todo-list-header" :style="{ backgroundImage: `url(${require('../pngs/'+item[0].bgName+'.png')})`,backgroundSize: `${ item[0].bizGroupName.length * 32 }px 28px` }">
              <yxt-svg-icon :icon="item[0].bgIconName" style="color:red;width:20px;height:20px;margin: 0 6px 0 10px"></yxt-svg-icon>
              <span class="todo-group-name">{{ item[0].bizGroupName }}</span>
            </div>
            <to-row class="category-content">
                <div v-for="(ele, idx) in item" :key="idx" class="todo-link" @click="toLink(ele)">
                <to-badge :value="ele.num" :hidden="ele.num==0" class="item">
                  <yxt-svg-icon :icon="ele.categoryIconName" style="width:36px;height:36px;"></yxt-svg-icon>
                </to-badge>
                  <span class="link-name">{{ ele.bizDesc }}</span>
                </div>
            </to-row>
          </div>
      </div>
    </to-card>
  </div>
</template>
<script>
import ToCard from '../../../../../element-ui/packages/card'
import ToRow from '../../../../../element-ui/packages/row'
import { fetchTodoList } from '@/api/index'
import requestConfig from '@yxtui/src/mixins/requestConfig'
import { TODOS_BASE, matchBgName, matchBgIconName, matchCategoryIconName } from './config.js'

export default {
  base: TODOS_BASE,
  name: 'YxtBissTodos',
  components: {
    ToCard,
    ToRow
  },
  mixins: [requestConfig],
  props: {
    comp: {
      type: Object,
      default: () => {
        return TODOS_BASE
      }
    },
    actions: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      todos: []
    }
  },
  created() {
    this.toFetchTodoList()
  },
  methods: {
    toClick() {
      this.actions({
        key: 'toClick',
        obj: this.comp
      })
    },
    toLink(ele) {
      window.open(ele.newUrl)
    },

    async toFetchTodoList() {
      const config = { ...this.requestConfig }
      await fetchTodoList(config).then(res => {
        if (res && res.code == 0) {
          const resData = res.data
          const map = new Map()
          resData.forEach((ele, idx, arr) => {
            let sParms = ele.url ? (ele.url.indexOf('/') == 0 ? '' : '/') : ''
            ele.newUrl = `${location.origin}/${ele.bizGroup}/#${sParms}${ele.url}`
            ele.bgName = matchBgName(ele.bizGroup)
            ele.bgIconName = matchBgIconName(ele.bizGroup)
            ele.categoryIconName = matchCategoryIconName(ele.bizCode)
            if (!map.has(ele.bizGroup)) {
              map.set(ele.bizGroup, arr.filter(a => a.bizGroup == ele.bizGroup))
            }
          })
          const todosData = Array.from(map).map(item => [...item[1]])
          this.todos = todosData
        }
      })
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

.yxt-biss-todos {
  height: 100%;
  box-shadow: 0px 0px 20px 0px rgba(20,32,59,0.06);
  .title-flex {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 24px;
  }
  .todos-card {
    background-color: rgba(255,255,255,0.6);
  }
  .todo-list {
    background-color: $yxt-color-white;
    width: 100%;
    margin-bottom: 22px;
    border-radius: 8px;
    padding: 8px 0;
    .todo-list-header {
      width: 100%;
      height: 28px;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: -8px 0;
    }
    .category-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      overflow-x: auto;
      padding: 20px 0 16px;
    }
  }
  /deep/ .to-card {
    height: 100%;
    border: none;
    .to-card__body {
      height: calc(100% - 48px);
    }
  }
  .todos-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: inherit;
    overflow-y: auto;
    .todo-group-name {
      font-weight: 500;
      font-size: 14px;
      color: $yxt-color-white;
    }
  }
  .todo-link {
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 80px;
    padding: 8px 12px 0 8px;
    .link-em {
      color: $yxt-color-error;
    }
    .link-name {
      font-size: 14px;
      color: #2B364E;
      padding-top: 8px;
    }
  }
}
</style>
