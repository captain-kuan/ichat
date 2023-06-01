<template>
  <component :is="layout"> </component>
</template>

<script lang="ts" setup>
import DetailLayout from './DetailLayout.vue';
import MainLayout from './MainLayout.vue';

const route = useRoute();
const layout = computed(() => {
  return route.meta.pageType === 'main' ? MainLayout : DetailLayout;
});
</script>

<style scoped></style>
