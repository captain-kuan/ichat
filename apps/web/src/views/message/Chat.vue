<template>
  <div class="chat-room flex-1 flex flex-col p-1">
    <div class="flex-1">
      {{ chats }}
      <message-item v-for="msg in messages" :message="msg"> </message-item>
    </div>
    <van-field
      class="sticky"
      v-model="input"
      border
      placeholder="发送消息"
      @keydown.enter="send"
    >
      <template #button>
        <van-button type="success" @click="send">send</van-button>
      </template>
    </van-field>
  </div>
</template>

<script lang="ts" setup>
import MessageItem from '@c/MessageItem.vue';
import { Message } from '@ichat/types';
import { useChatsStore, useUserStore, storeToRefs } from '@/store';

const route = useRoute();
const chatId = computed(() => route.params.id as string);
const messages = computed(() => {
  return chats.value[chatId.value]?.messages || [];
});
const input = ref('');
const isSelf = (msg: Message): boolean => {
  return msg.sendId === user.id;
};
const { sendMessage, chats } = storeToRefs(useChatsStore());
const { user } = useUserStore();
const send = () => {
  sendMessage({ content: input.value, toId: chatId.value });
  input.value = '';
};
</script>

<style scoped>
.chat-room {
}
</style>
