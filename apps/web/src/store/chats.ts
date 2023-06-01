import { ActiveChat, Chat, ChatType, Message } from '@/types';
import { pinia } from '.';

export const useChatsStore = defineStore('chats', () => {
  const chats = reactive<Chat[]>([]);

  const groups = computed(() =>
    chats.filter((chat) => chat.type === ChatType.group),
  );
  const person = computed(() =>
    chats.filter((chat) => chat.type === ChatType.person),
  );

  const activeChats = computed(() => {});

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

export function useChatsStoreWithOut() {
  return useChatsStore(pinia);
}
