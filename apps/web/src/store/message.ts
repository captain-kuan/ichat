import { pinia } from '.';
import { Chat, Message } from '@/types';
import { useUserStore } from '@/store';

export const useMessageStore = defineStore('message', () => {
  const messageMap = reactive<Record<Chat['id'], Message[] | null>>({});
  function pullMessage() {}
  function restore() {}
  function addMessage(message: Message) {
    const hasMsg = messageMap[message.formId] == null;
    const msgs = hasMsg ? messageMap[message.formId] : [];
    msgs.push(message);
    if (!hasMsg) messageMap[message.formId] = msgs;
  }
  function removeMessage() {}
  function revokeMessage() {}
  const { user } = useUserStore();

  function getChatMessages(chatId: Chat['id']) {
    const hasMsg = messageMap[chatId] != null;
    const msgs = hasMsg ? messageMap[chatId] : [];
    if (!hasMsg) messageMap[chatId] = [];
    return computed(() =>
      msgs.map((msg) => ({
        ...msg,
        isSelf: msg.sendId === user.id,
      })),
    );
  }

  return { addMessage, getChatMessages, messageMap };
});

export const useMessageStoreWithOut = () => useMessageStore(pinia);
