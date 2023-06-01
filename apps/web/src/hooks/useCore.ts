import { Message, MessageEvent } from '@ichat/types';
import { SocketClient } from '@/utils';
import { useMessageStoreWithOut, useChatsStoreWithOut } from '@/store';

export async function useCore() {
  const client = shallowRef<SocketClient>();
  async function initCore() {
    client.value = await SocketClient.getClient();
    const messageStore = useMessageStoreWithOut();
    const chatStore = useChatsStoreWithOut();
    client.value.on(MessageEvent.message, (message) => {
      messageStore.addMessage(message);
      chatStore.updateActiveChat(message);
    });
    client.value.on(MessageEvent.addChat, (message) => {});
  }
  function seenMessage(message: Message) {
    if (client.value) {
      client.value.emit(MessageEvent.message, message);
    } else {
      // TODO: 消息重发
    }
  }
  return { initCore, seenMessage };
}
