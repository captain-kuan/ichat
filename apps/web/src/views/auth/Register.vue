<template>
  <van-form class="content d-flex column  a-center">
    <van-image class="logo"></van-image>
    <van-field label="账户" v-model="form.account" placeholder="account"></van-field>
    <van-field
        type="password"
        v-model="form.password"
        label="密码"
        placeholder="password"
    />
    <van-field
        type="password"
        v-model="form.rPassword"
        label="确认密码"
        placeholder="password"
    />
    <van-button
        class="login-btn"
        :disabled="isPass" block round
        type="primary"
        @click="submit">
      注册
    </van-button>
    <p class="link">
      已有账户？
      <router-link to="/login">去登录</router-link>
    </p>
  </van-form>
</template>

<script>
import {reactive, ref} from "vue";
import {register} from "../apis";
import {Toast} from "vant";

export default {
  name: "Register",
  setup() {
    const isPass = ref(false)
    const form = reactive({
      account: "",
      password: "",
      rPassword: ""
    })

    const submit = () => {
      if (!form.account) {
        return Toast.fail("请输入账户名")
      }
      if (!form.password) {
        return Toast.fail("请输入密码")
      }
      if (form.password !== form.rPassword) {
        return Toast.fail("两次输入不一致")
      }
      register(form).then(({success, msg}) => {
        console.log(msg)
        Toast[success ? "success" : "fail"](msg)
      })
    }
    return {
      isPass,
      form,
      submit
    }
  }
}
</script>

<style scoped>
.logo {
  width: 200px;
  height: 200px;
  margin: 50px 0;
}

.login-btn {
  margin-top: 50px;
}

.link {
  width: 100%;
  margin-top: 50px;
  padding-right: 50px;
  text-align: right;
}
</style>
