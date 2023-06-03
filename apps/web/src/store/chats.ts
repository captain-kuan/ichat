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
        chats.value=data;
      }
    });
  }
  const groups = computed(() =>
    chats.value.filter((chat) => chat.type === ChatType.group),
  );
  const person = computed(() =>
    chats.value.filter((chat) => chat.type === ChatType.person),
  );

  const activeChats = computed(() => {});

  const lastChats = reactive<Set<ActiveChat>>(new Set());
  function updateActiveChat(chatId: string, msg?: Message) {
    const chat = getChatDetail(chatId) as ActiveChat;
    if (chat == null) return;
    lastChats.add(chat);
    if (msg) chat.lastMsg = msg;
  }
  function getChatDetail(chatId: Chat['id']) {
    console.log(chats, chatId);
    const res = chats.value.find((item) => item.id === chatId) as Chat | null;
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
