import { pinia } from '.';
import { Message } from '@/types';

export const useMessageStore = defineStore('message', () => {
  const messageMap = reactive<Map<string, Message[]>>(new Map());
  function pullMessage() {}
  function restore() {}
  function addMessage(message: Message) {
    const hasMsg = messageMap.has(message.formId);
    const msgs = hasMsg ? messageMap.get(message.formId) : [];
    msgs.push(message);
    !hasMsg && messageMap.set(message.formId, msgs);
  }
  function removeMessage() {}
  function revokeMessage() {}
  function getChatMessages() {}

  return { addMessage };
});

export const useMessageStoreWithOut = () => useMessageStore(pinia);
