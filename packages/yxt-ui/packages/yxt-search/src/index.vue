<!--
  "Descripttion": "块级组件响应式搜索框",
  "version": "1.00",
  "Author": "Aris",
  "Date": "20210914",
  "LastEditors": "Aris"
------------------------------------------
  @name: refresh, reset
  @params:
    dataList: [{
      label: '', 搜索名称
      slotKey: '' 搜索组件对应的key
    }],
    isFold:Boolean 是否折叠，默认初始值为true，默认折叠
-->
<template>
  <div>
    <div class="yxt-search-box">
      <to-row :gutter="24">
        <to-col
          :span="colNumber"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <div class="search-item">
            <div class="label">{{ item.label }}</div>
            <div class="content">
              <slot :name="item.slotKey"></slot>
            </div>
          </div>
        </to-col>
        <to-col :span="colNumber" :offset="endOffset">
          <div class="search-btn">
            <to-button type="primary" @click="refresh">查询</to-button>
            <to-button plain @click="reset">重置</to-button>
            <span @click="toggle" class="toggleBtn" v-if="moreVisible">
              {{ isFold ? "展开" : "收起"
              }}<i
                :class="[isFold ? 'to-icon-arrow-down' : 'to-icon-arrow-up']"
              ></i>
            </span>
          </div>
        </to-col>
      </to-row>
    </div>
  </div>
</template>

<script>
import ToRow from '../../../../element-ui/packages/row'
import ToCol from '../../../../element-ui/packages/col'
import ToButton from '../../../../element-ui/packages/button'

export default {
  name: 'YxtSearch',
  components: {
    ToRow,
    ToCol,
    ToButton
  },
  props: {
    dataList: {
      type: Array,
      default: () => [
        {
          label: '名字',
          slotKey: 'name'
        }
      ]
    },
    isFold: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableKeyList: [],
      searchList: [],
      innerWidth: 0,
      colNumber: 6
    };
  },
  computed: {
    // 响应核心逻辑计算
    endOffset() {
      const col = this.colNumber;
      const len = this.searchList.length;
      return col * ((24 / col) - 1 - (len % (24 / col)));
    },
    moreVisible() {
      return this.dataList.length >= (24 / this.colNumber);
    }
  },
  watch: {
    innerWidth(v) {
      this.fmtList();
      let col;
      if (this.dataList.length < 2) {
        if (v > 576) {
          // xs
          col = 12;
        } else {
          col = 24;
        }
      } else if (v >= 1600) {
        // xxl
        col = 6;
      } else if (v < 1600 && v >= 1200) {
        // xl
        col = 8;
      } else if (v < 1200 && v >= 576) {
        // sm md lg
        col = 12;
      } else {
        col = 24;
      }

      this.colNumber = col;
    }
  },
  created() {
    this.searchList = this.dataList;
    this.fmtList();
    // 获取当前窗口宽度
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {},
  methods: {
    handleResize(e) {
      this.innerWidth = e.currentTarget.innerWidth;
    },
    toggle() {
      this.isFold = !this.isFold;
      this.fmtList();
    },
    fmtList() {
      if (this.isFold) {
        this.searchList = this.dataList.slice(0, (24 / this.colNumber) - 1);
      } else {
        this.searchList = this.dataList;
      }
      if (this.dataList.length < 2) {
        this.colNumber = 12;
      }
    },
    refresh() {
      this.$emit('refresh');
    },
    reset() {
      this.$emit('reset');
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>
