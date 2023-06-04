import { ActiveChat, Chat, ChatType, Message } from '@/types';
import { pinia } from '.';
import { getFriends } from '@/apis';
import { useUserStore } from '@/store';
export const useChatsStore = defineStore('chats', () => {
  const { user } = useUserStore();
  const chats = ref<Chat[]>([]);
  function fetchChats() {
    getFriends().then(({ code, data }) => {
      if (code === 0) {
        chats.value = data;
      }
    });
  }
  const groups = computed(() =>
    chats.value.filter((chat) => chat.type === ChatType.group),
  );
  const person = computed(() =>
    chats.value.filter((chat) => chat.type === ChatType.person),
  );

  const activeChats = computed(() => {
    return lastChats.value.map((item) => item);
  });

  const lastChats = ref<ActiveChat[]>([]);
  function updateActiveChat(chatId: string, msg?: Message) {
    const chat = getChatDetail(chatId) as ActiveChat;
    if (chat == null) return;
    const index = lastChats.value.findIndex((item) => item.id === chat.id);
    if (index !== -1) {
      lastChats.value.splice(index, 1);
    }
    lastChats.value.unshift({ ...chat, lastMsg: msg });
  }
  function getChatDetail(chatId: Chat['id']) {
    console.log(chats, chatId);
    const res = chats.value.find(
      (item) => item.friendId === chatId,
    ) as Chat | null;
    if (res == null) {
      console.error('not find');
    }
    return res;
  }
  function hideChat(chat) {}
  function removeChat(chat) {
    hideChat(chat);
  }
  function ignoreChat() {}
  function topChat() {}

  return {
    chats,
    lastChats,
    fetchChats,
    activeChats,
    getChatDetail,
    updateActiveChat,
    removeChat,
  };
});

export function useChatsStoreWithOut() {
  return useChatsStore(pinia);
}
