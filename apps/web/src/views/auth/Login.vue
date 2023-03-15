<template>
  <van-form class="content flex flex-col items-center justify-center">
    <van-image class="logo"></van-image>
    <van-field
      label="账户"
      v-model="form.account"
      placeholder="account"
    ></van-field>
    <van-field
      type="password"
      v-model="form.password"
      label="密码"
      placeholder="password"
    ></van-field>
    <div class="w-full p-2">
      <van-button
        class="login-btn"
        :disabled="isPass"
        block
        round
        type="primary"
        @click="toLogin"
        >登录</van-button
      >
      <p class="w-full mt-2 text-right">
        还没有账户？
        <router-link to="/register">去注册</router-link>
      </p>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
const isPass = ref(false);
const form = reactive({
  account: '',
  password: '',
});
const { login } = useUserStore();
const router = useRouter();
const route = useRoute();
const toLogin = async () => {
 const {code} = await login(form);
 if(code===0){
   const redirectPath = route.query?.redirect as string;
   router.push(redirectPath || '/');
  }
};
</script>
<style>
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
