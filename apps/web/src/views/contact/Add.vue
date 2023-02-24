<template>
    <detail-layout>
        <van-field label="账户" placeholder="account"></van-field>
    </detail-layout>
</template>

<script setup lang="ts">
import DetailLayout from '@/layouts/DetailLayout.vue';
const search = () => {
    console.log('search');
};
</script>
