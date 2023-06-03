<template>
  <div class="home">
    <user-item
      :user="{ name: '新的朋友' }"
      @click="$router.push('/contact/new-friends')"
    ></user-item>
    <user-item
      v-for="chat in chats"
      :user="chat"
      :key="chat.id"
      @click="goRoom(chat.friendId)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, Router } from 'vue-router';
import { getFriends } from '@/apis';
import UserItem from '@/components/UserItem.vue';
import { useChatsStore, storeToRefs, useMessageStore } from '@/store';

const { fetchChats, chats } = storeToRefs(useChatsStore());
fetchChats();

const router: Router = useRouter();
const { initMessage } = useMessageStore();
function goRoom(friendId) {
  
  initMessage(friendId);
  router.push({
    path: `/chat/room/${friendId}`,
  });
}
</script>

<style lang="less" scoped></style>
