<template>
  <div>
    <to-table
      ref="BaseTableRef"
      class="yxt-table-content"
      style="width: 100%;"
      :key="tableKey"
      v-loading="isCustomLoading"
      :row-key="rowKey"
      :default-expand-all="defaultExpandAll"
      :border="tableBorder"
      :show-header="showHeader"
      :header-cell-style="headerCellStyle"
      :tree-props="treeProp"
      :element-loading-text="loadingConfig.loadingText"
      :element-loading-spinner="loadingConfig.loadingSpinner"
      :element-loading-background="loadingConfig.loadingBackground"
      @select="clickSelect"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @cell-click="handleCellClick"
      @filter-change="handleFilterChange"
      @select-all="handleSelectionAll"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template slot="empty">
        <slot name="empty-amend" >
          {{ emptyText }}
        </slot>
      </template>
      <!--
        TODO:实现表格的折叠，需要用此插槽：slot='expand'，使用方式如下：
        <div slot="expand">
          <to-table-column
            type="expand"
            width="100"
            label="hh"
            align="left"
            :fixed="false"
          >
            <span>展开内容区...</span>
          </to-table-column>
        </div>
      -->
      <slot name="expand"/>
      <template v-for="item in zeroTypes">
        <template v-if="item.type === 'radio'">
          <to-table-column
            :key="item.type"
            :width="item.width"
            :label="item.label"
            :align="item.align"
            :fixed="item.fixed"
          >
            <template slot-scope="scope">
              <to-radio-group v-model="selectRadioVal">
                <to-radio
                  :label="scope.row.id"
                  @click.native.stop="(val) => currentRadioChange(val, scope.row)"
                >{{''}}</to-radio>
              </to-radio-group>
            </template>
          </to-table-column>
        </template>
        <template v-else>
          <to-table-column
            :key="item.type"
            :type="item.type"
            :width="item.width"
            :label="item.label"
            :align="item.align"
            :fixed="item.fixed"
            :selectable="selectable"
          />
        </template>
      </template>
      <template v-if="isCustomTableColumns">
        <slot></slot>
      </template>
      <template v-else>
        <template v-for="item in tableColumns">
          <to-table-column
            v-if="item.filters&&!item.isscope"
            :key="item.key"
            :prop="item.key"
            :label="item.title"
            :width="item.width"
            :align="item.align"
            :fixed="item.fixed"
            :formatter="item.formatter"
            :column-key="item.columnKey"
            :filters="item.filters?item.filters: []"
            :filter-multiple="item.filtermultiple"
            :filter-method="filterTag"
            :min-width="item.minWidth"
            :sortable="item.sortable"
            :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
            :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
            :show-overflow-tooltip="item.tooltip"
            :filter-placement="item.filterPlacement"
          >
          </to-table-column>
          <to-table-column
            v-else-if="item.filters&&item.isscope"
            :key="item.key"
            :prop="item.key"
            :label="item.title"
            :width="item.width"
            :align="item.align"
            :fixed="item.fixed"
            :formatter="item.formatter"
            :column-key="item.columnKey"
            :filters="item.filters?item.filters: []"
            :filter-multiple="item.filtermultiple"
            :filter-method="filterTag"
            :min-width="item.minWidth"
            :sortable="item.sortable"
            :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
            :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
            :show-overflow-tooltip="item.tooltip"
            :filter-placement="item.filterPlacement"
          >
            <slot
              slot-scope="scope"
              name="isscope"
              :row="scope.row"
              :rowKey="item.key"
              :item="item"
              :index="scope.$index"
            />
          </to-table-column>
          <to-table-column
            v-else-if="item.isscope"
            :key="item.key"
            :prop="item.key"
            :label="item.title"
            :width="item.width"
            :align="item.align"
            :fixed="item.fixed"
            :column-key="item.columnKey"
            :min-width="item.minWidth"
            :sortable="item.sortable"
            :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
            :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
            :formatter="item.formatter"
            :show-overflow-tooltip="item.tooltip"
            :filter-placement="item.filterPlacement"
          >
            <slot
              slot-scope="scope"
              :index="scope.$index"
              :row="scope.row"
              name="isscope"
              :rowKey="item.key"
              :item="item"
            />
          </to-table-column>
          <!-- 添加自定义表头 -->
          <to-table-column
            v-else-if="item.isscopeHeader"
            :temp="item.temp"
            :key="item.key"
            :prop="item.key"
            :label="item.title"
            :width="item.width"
            :align="item.align"
            :fixed="item.fixed"
            :column-key="item.columnKey"
            :min-width="item.minWidth"
            :sortable="item.sortable"
            :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
            :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
            :formatter="item.formatter"
            :show-overflow-tooltip="item.tooltip"
            :filter-placement="item.filterPlacement"
            :render-header="(createElement, column)  => renderHeader(createElement, column, item.temp)"
          ></to-table-column>
          <to-table-column
          v-else-if="item.customTableColHead"
          :pops="item.key"
          :key="item.key"
          >
          <template slot="header" >
            <slot name="customTableColHead"></slot>
          </template>
          <template v-if="item.autoScope"  slot-scope="scope">
            <slot
              :index="scope.$index"
              :row="scope.row"
              name="isscope"
              :rowKey="item.key"
              :item="item"
            />
          </template>
          <template v-else slot-scope="scope">
          {{scope.row[item.key]}}
          </template>
          </to-table-column>
          <to-table-column
            v-else
            :key="item.key"
            :prop="item.key"
            :label="item.title"
            :width="item.width"
            :align="item.align"
            :fixed="item.fixed"
            :column-key="item.columnKey"
            :min-width="item.minWidth"
            :sortable="item.sortable"
            :sort-method="(item.sortable && sortway === 'method') ? sortMethod : null"
            :sort-by="(item.sortable && sortway === 'by') ? sortBy : null"
            :formatter="item.formatter"
            :show-overflow-tooltip="item.tooltip"
            :filter-placement="item.filterPlacement"
          />
        </template>
        <to-table-column
          v-if="showAction"
          :label="actionQuery.label"
          :width="isCustomBtns ? customBtnsWidth : rowbtns.length <= 3 ? '180px' : rowbtns.length * 60 + 'px'"
          :min-width="actionQuery.minWidth"
          :align="actionQuery.align"
          :fixed="actionQuery.fixed"
        >
          <div slot-scope="scope" class="yxt-actions-btns-box">
            <template v-for="btn in rowbtns">
              <template v-if="btn.isIcon">
                <to-tooltip
                  v-show="btn.code"
                  :key="btn.value"
                  :effect="tooltipConfig.effect"
                  :content="btn.label"
                  :placement="tooltipConfig.placement"
                >
                  <span class="table-action-icon" :class="[btn.icon]" @click="handleAction(btn, scope.row, scope.$index)" />
                </to-tooltip>
              </template>
              <template v-else>
                <to-button
                  v-show="btn.code"
                  :key="btn.value"
                  :type="btn.type"
                  :plain="btn.plain"
                  :second="btn.second"
                  :dashed="btn.dashed"
                  :round="btn.round"
                  :circle="btn.circle"
                  :size="btn.size || 'small'"
                  :disabled="btn.disabled"
                  @click="handleAction(btn, scope.row, scope.$index)"
                >
                  {{ btn.label }}
                </to-button>
              </template>
            </template>
            <slot :row="scope.row" :index="scope.$index" />
          </div>
        </to-table-column>
      </template>

    </to-table>
  </div>
