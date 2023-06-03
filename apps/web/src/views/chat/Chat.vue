<template>
  <div class="chat-room flex-1 reactive flex flex-col" ref="chatRoomRef">
    <div class="flex-1 p-1">
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
const chatId = computed(() => route.params.id as string);
const { getChatDetail, chats } = storeToRefs(useChatsStore());
const input = ref('');
const { messageMap } = storeToRefs(useMessageStore());
const { seedMessage } = useCore();

const { user } = useUserStore();

const send = () => {
  seedMessage({
    content: input.value,
    toId: chatId.value,
    type: ChatType.person,
    id: '',
    sendId: user.id,
    sendTime: new Date(),
  });
  input.value = '';
};

const messages = computed(() => {
  
  return messageMap.value[chatId.value].map((msg) => ({
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
