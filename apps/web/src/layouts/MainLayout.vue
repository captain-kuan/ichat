<template>
  <div class="page">
    <van-nav-bar title="IChat" left-arrow @click="addFriend">
      <template #right>
        <van-icon name="add-o"></van-icon>
      </template>
    </van-nav-bar>
    <main>
      <slot></slot>
    </main>
    <footer>
      <van-tabbar placeholder route v-model="active">
        <van-tabbar-item icon="home-o" to="/chat/list"> 消息 </van-tabbar-item>
        <van-tabbar-item icon="add" to="/contact"> 通讯录 </van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/settings">
          设置
        </van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const active = ref(0);
const router = useRouter();
const addFriend = () => {
  router.push('/contact/add');
};
</script>

<style scoped>
.main {
  background: white;
}
</style>
