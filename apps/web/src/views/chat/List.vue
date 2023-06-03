<template>
  <div class="home">
    <chat-item
      v-for="chat in chats"
      :chat="chat"
      :key="chat.id"
      @touchend="goChat(chat.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import ChatItem from '@/components/ChatItem.vue';
import { useRouter, Router } from 'vue-router';
import { Chat, ChatType } from '@ichat/types';

const chats = reactive<Chat[]>([]);

const router: Router = useRouter();
const goChat = (id) => {
  router.push({
    path: `/chat/room/${id}`,
  });
};
</script>

<style lang="less" scoped></style>
