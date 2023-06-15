<template>
  <LoginPageB v-if="mode === 'B'" v-bind="$attrs" v-on="$listeners"/>
  <LoginPageC v-else-if="mode === 'C'" v-bind="$attrs" v-on="$listeners"/>
  <LoginPageA v-else v-bind="$attrs" v-on="$listeners"/>
</template>
<script>
import LoginPageA from '../components/LoginPageA.vue'
import LoginPageB from '../components/LoginPageB.vue'
import LoginPageC from '../components/LoginPageC.vue'
export default {
  name: 'YxtBissLogin',
  props: {
    /**
     * 登录页模板
     * 枚举：A | B | C
     */
    mode: {
      type: String,
      default: 'A' // 枚举：A | B | C
    }
  },
  components: {
    LoginPageA,
    LoginPageB,
    LoginPageC
  }
}
</script>
