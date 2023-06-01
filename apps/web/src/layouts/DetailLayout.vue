<template>
  <div class="min-h-screen flex flex-col">
    <van-nav-bar :title="title" left-arrow @click-left="back"></van-nav-bar>
    <main class="flex-1 main flex flex-col">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const title = computed(() => {
  return (route.meta.title as string) || 'IChat';
});
const back = () => {
  router.back();
};
</script>

<style scoped></style>
