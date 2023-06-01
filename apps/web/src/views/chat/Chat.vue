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
import { Message } from '@ichat/types';
import { useChatsStore, useUserStore, storeToRefs } from '@/store';

const route = useRoute();
const chatId = computed(() => route.params.id as string);

const input = ref('');
const { activeChats } = storeToRefs(useChatsStore());
const send = () => {
  ({ content: input.value, toId: chatId.value });
  input.value = '';
};
const messages = computed(() => {
  return ""
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
