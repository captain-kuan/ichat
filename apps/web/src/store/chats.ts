import { ActiveChat, Chat, ChatType, Message } from '@/types';
import { pinia } from '.';
import { getFriends } from '@/apis';
import { useUserStore } from '@/store';
export const useChatsStore = defineStore('chats', () => {
  const { user } = useUserStore();
  const chats = reactive<Chat[]>([]);
  function fetchChats() {
    getFriends().then(({ code, data }) => {
      if (code === 0) {
        chats.length = 0;
        chats.push(...data);
      }
    });
  }
  const groups = computed(() =>
    chats.filter((chat) => chat.type === ChatType.group),
  );
  const person = computed(() =>
    chats.filter((chat) => chat.type === ChatType.person),
  );

  const activeChats = computed(() => {});

  const lastChats = reactive<Set<ActiveChat>>(new Set());
  function updateActiveChatByMessage(msg: Message) {
    const chatId = msg.sendId === user.id ? msg.formId : msg.toId;
    const chat = getChatDetail(chatId) as ActiveChat;
    lastChats.add(chat);
    chat.lastMsg = msg;
  }
  function getChatDetail(chatId: Chat['id']): Chat | null {
    console.log(chats,chatId);
    return chats.find((item) => item.id === chatId) as Chat | null;
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
    updateActiveChatByMessage,
    removeChat,
  };
});

export function useChatsStoreWithOut() {
  return useChatsStore(pinia);
}
