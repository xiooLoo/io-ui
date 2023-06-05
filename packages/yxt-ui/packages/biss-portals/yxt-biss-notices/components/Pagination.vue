<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <to-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        this.scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        this.scrollTo(0, 800)
      }
    },
    /**
     * @param {number} to
     * @param {number} duration
     * @param {Function} callback
     */
    scrollTo(to, duration, callback) {
      const start = position()
      const change = to - start
      const increment = 20
      let currentTime = 0
      duration = (typeof (duration) === 'undefined') ? 500 : duration
      let animateScroll = function() {
        // increment the time
        currentTime += increment
        // find the value with the quadratic in-out easing function
        let val = Math.easeInOutQuad(currentTime, start, change, duration)
        // move the document.body
        move(val)
        // do the animation unless its over
        if (currentTime < duration) {
          requestAnimFrame(animateScroll)
        } else {
          if (callback && typeof (callback) === 'function') {
            // the animation is done so lets callback
            callback()
          }
        }
      }
      animateScroll()
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  margin: 0;
}
.pagination-container.hidden {
  display: none;
}
</style>
