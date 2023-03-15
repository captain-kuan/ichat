import { Chat, ChatType, Message } from '@ichat/types';
import { useContactStore } from './concat';
import { socket, emitter } from '@/utils';
import { getChatDetails, agreeAddFriend } from '@/apis';
import { useUserStore } from '@/store';
export const useChatsStore = defineStore('chats', () => {
  const chats = reactive<
    Record<string, Chat & { messages: (Message & { isSelf: boolean })[] }>
  >({});
  const { contact } = storeToRefs(useContactStore());
  const handleMessage = async (message: Message) => {
    const { sendId, toId } = message;
    if (sendId in chats) {
      chats[sendId].messages.push({ ...message, isSelf: false });
    } else {
      let chat: Chat;
      if (sendId === toId) {
        chat =
          contact?.value.find((item) => item.id === message.toId) ||
          ({} as Chat);
      } else {
        const { code, data } = await getChatDetails(toId);
        if (code === 0) {
          chat = data;
        }
      }
      chats[message.sendId] = {
        ...chat,
        messages: [{ ...message, isSelf: false }],
      };
    }
  };
  function addFriend(message: Message) {
    agreeAddFriend({ friendId: message.sendId });
  }
  const { user } = useUserStore();
  const sendMessage = async ({ toId, content }) => {
    await socket.sendMessage({ toId, content, sendId: String(user.id) });
    const chat = chats[toId];
    if (chat == null) {
      const { code, data } = await getChatDetails(toId);
      const messages = [
        {
          content,
          sendId: String(user.id),
          toId,
          isSelf: true,
          sendTime: new Date(),
          id: Math.random().toString(),
        },
      ];
      chats[toId] = { ...data, messages };
    } else {
      chat.messages.push({
        content,
        sendId: String(user.id),
        toId,
        isSelf: true,
        sendTime: new Date(),
        id: Math.random().toString(),
      });
    }
  };
  return { chats, sendMessage, handleMessage, addFriend };
});