</template>
<script>
import ToTable from '../../../../element-ui/packages/table'
import ToTableColumn from '../../../../element-ui/packages/table-column'
import ToTooltip from '../../../../element-ui/packages/tooltip'
import ToButton from '../../../../element-ui/packages/button'
import ToRadioGroup from '../../../../element-ui/packages/radio-group'
import ToRadio from '../../../../element-ui/packages/radio'

export default {
  name: 'YxtTable',
  components: {
    ToTable,
    ToTableColumn,
    ToTooltip,
    ToButton,
    ToRadioGroup,
    ToRadio
  },
  props: {
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    headerCellStyle: {
      type: Object,
      default: () => {
        return {
          background: '#fafafa',
          color: '#606266'
        };
      }
    },
    /**
     * 是否带有纵向边框
     */
    tableBorder: {
      type: Boolean,
      default: true
    },
    /**
     * 默认选中数组
     */
    defaultSelect: {
      type: Array,
      default: () => []
    },
    /*
    * 选择方式 多选or单选
    */
    selectIsType: { // selection or radio
      type: String,
      default: 'selection'
    },
    /*
    * 取差集 key
    */
    differenceSetKey: { // selection or radio
      type: String,
      default: ''
    },
    /*
    * radio 绑定的key名
    * eg: name  scope.row[radioKey] === scope.row.name
    */
    radioKey: {
      type: [Number, String],
      default: undefined
    },
    /**
     * 空数据时显示的文本内容，也可以通过 slot="empty" 设置
     */
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    tableColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * table第一列设置
     *
     * index      下标
       selection  选择框
     */
    zeroTypes: {
      type: Array,
      default: () => {
        return [
          /* { label: '多选', type: 'selection', width: '50', align: 'center', fixed: 'left' },
          { label: '序号', type: 'index', width: '50', align: 'center', fixed: 'left' },*/
        ];
      }
    },
    /**
     * 排序方式设置
     * by:      指定数据按照哪个属性进行排序
     * method:  自定义函数排序
     */
    sortway: {
      type: String,
      default: 'by'
    },
    /**
     * table是否显示操作列？？？
     */
    showAction: {
      type: Boolean,
      default: false
    },
    /**
     * table操作列按钮数组
     */
    rowbtns: {
      type: Array,
      default: () => [
        /* { label: '新增', value:'add', type: 'normal' },
          { label: '删除', value:'del', type: 'primary', disabled: false },
          { label: '编辑', value:'edit', isIcon: true, icon: 'to-icon-warning' }*/
      ]
    },
    isCustomBtns: {
      type: Boolean,
      default: false
    },
    customBtnsWidth: {
      type: String,
      default: '180px'
    },
    /**
     * table操作列默认配置，可在外部自定义
     */
    actionQuery: {
      type: Object,
      default: function() {
        return {
          label: '操作',
          width: '200',
          minWidth: '120',
          align: 'left',
          fixed: 'right'
        };
      }
    },
    /**
     * 操作列为icon时，显示tooltip浮动提示
     */
    tooltipConfig: {
      type: Object,
      default: function() {
        return {
          effect: 'dark',
          placement: 'top-start'
        };
      }
    },
    /**
     * 所有@click 事件，通过key区分事件具体类型
     */
    actions: {
      type: Function,
      default: () => ({})
    },
    loadingConfig: {
      type: Object,
      default: function() {
        return {
          loadingText: '加载中...',
          loadingSpinner: 'to-icon-loading',
          loadingBackground: 'rgba(0, 0, 0, 0.2)'
        };
      }
    },
    /**
     * 是否需要设置禁选，配合actions使用
     */
    isSelectable: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    lazyHandle: {
      type: Boolean,
      default: false
    },
    treeProp: {
      type: Object,
      default: () => {
        return { children: 'children', hasChildren: 'hasChild' }
      }
    },
    isCustomTableColumns: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectRadioVal: null,
      tableKey: 'tableKey'
    }
  },
  created() {
    setTimeout(() => {
      this.isCustomLoading = false;
    }, 100000);
    if (this.defaultSelect && this.defaultSelect.length > 0) {
      this.defaultSelectFun();
    }
    /* this.$nextTick(() => {
      this.$refs.BaseTableRef.doLayout()
    }) */
  },

  watch: {
    defaultSelect: {
      handler(newV) {
        if (newV && newV.length > 0) {
          this.defaultSelectFun()
        }
      },
      immediate: true
    },
    // 解决 表头show-hander显示隐藏 表头显示不全问题
    showHeader(newV) {
      if (newV) {
        this.tableKey += 'e'
      }
    }
  },
  computed: {
    isCustomLoading: {
      get() {
        return this.isLoading;
      },
      set() {
        return !this.isLoading;
      }
    }
  },
  methods: {
    renderHeader(createElement, { column }, temp) {
      // console.log(column, temp, 'column')
      return createElement(
        'div',
        {
          style: 'display:flex;margin:auto;'
        },
        [
          createElement('span', column.label),
          createElement(temp.name, {
            props: {
              name: temp.name,
              msg: temp.msg,
              tipsIcon: temp.tipsIcon
            }
          })
        ]
      )
    },
    defaultSelectFun() {
      if (this.selectIsType === 'radio') {
        // 单选回显
        this.selectRadioVal = this.defaultSelect[0][this.radioKey]
      } else if (this.selectIsType === 'selection') {
        // 多选回显
        if (this.differenceSetKey) {
          let tableData = this.$attrs.data || this.$attrs.bind.data;
          const noSelectList = this.defaultSelect.filter(v => {
            return tableData.every(e => e[this.differenceSetKey] != v[this.differenceSetKey]);
          });
          if (noSelectList.length) {
            noSelectList.forEach(ele => {
              this.toggleSelection(ele, false)
            })
          }
        }
        this.defaultSelect.forEach(ele => {
          this.toggleSelection(ele, true)
        })
      }
    },
    // 处理禁选
    selectable(row) {
      if (this.isSelectable) {
        let query = {
          key: 'selectable',
          obj: { row }
        };
        return this.actions(query);
      } else {
        return true;
      }
    },
    handleSelectionAll(selectItems) {
      let query = {
        key: 'handleSelectionAll',
        arr: selectItems,
        oneSeclect: this.oneSeclect
      };
      this.actions(query);
    },
    // 表格的筛选条件发生变化的时候会触发该事件
    handleFilterChange(val) {
      let query = {
        key: 'filterChange',
        obj: {
          columnKey: Object.keys(val)[0],
          codes: val[Object.keys(val)[0]]
        }
      };
      this.actions(query);
    },
    // 单选事件
    currentRadioChange(label, rowData) {
      const query = {
        key: 'handleSelectRadio',
        arr: rowData
      }
      this.actions(query)
    },
    filterTag(value, row, column) {
      // return true;
      if (this.lazyHandle) {
        return true
      }
      const property = column['property'];
      return row[property] === value;
    },
    sortChange(column) {
      let query = {
        key: 'sortChange',
        obj: column
      };
      this.actions(query);
    },
    // 某个单元格被点击
    handleCellClick(row, column) {
      let property = column.property;
      let query = {
        key: 'cellClick',
        obj: { row, property }
      };
      return this.actions(query);
    },
    sortMethod(val1, val2) {
      let query = {
        key: 'sortMethod',
        obj: { val1, val2 }
      };
      return this.actions(query);
    },
    sortBy() {
      if (this.lazyHandle) {
        return true
      }
      let query = {
        key: 'sortBy',
        obj: {}
      };
      return this.actions(query);
    },
    handleAction(btn, row, rowIndex) {
      let query = {
        key: 'handleAction',
        obj: {
          btn,
          row,
          rowIndex
        }
      };
      this.actions(query);
    },
    handleSizeChange(size) {
      let query = {
        key: 'handleSizeChange',
        size
      };
      this.actions(query);
    },
    handlePageChange(page) {
      let query = {
        key: 'handlePageChange',
        page
      };
      this.actions(query);
    },
    /**
     * 分页
     */
    pagination(obj) {
      this.$emit('pagination', obj)
    },
    handleSelectionChange(selectItems) {
      let query = {
        key: 'handleSelectionChange',
        arr: selectItems,
        oneSeclect: this.oneSeclect
      };
      this.actions(query);
    },
    oneSeclect(row) {
      this.clearSelection();
      this.toggleSelection(row, true);
    },
    toggleSelection(rows, boolean) {
      this.$nextTick(() => {
        this.$refs.BaseTableRef.toggleRowSelection(rows, boolean);
      });
    },
    clearSelection() {
      this.$refs.BaseTableRef.clearSelection();
    },
    clickSelect(selection, row) {
      let query = {
        key: 'clickSelect',
        row,
        selection
      };
      this.actions(query);
    },
    // 取消排序
    toggleSortthiscolumn() {
      this.$refs.BaseTableRef.clearSort();
    },
    // 清除表头过滤
    toggleclearFilter() {
      this.$refs.BaseTableRef.clearFilter();
    },
    clearFilterAndSort() {
      this.$refs.BaseTableRef.clearSort();
      this.$refs.BaseTableRef.clearFilter();
    },
    /**
     * 自定义是否主动关闭Loading
     * @time: 延时时间长度
     * @isTimeout 是否开启延时关闭Loading， true:开启， false:关闭
     */
    isloadingTime(time = 2000, isTimeout) {
      let _this = this;
      if (isTimeout) {
        setTimeout(() => {
          _this.isCustomLoading = !_this.isCustomLoading;
        }, time);
      } else {
        _this.isCustomLoading = !_this.isCustomLoading;
      }
    },
    isBtnShowFun(row, btnObj) {
      if (btnObj.btnAuthorityFun) {
        let isShow = true;
        this.$emit('isBtnShowFun', row, btnObj, type => {
          isShow = type;
        });
        return isShow;
      } else {
        return true;
      }
    }
  }
};
</script>
