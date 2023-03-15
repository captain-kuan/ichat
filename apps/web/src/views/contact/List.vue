<template>
  <main-layout>
    <div class="home">
      <user-item v-for="user in users" :user="user" :key="user.id" />
    </div>
  </main-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useRouter, Router } from 'vue-router';
import { getFriends } from '@/apis';
import UserItem from '@/components/UserItem.vue';

interface User {
  id: string;
  username: string;
  avatar?: string;
}

const users = ref<User[]>([]);
getFriends().then(({ code, data }) => {
  if (code === 0) {
    users.value = data;
  }
});
const router: Router = useRouter();
const goRoom = (id) => {
  router.push({
    path: '/detail/room',
    query: { id },
  });
};
</script>

<style lang="scss" scoped></style>
