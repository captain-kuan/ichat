<template>
  <div class="home">
    <div v-if="activeChats.length">
      <chat-item
        v-for="chat in activeChats"
        :chat="chat"
        :last-message="chat.lastMsg"
        :key="chat.id"
        @touchend="goChat(chat.friendId)"
      />
    </div>
    <div v-else>
      empty
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatItem from '@/components/ChatItem.vue';
import { useRouter, Router } from 'vue-router';
import { useChatsStore, storeToRefs } from '@/store';

const { activeChats, updateActiveChat } = storeToRefs(useChatsStore());

const router: Router = useRouter();
const goChat = (id) => {
  updateActiveChat(id);
  router.push({
    path: `/chat/room/${id}`,
  });
};
</script>

<style lang="less" scoped></style>
