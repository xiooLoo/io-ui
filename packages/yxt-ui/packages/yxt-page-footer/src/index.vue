<!--
 *  功能：  底部
 *  入参：
        formName:       [必传]标题
 *  用法：
  <YxtPageFooter :foot-btns="footBtns" :actions="footerAction" />
-->
<template>
  <div class="yxt-footer-btns">
    <template v-for="btn in footBtns">
      <to-button
        v-if="isBtnShowFun(btn)"
        :key="btn.value"
        :style="btnStyle(btn)"
        :class="[btnClass(btn.classType), 'btn']"
        :type="btn.type === 'text'? '': btn.type "
        :disabled="btn.disabled"
        :second="btn.isSecond"
        @click="btnActions(btn)"
      >
        {{ btn.label }}
        <span v-if="btn.text" style="color: red;">({{ btn.text }})</span>
      </to-button>
    </template>
  </div>
</template>
<script>
import ToButton from '../../../../element-ui/packages/button'

export default {
  name: 'YxtPageFooter',
  components: {
    ToButton
  },
  props: {
    // 按钮列表
    footBtns: {
      type: Array,
      default: () => [
        { label: '取消', value: 'cancel', type: 'normal', code: true, classType: 'normal', disabled: false },
        { label: '保存', value: 'save', type: 'primary', code: true, loading: false, disabled: false }
      ]
    }
  },
  computed: {
    btnStyle() {
      return function (btn) {
        let { code, isshow } = btn;
        return { display: (code || isshow) ? 'block' : 'none' }
      };
    },
    btnClass() {
      return function (classType) {
        let classStr = '';
        if (classType === 'primary') {
          classStr = 'yxt-base-button-type-primary';
        } else if (classType === 'normal') {
          classStr = 'yxt-base-button-type-normal';
        } else if (classType === 'text') {
          classStr = '';
        }
        return ['primary', 'normal', 'text'].includes(classType) ? classStr : classType;
      };
    }
  },
  methods: {
    btnActions(btnVal) {
      if (btnVal.value == 'cancel') { // 返回
        this.$router.go(-1);
      }
      this.$emit('btnActions', btnVal);
    },
    isBtnShowFun(btnObj) {
      if (btnObj.btnAuthorityFun) {
        let isShow = true;
        this.$emit('isBtnShowFun', btnObj, type => {
          isShow = type;
        });
        return isShow
      } else {
        return true;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.yxt-footer-btns {
  display: flex;
  justify-content: flex-end;
  padding-right: 18px;
  /deep/ .to-form-item__content {
    text-align:right;
  }
  .to-button {
    margin-right: 10px;
    padding: 7px 15px;
    border-radius: 2px;
    border: none;
  }
  .yxt-base-button-type-primary {
    background: #2E78FF;
    color: #FFFFFF;
  }
  .yxt-base-button-type-normal {
    background: #F1F2F4;
    color: #14203B;
  }
}
</style>
