<template>
  <div class="yxt-biss-todos">
    <to-card>
      <div slot="header">
        <span class="card-perfix-border">{{ comp.title }}</span>
      </div>
      <div class="todos-list">
          <div v-for="(item, index) in todos" :key="index" class="todo-list">
              <span class="todo-group-name">{{ item.bizGroupName }}</span>
              <to-row>
                <to-col v-for="(ele, idx) in item.children"  style="width:auto;margin: 8px;" :key="idx">
                  <span class="todo-link" @click="toLink(ele)">
                    <span>{{ ele.bizDesc }}</span>
                    <span class="link-em"> ({{ ele.num }})</span>
                  </span>
                </to-col>
              </to-row>
          </div>
      </div>
    </to-card>
  </div>
</template>
<script>
import ToCard from '../../../../../element-ui/packages/card'
import ToRow from '../../../../../element-ui/packages/row'
import ToCol from '../../../../../element-ui/packages/col'
import { fetchSystemList, fetchTodoList } from '@/api/index'
import requestConfig from '@yxtui/src/mixins/requestConfig'

const base = {
  id: 'YxtBissTodos',
  compName: 'YxtBissTodos',
  icon: 'icon-Sort uiicon',
  title: '待办事项',
  type: 'biss'
}

export default {
  base,
  name: 'YxtBissTodos',
  components: {
    ToCard,
    ToRow,
    ToCol
  },
  mixins: [requestConfig],
  props: {
    comp: {
      type: Object,
      default: () => {
        return base
      }
    }
  },
  data() {
    return {
      todos: []
    }
  },
  created() {
    this.toFetchSystemList()
  },
  methods: {
    toLink(ele) {
      window.open(ele.newUrl)
    },
    async toFetchSystemList() {
      const config = { ...this.requestConfig }
      await fetchSystemList(config).then(res => {
        // this.loadingEl.close()
        if (res && res.code == 0) {
          res.data.push({
            code: 'isNext',
            id: '',
            name: '房产地产统一管理',
            sort: 0,
            url: ''
          })
          const apps = res.data
          this.toFetchTodoList(apps)
        }
      })
    },
    async toFetchTodoList(apps) {
      const config = { ...this.requestConfig }
      await fetchTodoList(config).then(res => {
        // this.loadingEl.close()
        if (res && res.code == 0) {
          this.dowith(res.data, apps)
        }
      })
    },
    doWithList(list) {
      const map = new Map()
      list.forEach((item, index, arr) => {
        if (!map.has(item.bizGroup)) {
          map.set(item.bizGroup, arr.filter(a => a.bizGroup == item.bizGroup))
        }
      })
      return Array.from(map).map(item => [...item[1]])
    },
    dowith(resData, apps) {
      resData.forEach(ele => {
        let sParms = ele.url ? ele.url.indexOf('/') == 0 ? '' : '/' : ''
        ele.newUrl = `${location.origin}/${ele.bizGroup}/#${sParms}${ele.url}`
      })
      const todos = []
      const codeArr = apps.map(j => j.code)
      const todosData = this.doWithList(resData)
      todosData.forEach(item => {
        const parentData = {
          bizCode: item[0].bizCode,
          bizDesc: item[0].bizDesc,
          bizGroup: item[0].bizGroup,
          bizGroupName: item[0].bizGroupName,
          children: item
        }
        if (codeArr.includes(item[0].groupCode)) {
          todos.push(parentData)
        }
      })
      this.todos = todos
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';

.yxt-biss-todos {
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
  .todos-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    overflow-y: auto;
    .todo-group-name {
      font-weight: 600;
      font-size: 14px;
    }
  }
  .todo-link {
    cursor: pointer;
    display: block;
    line-height: 30px;
    padding: 0px 10px;
    background-color: $yxt-color-primary-8;
    border-radius: 4px;
    font-size: 12px;
    .link-em {
      color: $yxt-color-error;
    }
  }
}
</style>
