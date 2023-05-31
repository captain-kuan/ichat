<template>
  <van-form class="content flex flex-col justify-center items-center a-center">
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
    />
    <van-field
      type="password"
      v-model="form.rPassword"
      label="确认密码"
      placeholder="password"
    />
    <div class="px-2 w-full">
      <van-button
        class="login-btn"
        :disabled="isPass"
        block
        round
        type="primary"
        @click="submit"
      >
        注册
      </van-button>
    </div>
    <p class="link">
      已有账户？
      <router-link to="/login">去登录</router-link>
    </p>
  </van-form>
</template>

<script setup lang="ts">
import { register } from '@/apis';
import { showToast } from 'vant';

const isPass = ref(false);
const form = reactive({
  account: '',
  password: '',
  rPassword: '',
});
const router = useRouter();
const submit = () => {
  if (!form.account) {
    return showToast({ message: '请输入账户名', type: 'fail' });
  }
  if (!form.password) {
    return showToast({ message: '请输入密码', type: 'fail' });
  }
  if (form.password !== form.rPassword) {
    return showToast({ message: '两次输入不一致', type: 'fail' });
  }
  register(form).then(({ code, msg }) => {
    showToast({ message: msg, type: code === 0 ? 'success' : 'fail' });
    if (code === 0) {
      router.push('/login');
    }
  });
};
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
  margin-top: 20px;
  padding-right: 50px;
  text-align: right;
}
</style>
