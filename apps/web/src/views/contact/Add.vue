<template>
  <detail-layout>
    <van-field
      label="账户"
      v-model="account"
      placeholder="account"
      right-icon="search"
      @click-right-icon="search"
    >
    </van-field>
    <van-cell v-for="item in result" :value="item.account"></van-cell>
  </detail-layout>
</template>

<script setup lang="ts">
import DetailLayout from '@/layouts/DetailLayout.vue';
import { searchUserByName } from '@/apis';
import { it } from 'node:test';
const account = ref('');
const result = ref([]);
const search = async () => {
  console.log('search');
  const { code, data } = await searchUserByName(account.value);
  result.value = Array.isArray(data) ? data : [data];
};
</script>
