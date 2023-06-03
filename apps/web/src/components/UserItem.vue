<template>
  <div class="user-item flex justify-between">
    <div class="flex items-center">
      <div>
        <img class="avatar" :src="user.info?.avatar" alt="" />
      </div>
      <div>{{ user.info?.name }}</div>
    </div>
    <slot name="right">
      <div></div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { Chat } from '@/types';
import { defineProps } from 'vue';

defineProps<{ user: Chat }>();
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
