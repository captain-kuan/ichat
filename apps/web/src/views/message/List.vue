<template>
  <main-layout>
    <div class="home">
      <chat-item
        v-for="room in rooms"
        :chat="room"
        :key="room.id"
        @touchend="goRoom(room.id)"
      />
    </div>
  </main-layout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import ChatItem from '@/components/ChatItem.vue';
import { useRouter, Router } from 'vue-router';
import { getAllRooms } from '@/apis';
import { Chat, ChatType } from '@ichat/types';

interface Room {
  id: string;
  name: string;
  message?: string;
  time?: string | Date;
}

const rooms = reactive<Chat[]>([
  { id: '1', name: '测试', type: ChatType.person, avatar: '' },
]);
getAllRooms().then((res) => {
  console.log(res);
});
const router: Router = useRouter();
const goRoom = (id) => {
  router.push({
    path: `/chat/room/${id}`,
  });
};
</script>

<style lang="scss" scoped></style>
