<template>
  <div class="h-screen flex flex-col overflow-auto">
    <van-nav-bar
      class="top-0"
      style="position: sticky"
      :title="title"
      left-arrow
      @click-left="back"
    />
    <main class="main flex flex-col">
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

<style scoped>
.main {
  height: calc(100vh - 46px);
}
</style>
