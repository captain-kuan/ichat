import { pinia } from '.';
import { Chat, ChatType, Message, PersonMessage } from '@/types';
import { useUserStore } from '@/store';

export const useMessageStore = defineStore('message', () => {
  const { user } = storeToRefs(useUserStore());

  const messageMap = reactive<Record<Chat['id'], Message[] | null>>({});
  function initMessage(chatId: string) {
    if (messageMap[chatId] == null) {
      messageMap[chatId] = [];
      console.log('init', chatId, messageMap[chatId]);
    }
  }
  function pullMessage() {}
  function restore() {}
  function addMessage(message: Message) {
    switch (message.type) {
      // 如果是收到的私人消息，更新发送者的消息列表
      case ChatType.person:
        let chatId = message.sendId === user.value.id ? message.toId : message.sendId;
        console.log(chatId);
        
        const hasMsg = messageMap[chatId] != null;
        const msgs = hasMsg ? messageMap[chatId] : [];
        msgs.push(message);
        if (!hasMsg) messageMap[chatId] = msgs;
        break;
      default:
        throw Error('not impl');
    }
  }
  function removeMessage() {}
  function revokeMessage() {}

  return { initMessage, addMessage, messageMap };
});

export const useMessageStoreWithOut = () => useMessageStore(pinia);
