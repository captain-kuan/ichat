import { Chat, ChatType, Message } from '@ichat/types';
import { useContactStore } from './concat';

export const useChatsStore = defineStore('chats', () => {
  const chats = reactive<Map<string, Chat & { lastMessage: Message }>>(
    new Map(),
  );
  const { contact } = storeToRefs(useContactStore());
  const handleMessage = (message: Message) => {
    const { sendId, chatId } = message;
    if (chats.has(chatId)) {
      chats.get(chatId).lastMessage = message;
    } else {
      let chat: Chat;
      if (sendId === chatId) {
        chat = contact.value.find((item) => item.id === message.chatId);
      } else {
        
      }
      chats.set(message.chatId, { ...chat, lastMessage: message });
    }
  };
  return { chats, handleMessage };
});
