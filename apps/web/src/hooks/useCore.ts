import { ChatType, Message, MessageEvent } from '@ichat/types';
import { SocketClient } from '@/utils';
import {
  useMessageStoreWithOut,
  useChatsStoreWithOut,
  useUserStore,
  useUserStoreWiteOut,
} from '@/store';

let client: SocketClient;

export function useCore() {
  const messageStore = useMessageStoreWithOut();
  const chatStore = useChatsStoreWithOut();
  const useStore = useUserStoreWiteOut();

  async function initCore() {
    client = await SocketClient.getClient();
    client.on(MessageEvent.message, (message) => {
      messageStore.addMessage(message);
      chatStore.updateActiveChat(message.sendId,message);
    });
    client.on(MessageEvent.sendSuccess, (message) => {});
    client.on(MessageEvent.addChat, (message) => {});
  }

  function seedMessage(message: Message) {
    if (client) {
      client.emit(MessageEvent.message, {
        ...message,
        sendId: useStore.user.id,
      });
      messageStore.addMessage(message);
      chatStore.updateActiveChat(message.toId,message);
    } else {
      // TODO: 消息重发
      console.log(client);
    }
  }
  return { initCore, seedMessage };
}
