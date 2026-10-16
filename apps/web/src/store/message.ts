import { pinia } from '.';
import { Chat, ChatType, Message } from '@/types';
import { useUserStore } from '@/store';

export const useMessageStore = defineStore('message', () => {
  const { user } = storeToRefs(useUserStore());

  const messageMap = reactive<Record<Chat['id'], Message[] | null>>({});
  const lastSyncAt = ref<number>(0);
  function initMessage(chatId: string) {
    if (messageMap[chatId] == null) {
      messageMap[chatId] = [];
      console.log('init', chatId, messageMap[chatId]);
    }
  }
  function pullMessage() {}
  function restore() {}

  function getMessageChatId(message: Message) {
    switch (message.type) {
      case ChatType.person:
        return message.sendId === user.value.id ? message.toId : message.sendId;
      case ChatType.group:
        return message.groupId || message.toId;
      case ChatType.system:
        return 'system';
      default:
        throw Error('not impl');
    }
  }

  function addMessage(message: Message) {
    const chatId = getMessageChatId(message);
    const hasMsg = messageMap[chatId] != null;
    const msgs = hasMsg ? messageMap[chatId] : [];
    const exists = msgs.some((msg) => {
      if (msg.id && message.id) {
        return msg.id === message.id;
      }
      return (
        msg.sendId === message.sendId &&
        msg.toId === message.toId &&
        msg.content === message.content &&
        msg.type === message.type
      );
    });

    if (!exists) {
      msgs.push(message);
      if (!hasMsg) messageMap[chatId] = msgs;
    }

    const time = Number(new Date(message.sendTime));
    if (!Number.isNaN(time)) {
      lastSyncAt.value = Math.max(lastSyncAt.value, time);
    }
  }

  function applySyncedMessages(messages: Message[]) {
    messages.forEach((message) => {
      addMessage(message);
    });
  }
  function removeMessage() {}
  function revokeMessage() {}

  return {
    initMessage,
    addMessage,
    applySyncedMessages,
    messageMap,
    lastSyncAt,
  };
});

export const useMessageStoreWithOut = () => useMessageStore(pinia);
