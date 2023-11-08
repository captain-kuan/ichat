<template>
  <div class="chat-room flex-1 reactive flex flex-col" ref="chatRoomRef">
    <div class="flex-1 p-2">
      <message-item v-for="msg in messages" :message="msg"> </message-item>
    </div>
    <div class="sticky bottom-0">
      <van-field
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
  </div>
</template>

<script lang="ts" setup>
import MessageItem from '@/components/MessageItem.vue';
import { ChatType, Message } from '@ichat/types';
import {
  useChatsStore,
  useMessageStore,
  storeToRefs,
  useUserStore,
} from '@/store';
import { useCore } from '@/hooks';

const route = useRoute();
const chatId = route.params.id as string;
const { getChatDetail, chats } = storeToRefs(useChatsStore());
const input = ref('');
const { messageMap } = storeToRefs(useMessageStore());
const { sendMessage } = useCore();

const { user } = useUserStore();

const send = () => {
  sendMessage({
    content: input.value,
    toId: chatId,
    type: ChatType.person,
    id: '',
    sendId: user.id,
    sendTime: new Date(),
  });
  input.value = '';
};

const messages = computed(() => {
  if (messageMap.value[chatId] == null) {
    console.error('message chat not find');
    return [];
  }
  return messageMap.value[chatId].map((msg) => ({
    ...msg,
    isSelf: msg.sendId === user.id,
  }));
});

const chatRoomRef = ref<HTMLElement>();

onMounted(() => {
  watch(
    () => messages.value.length,
    () => {
      nextTick(() => {
        if (chatRoomRef) {
          chatRoomRef.value.scrollTop = chatRoomRef.value.scrollHeight;
        }
      });
    },
    { immediate: true },
  );
});
</script>

<style scoped>
.chat-room {
  background: #eee;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
