import { ActiveChat, Chat, Message } from '@/types';

export const useChatsStore = defineStore('chats', () => {
  const activeChats = computed(() => {});
  const chats = reactive<Chat[]>([]);
  function updateActiveChat(msg: Message) {
    
  }

  function hideChat(chat) {}
  function removeChat(chat) {
    hideChat(chat);
  }
  function ignoreChat() {}
  function topChat() {}

  return { activeChats, updateActiveChat, removeChat };
});
