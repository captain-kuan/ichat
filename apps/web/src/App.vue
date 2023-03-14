<template>
  <router-view />
</template>
<script setup lang="ts">
import { useUserStore } from '@/store';
import { emitter } from '@/utils';
const { getUserInfo } = useUserStore();
const token = sessionStorage.getItem('token');
if (token) {
  getUserInfo();
} else {
  emitter.on('login', getUserInfo);
}
</script>
