<!--
  // 使用栗子
  <YxtBissBaseTable
      :data="[ {businessId:2}, {}]"
      :table-columns="[{
        title: '申请单号',
        key: 'businessId',
        minWidth: '180',
        fixed: 'left',
        isscope: true
      }]"
      :zero-types="[{ label: '多选', type: 'selection', width: '50', align: 'center', fixed: 'left' }]"
      :pagerCount="7"
      :is-loading="false"
      :table-border="false"
      show-action
      :rowbtns="[{ label: '撤回', value: 'revocation', type: 'text', code: 'btn_dispose_recall' }]"
      :paginationConfig="{
        currentPage: 1,
        currentSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        total: 0,
        layout: 'prev, pager, next, sizes'
      }"
      :actions="actions"
      @selection-change="handleSelectionChange"
      >
      <span>
         <to-button
          type="text"
          size="small"
          class="changeAccount-box"
          @click="stop"
        >
          停用
        </to-button>
      </span>
      <span slot="isscope" slot-scope="item">
        999{{item}}
      </span>
    </YxtBissBaseTable>
-->
<template>
  <div  :class="[cardStyle? 'card-style':'']">
    <div v-if="tableHeadTitle" class="table-head-wrapper">
      <div class="table-title">{{tableHeadTitle}}</div>
      <div class="table-head-suffix" v-if="isShowSuffix">
        <to-button @click="headBtnClik(btn)" :type="btn.type" v-for="(btn, index) in headBtnList" :key="index">{{btn.label}}</to-button>
        <span class="img-box" @click="handleRefreshClick">
          <img src="../../../../../assets/images/fresh.png">
        </span>
        <span class="img-box" @click="handleSearchClick">
          <img src="../../../../../assets/images/hidden-search.png">
        </span>
        <span class="img-box" @click="handleSettingClick">
          <img src="../../../../../assets/images/form-setting.png">
        </span>
      </div>
    </div>
    <div :class="[cardStyle? 'table-padding':'']">
      <YxtTable
        class="my-table"
        v-bind="$attrs"
        v-on="$listeners"
        :actions="handleTableActions"
      >
      <template v-for="(name, index) in slotNames" v-slot:[name]="item">
        <div :key="index">
          <slot :name="name" :data="item"></slot>
        </div>
      </template>
    </YxtTable>
    <div class="table-pagination-box table-pagination-view" >
      <div class="onlyOnePagination" v-if="onlyDiyPagination">
        第 {{ (paginationConfig.currentPage - 1) * paginationConfig.currentSize + 1 }} - {{ paginationConfig.currentPage * paginationConfig.currentSize }}条 /
        {{ paginationConfig.total }} 条</div>
      <YxtPagination
        v-bind="$attrs"
        v-on="$listeners"
        :total="paginationConfig.total"
        :page.sync="paginationConfig.currentPage"
        :limit.sync="paginationConfig.currentSize"
        :page-sizes="paginationConfig.pageSizes"
        :layout="paginationConfig.layout"
        @pagination="handlePagination"
      />
    </div>
    </div>
  </div>
</template>
<script>
import ToButton from '../../../../../element-ui/packages/button'
import YxtTable from '../../../yxt-table'
import YxtPagination from '../../../yxt-pagination'

export default {
  name: 'YxtBissBaseTable',
  components: {
    ToButton,
    YxtTable,
    YxtPagination
  },
  props: {
    /**
     * cardStyle是否使用带有卡片样式
     */
    cardStyle: {
      type: Boolean,
      default: true
    },
    /**
     * 表格头部右侧按钮
     */
    headBtnList: {
      type: Array
    },
    /**
     * 是否显示表格头部右侧icon按钮
     */
    isShowSuffix: {
      type: Boolean,
      default: true
    },
    /**
     * 表格标题
     */
    tableHeadTitle: {
      type: String
    },
    /**
     * 分页组件配置内容，可在外部自定义
     */
    paginationConfig: {
      type: Object,
      default: function() {
        return {
          currentPage: 1, // 当前页
          currentSize: 10, // 共多少页
          pageSizes: [10, 20, 30, 40, 50],
          total: 0, // 总条数
          layout: 'total, sizes, prev, pager, next, jumper'
        };
      }
    },
    actions: {
      type: Function,
      default: () => ({})
    },
    /**
     *  特殊样式分页器处理
     * 【非必传】
     */
    onlyDiyPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slotNames: ['empty-amend', 'expand', 'isscope', 'default', 'customTableColHead']
    }
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    handlePagination(data) {
      let query = {
        key: 'handlePagination',
        data
      };
      this.actions(query);
    },
    handleTableActions(data) {
      this.actions(data);
    },
    headBtnClik(data) {
      this.actions(data)
    },
    handleRefreshClick() {
      this.actions('search')
    },
    handleSearchClick() {
      this.actions('search')
    },
    handleSettingClick() {
      this.actions('setting')
    }
  }
}
</script>
<style lang="scss" scoped>
.table-padding {
  padding: 24px ;
}
.card-style{
  background: #fff;
  .table-head-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
     border-bottom: 1px solid #EDEEF0;
    .table-title {
      font-size: 16px;
      font-weight:500 ;
    }
    .table-head-suffix {
      display: flex;
      align-items: center;
      .img-box {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        img{
          width: 100%;
          height: 100%;
        }
        &:nth-of-type(1){
          margin-left: 16px;
        }
        &:nth-of-type(2){
          margin-left: 16px;
        }
        &:nth-of-type(3){
          margin-left: 16px;
        }
      }
    }
  }
  .table-pagination-box {
    display: flex;
    width: 100%;
    text-align: right;
    justify-content: space-between;
    justify-content: right;
    align-items: center;
    margin-top: 22px;

    .onlyOnePagination {
      font-size: 14px;
      color: #586073;
      margin-right: 12px;
    }
    /deep/ .to-pagination {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0;
      margin-top: 0;
    }
  }
}
.table-pagination-view {
  justify-content: right;
}
</style>
