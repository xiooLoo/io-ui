<template>
  <div class="ops-login">
    <div class="ops-login-left">
      <div class="logo-block">
        <img src="https://pic.imgdb.cn/item/64895c641ddac507cce6bbdd.png" alt="登录logo" />
      </div>
      <div class="tip-block">
        <p>门户网站
        </p>
        <p>基于易睿智慧政务平台，<br>以中台思想进行门户网站搭建。</p>
      </div>
    </div>
    <div class="ops-login-right">
      <to-row :gutters="24" class="login-header">
        <div class="logo">
          <img src="https://pic.imgdb.cn/item/64895c641ddac507cce6bddb.png" alt="易迅通">
        </div>
      </to-row>
      <div class="login-form">
        <div class="form-box">
          <p>欢迎使用门户网站</p>
          <to-card class="form-box-card">
            <div class="form-tip">
              <p>账号登录</p>
            </div>
            <div>
              <YxtForm
                ref="yxtFormRef"
                :form-items="queryFormItems"
                :form-key="queryForm"
                :isShowBtns="false"
                :isAutoFix="false"
                :row-span="1"
                label-width="0px"
                :hide-required-asterisk="true"
                @getFormValues="toLoginNext"
              />
              <div class="login-drag-box">
                <login-validator ref="loginValidatorRef" :key="loginValidateKey" />
              </div>
              <div class="login-forg-pwd">
                <span>忘记密码？</span>
              </div>
              <div class="login-btn">
                <to-button type="primary" size="medium" @click="toLogin(queryForm)" :loading="isLoading">登录</to-button>
              </div>
            </div>
          </to-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin_common from '../mixin/mixin_common'

export default {
  name: 'LoginPageA',
  mixins: [mixin_common]
}
</script>
<style lang="scss" scoped>
@import '../../../../../assets/scss/yxt-variable.scss';
$yxt-color-white-1: $yxt-color-white;
$yxt-color-border-1: $yxt-color-grey-15;
$yxt-color-text-1: #2B364E;

.ops-login {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-image: url('https://pic.imgdb.cn/item/64895c641ddac507cce6bd1c.png');
  background-size: 100% 100%;
  &-left {
    background-image: url('https://pic.imgdb.cn/item/64895c641ddac507cce6bb0e.png');
    background-size: 100% 100%;
    height: 100%;
    max-width: 500px;
    min-width: 200px;
    .logo-block {
      height: calc(85% - 96px - 48px);
      padding: 88px 0 12px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .tip-block {
      height: 15%;
      color: $yxt-color-white-1;
      padding: 24px 48px;
      & > p:nth-child(1) {
        font-weight: 500;
        font-size: 30px;
        padding-bottom: 16px;
      }
      & > p:nth-child(2) {
        font-weight: 400;
        font-size: 16px;
        line-height: 34px;
      }
    }
  }
  &-right {
    flex: 2;
    height: 100%;
    .login-header {
      height: 115px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      & > .logo {
        width: 300px;
        height: 100%;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .login-form {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 115px);
      .form-box {
        ::v-deep .to-col-24 {
          padding: 0 !important;
        }
        width: 370px;
        height: 467px;
        .form-box-card {
          padding: 0px 12px 58px;
        }
        .form-tip {
          font-weight: 500;
          font-size: 18px;
          color: $yxt-color-text-1;
          padding: 12px 0;
          border-bottom: 2px solid $yxt-color-border-1;
          width: 72px;
        }
        & > p {
          font-weight: 600;
          font-size: 26px;
          color: $yxt-color-text-1;
          text-align: center;
          padding-bottom: 46px;
        }
        .login-drag-box {
          border: .5px dashed $yxt-color-border-1;
          position: relative;
          top: -16px;
        }
        .login-forg-pwd {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: flex-start;
          position: relative;
          top: 0;
          font-size: 12px;
        }
        .login-btn {
          position: relative;
          top: 16px;
          width: 100%;
          margin: 0 auto;
          & > .to-button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
