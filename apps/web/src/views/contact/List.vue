<template>
  <div class="home">
    <user-item
      :user="{
        name: '',
        info: { avatar: NewFriend, name: '新的朋友' },
        id: '',
        friendId: '',
        type: ChatType.system,
      }"
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
import { useRouter, Router } from 'vue-router';
import UserItem from '@/components/UserItem.vue';
import { useChatsStore, storeToRefs, useMessageStore } from '@/store';
import { ChatType } from '@/types';
import NewFriend from '@/assets/icon/new-friend.png';

const { fetchChats, chats, updateActiveChat } = storeToRefs(useChatsStore());
fetchChats();

const router: Router = useRouter();
const { initMessage } = useMessageStore();
function goRoom(friendId) {
  initMessage(friendId);
  updateActiveChat(friendId);
  router.push({
    path: `/chat/room/${friendId}`,
  });
}
</script>

<style lang="less" scoped></style>
