<template>
  <div class="yxt-breadcrumb-box">
    <to-breadcrumb :separator="separator" class="yxt-breadcrumb">
      <transition-group name="breadcrumb">
        <template v-if="isMeta">
          <to-breadcrumb-item v-for="(item,index) in matchedBreadcrumbs" :key="item.path">
            <span v-if="item.path != '/'" :class="index == matchedBreadcrumbs.length-1? 'item-last' : 'item-normal'">{{ item.meta.title }}</span>
            <span v-else class="item-redirect" @click.prevent="handleLink(item)">{{ item.meta.title }}</span>
          </to-breadcrumb-item>
        </template>
        <template v-else>
          <to-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="{ path: item.path }" >{{ item.meta.title }}</to-breadcrumb-item>
        </template>
      </transition-group>
    </to-breadcrumb>
  </div>
</template>
<script>
import ToBreadcrumb from '../../../../element-ui/packages/breadcrumb'
import ToBreadcrumbItem from '../../../../element-ui/packages/breadcrumb-item'
import * as pathToRegexp from 'path-to-regexp';

export default {
  name: 'YxtBreadCrumb',
  components: {
    ToBreadcrumb,
    ToBreadcrumbItem
  },
  props: {
    /**
     * 是否自动匹配
     * @true  自动解析、匹配浏览器路由地址，动态生成面包屑
     * @false 由外部传入面包屑数组，数组格式参考 breadcrumbs 数组
     */
    isMeta: {
      type: Boolean,
      default: true
    },
    /**
     * 分隔符
     */
    separator: {
      type: String,
      default: '/'
    },
    /**
     * 图标分隔符 class
     */
    separatorClass: {
      type: String,
      default: ''
    },
    /**
     * 面包屑数组：来源于外部Props
     */
    breadcrumbs: {
      type: Array,
      default: () => {
        return [
          { path: '/test',
            name: 'test',
            meta: {
              title: '主页',
              hidden: false
            }
          },
          { path: '/tests',
            name: 'tests',
            meta: {
              title: '子页面',
              hidden: false
            }
          }
        ];
      }
    }
  },
  data() {
    return {
      /**
       * 面包屑数组：此组件内自动匹配
       */
      matchedBreadcrumbs: []
    };
  },
  methods: {
    handleLink(item) {
      if (item.path === this.$route.path || (item.path === '/' && this.$route.path === '/home')) {
        return;
      }
      if (item.redirect) {
        this.$router.push(item.redirect);
        return;
      }
      this.$router.push(this.pathCompile(item.path));
    },
    pathCompile(path) {
      const { params } = this.$route;
      let toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    isHome(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim() === '';
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      if (!this.isHome(matched[0])) {
        matched = [].concat(matched);
      }
      this.matchedBreadcrumbs = matched.filter(item => item.meta && item.meta.title && item.meta.hidden == false);
    }
  }
};
</script>
