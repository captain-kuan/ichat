<template>
  <user-item v-for="user in newFriends" :user="user">
    <template #right>
      <van-button size="mini" type="primary">同意</van-button>
    </template>
  </user-item>
</template>
<script lang="ts" setup>
import { Chat, ChatType } from '@/types';
import UserItem from '@/components/UserItem.vue';
const newFriends = reactive<Chat[]>([]);
</script>
