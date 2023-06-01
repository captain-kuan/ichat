<template>
  <div class="home">
    <user-item
      :user="{ avatar: '', name: '新的朋友' }"
      @click="$router.push('/contact/new-friends')"
    ></user-item>
    <user-item
      v-for="user in chats"
      :user="user"
      :key="user.id"
      @click="goRoom(user.friendId)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, Router } from 'vue-router';
import { getFriends } from '@/apis';
import UserItem from '@/components/UserItem.vue';
import { useChatsStore, storeToRefs } from '@/store';
import { Chat } from '@/types';

const { fetchChats, chats } = storeToRefs(useChatsStore());
fetchChats();

const router: Router = useRouter();
function goRoom(userId) {
  router.push({
    path: `/chat/room/${userId}`,
  });
}
</script>

<style lang="less" scoped></style>
