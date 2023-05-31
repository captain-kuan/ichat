<template>
  <MainLayout>
    <van-form>
      <van-field label="昵称" v-model="userInfo.name"></van-field>
      <van-field label="头像">
        <template #input>
          <van-uploader
            :max-count="1"
            :multiple="false"
            v-model="avatar"
            :after-read="upload"
            :before-delete="del"
          />
        </template>
      </van-field>
      <van-cell>
        <van-button block round type="primary" @click="submit">提交</van-button>
      </van-cell>
    </van-form>
  </MainLayout>
</template>

<script setup lang="ts">
import { showToast } from 'vant';
import request from '@/utils/request';
import MainLayout from '@/layouts/MainLayout.vue';
import { getUserInfo, changeUserInfo } from '@/apis';
const avatar = computed({
  get() {
    return userInfo.value.avatar ? [{ url: userInfo.value.avatar }] : [];
  },
  set(v) {
    console.log(v);

    userInfo.value.avatar = v[0]?.url;
  },
});
const del = () => {
  avatar.value = [];
};
const userInfo = ref<{ name: string; avatar: string }>({
  avatar: '',
  name: '',
});
const init = async () => {
  const { code, data, msg } = await getUserInfo();
  userInfo.value = data;
};
init();
const submit = async () => {
  const { code } = await changeUserInfo(userInfo.value);
  if (code === 0) {
    showToast('修改成功');
  }
};
const upload = async (file) => {
  const param = new FormData();
  param.append('file', file.file);
  const { data } = await request.post('/file/upload', param);
  avatar.value = [{ url: data }];
};
</script>

<style scoped></style>
