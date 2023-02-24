<template>
    <div class="user-item flex items-center">
        <div>
            <img class="avatar" :src="user.avatar" alt="" />
        </div>
        <div>{{ user.username }}</div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

interface UserInfo {
    avatar?: string;
    username: string;
}
defineProps<{ user: UserInfo }>();
</script>
<style lang="less" scoped>
.user-item {
    padding: 8px 12px;
    .avatar {
        width: 30px;
        height: 30px;
        margin-right: 20px;
    }
}
</style>
