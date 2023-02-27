<template>
  <div class="chat-room flex-1 flex flex-col p-1">
    <div class="flex-1">
      <message-item v-for="msg in messages" :msg="msg" :is-self="isSelf(msg)">
      </message-item>
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
import { useChatsStore } from '@/store';
const messages = reactive<Message[]>([]);
const route = useRoute();
const input = ref('');
const isConnected = ref(false);
const isSelf = (msg: Message): boolean => {
  return msg.sendId === '';
};
const { sendMessage } = useChatsStore();

const send = () => {
  sendMessage({ message: input.value, chatId: route.params.id });
  messages.push({
    id: '',
    sendId: '',
    chatId: '',
    sendTime: new Date(),
    message: input.value,
  });
  input.value = '';
};
</script>

<style scoped>
.chat-room {
}
</style>
