<template>
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
</template>

<script setup lang="ts">
import { showToast } from 'vant';
import request from '@/utils/request';
import { changeUserInfo } from '@/apis';
import { useUserStore, storeToRefs } from '@/store';

const { getUserInfo, user } = storeToRefs(useUserStore());
const avatar = computed({
  get() {
    return userInfo.value.avatar ? [{ url: userInfo.value.avatar }] : [];
  },
  set(v) {
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
  await getUserInfo();
  userInfo.value = user.value;
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
