<template>
  <div class="border" style="overflow:auto;height:545px">
    <div class="yxt-up-tree-tip" />
    <to-tree
      ref="tree"
      :key="state.key"
      :data="menuTreeDataPropsTemp"
      node-key="id"
      :render-content="renderContent"
      :expand-on-click-node="false"
      :default-expanded-keys="state.defaultExpand"
      @node-click="getnodeinfo"
    />
  </div>
</template>
<script>
import ToTree from '../../../../element-ui/packages/tree'

export default {
  name: 'YxtTree',
  components: {
    ToTree
  },
  props: {
    menuTreeDataProps: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Function,
      default: () => function() {}
    }
  },
  data() {
    return {
      menuTreeDataPropsTemp: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1'
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1'
            },
            {
              id: 6,
              label: 'Level two 2-2'
            }
          ]
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1'
            },
            {
              id: 8,
              label: 'Level two 3-2'
            }
          ]
        }
      ],
      state: {
        key: 0,
        defaultExpand: [''],
        menuTreeData: this.menuTreeDataProps
        // defaultProps: {
        //   children: 'children',
        //   label: 'label'
        // }
      },
      pid: 1000
    }
  },
  methods: {
    nodeUp(e, node, data) {
      e.stopPropagation()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const cIndex = children.findIndex(d => d.id === data.id)
      if (cIndex > 0) {
        // let targetid = children[cIndex - 1].id
      } else {
        ToMessage.warning('已置顶，无法上移！')
        return
      }
      //   showLoading('border')
      this.actions('nodeUp', children[cIndex - 1].id, res => {
        if (res.isSuccess) {
          if ((parent.level == 0 && cIndex !== 0) || (parent.level !== 0 && cIndex !== 0)) {
            const tempChildrenNodex1 = children[cIndex - 1]
            const tempChildrenNodex2 = children[cIndex]
            children[cIndex - 1] = tempChildrenNodex2
            children[cIndex] = tempChildrenNodex1
            this.state.defaultExpand[0] = data.id
          }
          this.state.key++
        }
        // hideLoading()
      })
    },
    // 节点下移
    nodeDown(e, store, node, data) {
      e.stopPropagation()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const cIndex = children.findIndex(d => d.id === data.id)
      const cLength = children.length - 1;
      const allLevel = store.data.length - 1;
      if (cIndex < cLength) {
        // let targetid = children[cIndex + 1].id
      } else {
        ToMessage.warning('已置底，无法下移！')
        return
      }
      this.actions('nodeDown', children[cIndex + 1].id, res => {
        if (res.isSuccess) {
          if ((parent.level === allLevel && cIndex !== cLength) || (parent.level !== allLevel && cIndex !== cLength)) {
            const tempChildrenNodex1 = children[cIndex + 1]
            const tempChildrenNodex2 = children[cIndex];
            children[cIndex + 1] = tempChildrenNodex2
            children[cIndex] = tempChildrenNodex1
            this.state.defaultExpand[0] = data.id
          }
          this.state.key++
        }
        // hideLoading()
      })
    },
    //
    append(e, node, data) {
      e.stopPropagation()
      const parentId = node.parent.data.id
      this.actions('append', {id: data.id, resourceName: data.resourceName, parentId, appendObj: {e, node, data}})
    },
    appendEdit(e, node, data) {
      e.stopPropagation()
      const parentId = node.parent.data.id
      this.actions('appendEdit', {id: data.id, resourceName: data.resourceName, parentId, appendObj: {e, node, data}})
    },
    refreshAppend(isSuccess, appendObj) {
      if (isSuccess) {
        /**
         * 前端实现新增
        const { e, node, data } = appendObj
        const parentId = node.parent.data.id
        const newChild = { id: id++, resourceName: 'testtest', children: [] }
        if (!data.children) {
            data.children = []
        }
        data.children.push(newChild)*/
        this.state.defaultExpand[0] = appendObj.data.id
        ToMessage.success('新增成功!')
      } else {
        ToMessage.error('新增失败!')
      }
    },
    remove(e, node, data) {
      e.stopPropagation()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      if (Object.prototype.hasOwnProperty.call(data, 'children') && data.children && data.children.length > 0) {
        ToMessage.warning('存在子节点无法删除!')
        return
      }
      props.actions('remove', children[index].id, isSuccess => {
        if (isSuccess) {
          children.splice(index, 1)
          // state.menuTreeData = [...state.menuTreeData]
          ToMessage.success({ message: '删除成功!' });
        } else {
          ToMessage.error({ message: '删除失败!' });
        }
      })
    },
    // json key 转小写
    lowerKey(jsonObj) {
      for (let key in jsonObj) {
        jsonObj[key.toLowerCase()] = jsonObj[key];
        delete (jsonObj[key]);
      }
      return jsonObj;
    },
    // 向父组件传递节点数据
    getnodeinfo() {
    //   console.log('getnodeinfo:', data)
    // QueryPost("menuManage/queryByMenuId", "传参").then(res => {
    //     var data = lowerKey(res.body.data.data)
    //     this.$emit('listenToChildEvent',data)
    // })
    },
    renderContent(h, { node, data, store }) {
      const routeTreeCodes = ['add', 'up', 'down', 'delete']
      return h(
        'span', {
          class: 'custom-tree-node'
        },
        h('span', {
          class: 'custom-tree-node-label',
          style: 'padding-right:15px;'
        }, node.label),
        h(
          'span', {
            class: 'custom-tree-node-btns',
            style: '15px;color:#2E78FF;'
          }, h('a', { style: `padding-right:15px;display:${routeTreeCodes.includes('add') ? 'block' : 'none'}`, onClick: e => append(e, node, data) }, '新增'),
          h('a', { style: `padding-right:15px;display:${routeTreeCodes.includes('edit') ? 'block' : 'none'}`, onClick: e => appendEdit(e, node, data) }, '编辑'),
          h('a', { style: `padding-right:15px;display:${routeTreeCodes.includes('up') ? 'block' : 'none'}`, onClick: e => nodeUp(e, node, data) }, '上移'),
          h('a', { style: `padding-right:15px;display:${routeTreeCodes.includes('down') ? 'block' : 'none'}`, onClick: e => nodeDown(e, store, node, data) }, '下移'),
          h('a', { style: `padding-right:15px;display:${routeTreeCodes.includes('delete') ? 'block' : 'none'}`, onClick: e => remove(e, node, data) }, '删除'),
        )
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    &-btns {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
}
.yxt-up-tree-tip {
    padding-bottom: 12px;
}
</style>
