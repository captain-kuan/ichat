<template>
  <van-field
    label="账户"
    v-model="account"
    placeholder="account"
    right-icon="search"
    @click-right-icon="search"
  >
  </van-field>
  <div class="p-2">
    <div v-for="item in result" class="flex justify-between items-center">
      <div class="flex items-center">
        <van-image class="avatar" :src="item.avatar"></van-image>
        <div>
          {{ item.account }}
        </div>
      </div>
      <van-button
        v-if="user.id !== item.id"
        type="primary"
        size="small"
        @click="addFriend(item.id)"
        >添加</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchUserByName, sendAddFriend } from '@/apis';
import { useUserStore, storeToRefs } from '@/store';
const { user } = storeToRefs(useUserStore());
const account = ref('');
const result = ref([]);
async function search() {
  const { code, data } = await searchUserByName(account.value);
  if (code === 0) {
    result.value = Array.isArray(data) ? data : [data];
  }
}
function addFriend(friendId: string) {
  sendAddFriend({ friendId });
}
</script>
<style lang="less" scoped>
.avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
</style>
