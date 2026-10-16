<template>
  <user-item v-for="user in newFriends" :key="user.id" :user="user">
    <template #right>
      <van-button size="mini" type="primary" @click="agree(user.friendId || '')">
        同意
      </van-button>
    </template>
  </user-item>
</template>
<script lang="ts" setup>
import { Chat, ChatType } from '@/types';
import UserItem from '@/components/UserItem.vue';
import {
  agreeAddFriend,
  getPendingFriendRequests,
  PendingFriendRequest,
} from '@/apis';
import { showToast } from 'vant';

const newFriends = ref<Chat[]>([]);

function toChatItem(item: PendingFriendRequest): Chat {
  const displayName = item.fromUser?.name || item.fromUser?.account || item.fromUserId;
  return {
    id: item.id,
    friendId: item.fromUserId,
    name: displayName,
    info: {
      avatar: item.fromUser?.avatar || '',
      name: displayName,
    },
    type: ChatType.system,
  };
}

async function loadPendingFriends() {
  const { code, data } = await getPendingFriendRequests();
  if (code === 0) {
    newFriends.value = (data || []).map(toChatItem);
  }
}

async function agree(friendId: string) {
  if (!friendId) return;
  const { code } = await agreeAddFriend({ friendId });
  if (code === 0) {
    newFriends.value = newFriends.value.filter((item) => item.friendId !== friendId);
    showToast({
      type: 'success',
      message: '已同意好友申请',
    });
  }
}

onMounted(() => {
  loadPendingFriends();
});
</script>
