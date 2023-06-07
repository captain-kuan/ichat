<template>
  <div class="page">
    <van-nav-bar title="IChat" left-arrow>
      <template #right>
        <van-popover
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
          placement="bottom-end"
        >
          <template #reference>
            <van-icon name="add-o"></van-icon>
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <main>
      <router-view></router-view>
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
const showPopover = ref(false);

const actions = [
  { text: '发起群聊', command: 'joinGroup' },
  { text: '添加朋友', command: 'addFriend' },
] as const;

function onSelect(action: (typeof actions)[number]) {
  switch (action.command) {
    case 'addFriend':
      router.push('/contact/add');
      break;
    case 'joinGroup':
      router.push('/contact/join-group');
      break;
  }
}
</script>

<style scoped>
.main {
  background: white;
}
</style>
