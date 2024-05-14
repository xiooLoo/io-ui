<template>
  <div class="ops-login">
    <div class="ops-login-header">
      <div class="header-left">
        <div class="logo-box">
          <img src="https://pic.imgdb.cn/item/643e33620d2dde577757401d.png" alt="Logo">
        </div>
        <span class="logo-title">海南机关后勤事务管理平台</span>
      </div>
      <div class="header-right">
        <span class="right-item" v-for="i in rightItems" :key="i.id">{{ i.name }}</span>
      </div>
    </div>

    <div class="ops-login-mid">
      <div class="mid-left">
        <div class="mid-left-up">
          <span class="up-title">海南机关后勤事务管理平台</span>
          <span class="sub-title">轻松应对机关事务和后勤服务的管理需求，实现高效协同，提升绩效水平</span>
        </div>
      </div>
      <div class="mid-right">
        <div class="login-form">
          <div class="form-box">
            <to-card class="form-box-card">
              <p class="form-title">欢迎登录</p>
              <div class="form-tip">
                <yxt-tabs class="workbench-mng-tab" :arr="formTabs" :current="currentTab" :actions="handleTabsActions" />
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
                <to-divider class="oths-divider"><span class="sp-line">其它登录方式</span></to-divider>
                <div class="login-oths">
                  <yxt-image-view class="common-wechat" src="https://pic.imgdb.cn/item/648a70971ddac507cc914ad9.png" fit="fill" @click="toWechat" />
                </div>
              </div>
            </to-card>
          </div>
        </div>
      </div>
    </div>
    <div class="ops-login-footer">
      <div class="footer-contain">
        <p class="footer-gc">版权所有：海南省机关事务管理局 技术支持：易迅通科技有限公司</p>
        <p class="footer-cpright">Copyright © 2015-2021 西安易迅通科技有限公司 All Rights Reserved. 陕ICP备15020529号</p>
      </div>
    </div>
  </div>
</template>
<script>
import mixin_common from '../mixin/mixin_common'

export default {
  name: 'LoginPageC',
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-image: url('https://pic.imgdb.cn/item/648a73be1ddac507cc97570a.png');
  background-size: 100% 100%;

  .ops-login-header {
    // width: 100%;
    height: 50px;
    padding: 12px 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .header-left {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .logo-box {
        width: 30px;
        height: 30px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      .logo-title {
        padding-left: 18px;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 0;
      }
    }
    .header-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .right-item {
        cursor: pointer;
        margin-left: 24px;
        font-weight: 400;
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .ops-login-mid {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 74px 0 0;
    width: 100%;
    height: calc(100% - 60px);
    .mid-left {
      height: 100%;
      .mid-left-up {
        color: #333333;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        padding-top: 20%;
        .up-title {
          font-weight: 600;
          font-size: 32px;
          text-align: justify;
          padding-bottom: 24px;
        }
        .sub-title {
          font-weight: 300;
          font-size: 16px;
          text-align: justify;
        }
      }
    }
    .mid-right {
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
          min-height: 467px;
          .form-box-card {
            padding: 0px 12px 42px;
            .form-title {
              font-size: 24px;
              font-weight: 500;
              color: #333333;
              padding-bottom: 12px;
            }
          }
          .form-tip {
            font-weight: 500;
            font-size: 18px;
            color: $yxt-color-text-1;
            padding-bottom: 2px;
            width: 100%;
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
            top: -4px;
          }
          .login-forg-pwd {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: flex-start;
            position: relative;
            top: 4px;
            font-size: 12px;
          }
          .login-btn {
            position: relative;
            top: 22px;
            width: 100%;
            margin: 0 auto;
            & > .to-button {
              width: 100%;
            }
          }
          .oths-divider {
            margin: 60px 0 20px;
          }
          .sp-line {
            font-size: 12px;
            color: #B8BCC4;
          }
          .login-oths {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .common-wechat {
              cursor: pointer;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 1px solid #B8BCC4;
              padding: 2px;
            }
          }
        }
      }
    }
  }

  .ops-login-footer {
    height: 60px;
    width: 100%;
    .footer-contain {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .footer-gc {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
      }
      .footer-cpright {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        padding-top: 6px;
      }
    }
  }
}
</style>
