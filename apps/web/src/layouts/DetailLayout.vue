<template>
    <div class="page">
        <van-nav-bar :title="title" left-arrow @click-left="back"></van-nav-bar>
        <main class="main">
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const title = computed(() => {
    return route.meta.title as string || 'IChat';
});
const back = () => {
    router.back();
};
</script>

<style scoped>
.main {
    display: flex;
}
</style>
