<template>
    <MainLayout>
        <van-form>
            <van-field label="昵称" v-model="userInfo.Uname"></van-field>
            <van-field label="头像">
                <template #input>
                    <van-uploader
                        :max-count="1"
                        :multiple="false"
                        v-model="fileList"
                        :after-read="upload"
                        :before-delete="del"
                    />
                </template>
            </van-field>
            <van-cell>
                <van-button block round type="primary" @click="submit"
                    >提交</van-button
                >
            </van-cell>
        </van-form>
    </MainLayout>
</template>

<script setup lang="ts">
import { Toast } from 'vant';
import request from '@/utils/request';
import MainLayout from '@/layouts/MainLayout.vue';
import { getUserInfo, changeUserInfo } from '@/apis';
const fileList = reactive([]);
const del = () => {
    fileList.pop();
};
const userInfo = ref<{ Uname: string; UAvatar: string }>({
    UAvatar: '',
    Uname: '',
});
const init = async () => {
    const { code, data, msg } = await getUserInfo();
    userInfo.value = data;
};
init();
const submit = async () => {
    const { code } = await changeUserInfo(userInfo.value);
    if (code === 0) {
        Toast.success('修改成功');
    }
};
const upload = async (file) => {
    const param = new FormData();
    param.append('file', file.file);
    const filepath = await request.post('/file/upload', param);
    fileList.push({ url: filepath });
};
</script>

<style scoped></style>
