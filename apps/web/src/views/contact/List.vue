<template>
  <div class="home">
    <user-item
      :user="{ avatar: '', name: '新的朋友' }"
      @click="$router.push('/contact/new-friends')"
    ></user-item>
    <user-item
      v-for="user in users"
      :user="user"
      :key="user.id"
      @click="goRoom(user)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, Router } from 'vue-router';
import { getFriends } from '@/apis';
import UserItem from '@/components/UserItem.vue';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

const users = ref<User[]>([]);
getFriends().then(({ code, data }) => {
  if (code === 0) {
    users.value = data;
  }
});
const router: Router = useRouter();
function goRoom(user: User) {
  router.push({
    path: `/chat/room/${user.id}`,
  });
}
</script>

<style lang="less" scoped></style>
